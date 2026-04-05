import { Injectable,inject } from '@angular/core';
import { Unit } from '../types/recipe_types';
import { FormBuilder } from '@angular/forms';
import { Ingredient } from '../interfaces/recipe_interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  fb = inject(FormBuilder);
  ingredients: Ingredient[] = [];

  units : Unit[] = ['piece', 'ml', 'gram'];

  generateRecipe(data:any){
    console.log('Sending to AI:', data );
    // Later this will be the logic to send the data to the AI and get the recipe back
  }
}

