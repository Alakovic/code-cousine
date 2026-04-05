import { Injectable,inject } from '@angular/core';
import { Unit } from '../types/recipe_types';
import { Ingredient } from '../interfaces/recipe_interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  ingredients: Ingredient[] = [];
  units : Unit[] = ['piece', 'ml', 'gram'];
  http = inject(HttpClient);

  generateRecipe(data:any){
    console.log('Sending to AI:', data );
    return this.http.post('https://zeljko-alakovic.app.n8n.cloud/webhook-test/generate-recipe', data);
  }
}

