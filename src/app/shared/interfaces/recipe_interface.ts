import { Unit } from "../types/recipe_types";

export interface RecipeInterface {
    ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: number | null;
  unit: Unit;
}


