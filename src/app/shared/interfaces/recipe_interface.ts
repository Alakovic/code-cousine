import { CuisineType, DietType, TimeType, Unit } from '../types/recipe_types';

export interface RecipeInterface {
  id: string;
  ingredients: Ingredient[];
  name: string;
  cuisine: CuisineType;
  diet: DietType;
  time: TimeType;
  portions: number;
  chefs: number;
  nutrition: Nutrition[];
  steps: string[];
  likes: number;
  extraIngredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: number | null;
  unit: Unit;
}

export interface Nutrition {
  energy: number;
  protein: number;
  fat: number;
  carbs: number;
}
