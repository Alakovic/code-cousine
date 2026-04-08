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
  
  ingredients: Ingredient[] = [];
  units: Unit[] = ['piece', 'ml', 'gram'];
  http = inject(HttpClient);

  generateRecipe(data: any) {
    console.log('Sending to AI:', data);
    return this.http.post('https://zeljko-alakovic.app.n8n.cloud/webhook/generate-recipe', data);
  }

  async getLastThreeRecipes() {
    let response = await this.supabase.from('recipes').select('*').order('created_at', { ascending: false }).limit(3);
    if (response.data) {
      this.lastRecipeList.set(response.data as RecipeInterface[]);
    }
  
  }


}
