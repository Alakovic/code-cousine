import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CounterType } from '../../types/recipe_types';

@Component({
  selector: 'app-recipe-preferences',
  imports: [RouterLink],
  templateUrl: './recipe-preferences.html',
  styleUrl: './recipe-preferences.scss',
})
export class RecipePreferences {

  portions: number = 1;
  chefs: number = 1;

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
}
