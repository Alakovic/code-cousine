import { Component,OnInit,signal,inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';

@Component({
  selector: 'app-recipe-results',
  imports: [],
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
}
