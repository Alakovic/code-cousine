import { Injectable, inject, signal } from '@angular/core';
import { Unit } from '../types/recipe_types';
import { Ingredient, RecipeInterface } from '../interfaces/recipe_interface';
import { HttpClient } from '@angular/common/http';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { RecipeModel } from '../models/recipemodel';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  supabase = createClient(
    'https://reloxnbkcdalbugsqoop.supabase.co',
    'sb_publishable_F2iDzbZDnYfkrYy2UZ32_g_bCqeH339',
  );

  allRecipes = signal<RecipeInterface[]>([]);
  lastRecipeList = signal<RecipeInterface[]>([]);
  recipeDetail = signal<RecipeInterface>({
    id: 0,
    ingredients: [],
    name: '',
    cuisine: 'italian',
    diet: 'vegetarian',
    time: 0,
    portions: 0,
    chefs: 0,
    nutrition: {
      energy: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
    },
    steps: [
      {
        name: '',
        description: '',
      },
    ],
    likes: 0,
    extraIngredients: [],
  });

  ingredients: Ingredient[] = [];
  units: Unit[] = ['piece', 'ml', 'gram'];
  http = inject(HttpClient);
  resetResults = signal(false);

  recipeInsertListenerChannel!: RealtimeChannel;
  lastThreeInsertListenerChannel!: RealtimeChannel;

  constructor() {
    this.getAllRecipes();
    this.lastThreeRecipesListener();
    this.recipeInsertListener();
  }

  lastThreeRecipesListener() {
    this.lastThreeInsertListenerChannel = this.supabase
      .channel('last-three-recipes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'recipes' }, async () => {
        await this.getLastThreeRecipes();
      })
      .subscribe();
  }

  recipeInsertListener() {
    this.recipeInsertListenerChannel = this.supabase
      .channel('recipe-insert')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'recipes' },
        (payload) => {
          let newRecipe = new RecipeModel(payload.new);
          this.allRecipes.update((recipes) => [...recipes, newRecipe]);
        },
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.lastThreeInsertListenerChannel);
    this.supabase.removeChannel(this.recipeInsertListenerChannel);
  }

  generateRecipe(data: any) {
    return this.http.post('https://zeljko-alakovic.app.n8n.cloud/webhook/generate-recipe', data);
  }

  getTimeDifficulty(time: number): string {
    if (time <= 24) {
      return 'Quick';
    } else if (time <= 44) {
      return 'Medium';
    } else {
      return 'Complex';
    }
  }

  async getLastThreeRecipes() {
    let response = await this.supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    if (response.data) {
      this.lastRecipeList.set(response.data as RecipeInterface[]);
    }
  }

  async getAllRecipes() {
    let response = await this.supabase.from('recipes').select('*');
    if (response.data) {
      this.allRecipes.set(response.data as RecipeInterface[]);
    }
  }

  async getRecipeById(id: number) {
    let response = await this.supabase.from('recipes').select('*').eq('id', id).single();
    if (response.data) {
      this.recipeDetail.set(response.data as RecipeInterface);
    }
  }
}
