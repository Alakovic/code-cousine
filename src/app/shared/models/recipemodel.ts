import { Ingredient, Nutrition, RecipeInterface, Steps } from '../interfaces/recipe_interface';
import { CuisineType, DietType } from '../types/recipe_types';

export class RecipeModel implements RecipeInterface {
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

  constructor(data: Partial<RecipeInterface>) {
    this.id = data.id ?? 0;
    this.ingredients = data.ingredients ?? [];
    this.name = data.name ?? '';
    this.cuisine = data.cuisine ?? 'italian';
    this.diet = data.diet ?? 'vegetarian';
    this.time = data.time ?? 0;
    this.portions = data.portions ?? 0;
    this.chefs = data.chefs ?? 0;
    this.nutrition = data.nutrition ?? { energy: 0, protein: 0, fat: 0, carbs: 0 };
    this.steps = data.steps ?? [{ name: '', description: '' }];
    this.likes = data.likes ?? 0;
    this.extraIngredients = data.extraIngredients ?? [];
  }

  getCleanAddJson() {
    return {
      ingredients: this.ingredients,
      name: this.name,
      cuisine: this.cuisine,
      diet: this.diet,
      time: this.time,
      portions: this.portions,
      chefs: this.chefs,
      nutrition: this.nutrition,
      steps: this.steps,
      likes: this.likes,
      extraIngredients: this.extraIngredients,
    };
  }
}
