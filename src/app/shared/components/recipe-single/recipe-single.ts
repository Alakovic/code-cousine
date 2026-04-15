import { Component, inject, Input } from '@angular/core';
import { RecipeInterface } from '../../interfaces/recipe_interface';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { RecipeService } from '../../service/recipe_service';

@Component({
  selector: 'app-recipe-single',
  imports: [TitleCasePipe],
  templateUrl: './recipe-single.html',
  styleUrls: ['./recipe-single.scss'],
})
export class RecipeSingle {
  @Input() recipe!: RecipeInterface;
  @Input() index!: number;
  router = inject(Router);
  recipeService = inject(RecipeService);

  goToRecipeDetail(){
    this.router.navigate(['/recipe', this.recipe.id])
  }

  isDietVisible() {
    return this.recipe.diet !== 'none';
  }
}
