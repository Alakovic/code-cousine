import { Component, OnInit, signal, inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { TitleCasePipe } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-results',
  imports: [TitleCasePipe, RecipeCard, RouterLink],
  templateUrl: './recipe-results.html',
  styleUrls: ['./recipe-results.scss'] ,
})
export class RecipeResults implements OnInit {
  recipeService = inject(RecipeService);

  async ngOnInit() {
    if (this.recipeService.resetResults()) {
      this.recipeService.lastRecipeList.set([]);
      this.recipeService.resetResults.set(false);
    }
  }
}
