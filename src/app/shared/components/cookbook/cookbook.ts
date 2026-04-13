import { Component, computed, inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { RecipeMiniCard } from '../recipe-mini-card/recipe-mini-card';

@Component({
  selector: 'app-cookbook',
  imports: [RecipeMiniCard],
  templateUrl: './cookbook.html',
  styleUrls: ['./cookbook.scss'],
})
export class Cookbook {
  recipeService = inject(RecipeService);

  mostLiked = computed(() => {
    return this.recipeService
      .allRecipes()
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);
  });
}
