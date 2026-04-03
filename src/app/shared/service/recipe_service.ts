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


}

