import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CounterType, CuisineType, DietType, TimeType } from '../../types/recipe_types';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../service/recipe_service';

@Component({
  selector: 'app-recipe-preferences',
  imports: [RouterLink, FormsModule],
  templateUrl: './recipe-preferences.html',
  styleUrls: ['./recipe-preferences.scss'],
})
export class RecipePreferences {

  portions: number = 1;
  chefs: number = 1;
  time: TimeType = null;
  cuisine: CuisineType = null;
  diet: DietType = null;
  recipeService = inject(RecipeService);

  increase(type:CounterType) {
    if (type === 'portions') {
      this.portions++;
    } else if (type === 'chefs'  && this.chefs < 4) {
      this.chefs++;
    }
  }

  decrease(type:CounterType) {
    if (type === 'portions' && this.portions > 1) {
      this.portions--;
    } else if (type === 'chefs' && this.chefs > 1) {
      this.chefs--;
    }
  }

  isValid(): boolean {
    return this.time !== null && this.cuisine !== null && this.diet !== null && this.portions > 0 && this.chefs > 0;
  }

  generateRecipe() {
    if (this.isValid()) {
     let recipe = {
      ingredients: this.recipeService.ingredients,
      portions: this.portions,
      chefs: this.chefs,
      time: this.time,
      cuisine: this.cuisine,
      diet: this.diet
     }
     this.recipeService.generateRecipe(recipe);
     }
  }
}
