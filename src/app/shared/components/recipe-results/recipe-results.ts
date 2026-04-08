import { Component,OnInit,signal,inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { TitleCasePipe } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-results',
  imports: [TitleCasePipe,RecipeCard],
  templateUrl: './recipe-results.html',
  styleUrl: './recipe-results.scss',
})
export class RecipeResults implements OnInit {
  isLoading = signal(true);
  recipeService = inject(RecipeService);

  async ngOnInit() {
    await this.recipeService.getLastThreeRecipes();
    this.isLoading.set(false);
  }

  getTimeDifficulty(time: number): string {
    if (time <= 24) {
      return 'Quick';
    } else if (time <= 44) {
      return 'Medium';
    } else {
      return 'Complex';
    }
  }
}
