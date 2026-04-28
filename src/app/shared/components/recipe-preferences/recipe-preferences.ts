import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
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
  router = inject(Router);

  increase(type: CounterType) {
    if (type === 'portions') {
      this.portions++;
    } else if (type === 'chefs' && this.chefs < 4) {
      this.chefs++;
    }
  }

  decrease(type: CounterType) {
    if (type === 'portions' && this.portions > 1) {
      this.portions--;
    } else if (type === 'chefs' && this.chefs > 1) {
      this.chefs--;
    }
  }

  isValid(): boolean {
    return (
      this.time !== null &&
      this.cuisine !== null &&
      this.diet !== null &&
      this.portions > 0 &&
      this.chefs > 0
    );
  }

  generateRecipe() {
    if (this.isValid()) {
      this.recipeService.error.set(null);
      this.recipeService.rateLimitInfo.set(null);
      let recipe = {
        ingredients: this.recipeService.ingredients,
        portions: this.portions,
        chefs: this.chefs,
        time: this.time,
        cuisine: this.cuisine,
        diet: this.diet,
      };
      this.router.navigate(['/results']);
      this.handleGenerate(recipe);
    }
  }

  handleGenerate(recipe: any) {
    this.recipeService.generateRecipe(recipe).subscribe({
      next: (res: any) => {
        let data = Array.isArray(res) ? res[0] : res;
        if (data.error) {
          this.recipeService.error.set(data.error);
          if (data.error === 'RATE_LIMIT_EXCEEDED') {
            this.recipeService.rateLimitInfo.set(Number(data.retryAfter));
          }
          return;
        }
        this.recipeService.resetResults.set(true);
        this.resetPreferences();
      },
      error: () => {
        this.recipeService.error.set('SERVER_ERROR');
      },
    });
  }

  resetPreferences() {
    this.portions = 1;
    this.chefs = 1;
    this.time = null;
    this.cuisine = null;
    this.diet = null;
    this.recipeService.ingredients = [];
  }
}
