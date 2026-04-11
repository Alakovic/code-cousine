import { CuisineType, DietType, TimeType, Unit } from '../types/recipe_types';

export interface RecipeInterface {
  id: number;
  ingredients: Ingredient[];
  name: string;
  cuisine: CuisineType;
  diet: DietType;
  time: number;
  portions: number;
  chefs: number;
  nutrition: Nutrition;
  steps: Steps[];
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

export interface Steps{
  name:string;
  description:string;
}
