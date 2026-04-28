import { Injectable, inject, signal } from '@angular/core';
import { Unit } from '../types/recipe_types';
import { Ingredient, RecipeInterface } from '../interfaces/recipe_interface';
import { HttpClient } from '@angular/common/http';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { RecipeModel } from '../models/recipemodel';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
  recipeByCuisine = signal<RecipeInterface[]>([]);
  ingredientsName = signal<Pick<Ingredient, 'name'>[]>([]);

  ingredients: Ingredient[] = [];
  units: Unit[] = ['piece', 'ml', 'gram'];
  http = inject(HttpClient);
  resetResults = signal(false);
  router = inject(Router);
  previousUrl = signal<string>('');
  currentUrl = signal<string>('');
  error = signal<string | null>(null);
  rateLimitInfo = signal<number | null>(null);

  recipeInsertListenerChannel!: RealtimeChannel;
  lastThreeInsertListenerChannel!: RealtimeChannel;

  constructor() {
    this.getAllRecipes();
    this.lastThreeRecipesListener();
    this.recipeInsertListener();
    this.navigationTracking();
  }

  navigationTracking() {
    this.currentUrl.set(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.previousUrl.set(this.currentUrl());
        this.currentUrl.set(event.urlAfterRedirects);
      });
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
      this.recipeDetail.set({ ...response.data } as RecipeInterface);
    }
  }

  async getRecipesByCuisine(cuisine: string) {
    let response = await this.supabase.from('recipes').select('*').eq('cuisine', cuisine);
    if (response.data) {
      this.recipeByCuisine.set(response.data as RecipeInterface[]);
    }
  }

  async updateLikes(id: number, likes: number) {
    await this.supabase.from('recipes').update({ likes }).eq('id', id);
    this.allRecipes.update((recipes) => recipes.map((r) => (r.id === id ? { ...r, likes } : r)));
  }

  async getIngredientsName() {
    let response = await this.supabase.from('recipes').select('ingredients');
    if (response.data) {
      this.ingredientsName.set(
        response.data.flatMap((recipe: any) =>
          recipe.ingredients.map((ing: any) => ({ name: ing.name })),
        ),
      );
    }
  }
}
