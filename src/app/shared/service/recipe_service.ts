import { Injectable, inject, signal } from '@angular/core';
import { Unit } from '../types/recipe_types';
import { Ingredient, RecipeInterface } from '../interfaces/recipe_interface';
import { HttpClient } from '@angular/common/http';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  supabase = createClient(
    'https://reloxnbkcdalbugsqoop.supabase.co',
    'sb_publishable_F2iDzbZDnYfkrYy2UZ32_g_bCqeH339',
  );

  lastRecipeList = signal<RecipeInterface[]>([]);
  recipeDetail = signal<RecipeInterface>({
    id: '',
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
    steps:[{
      name:'',
      description:''
    }],
    likes: 0,
    extraIngredients: [],
  });

  ingredients: Ingredient[] = [];
  units: Unit[] = ['piece', 'ml', 'gram'];
  http = inject(HttpClient);

  generateRecipe(data: any) {
    console.log('Sending to AI:', data);
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

  async getRecipeById(id: number) {
    let response = await this.supabase.from('recipes').select('*').eq('id', id).single();
    if (response.data) {
      this.recipeDetail.set(response.data as RecipeInterface);
    }
  }
}
