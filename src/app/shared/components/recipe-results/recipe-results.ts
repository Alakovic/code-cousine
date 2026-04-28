import { Component, OnInit, signal, inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { TitleCasePipe } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-results',
  imports: [TitleCasePipe, RecipeCard, RouterLink],
  templateUrl: './recipe-results.html',
  styleUrls: ['./recipe-results.scss'],
})
export class RecipeResults {
  recipeService = inject(RecipeService);
  location = inject(Location);
  error = this.recipeService.error;

  goBack() {
    this.location.back();
  }

  getErrorMessage(): string {
    let err = this.error();
    switch (err) {
      case 'NOT_ENOUGH_INGREDIENTS':
        return "It looks like some ingredient quantities aren't sufficient for your selected servings. Please Add or adjust quantities and try again.";
      case 'INVALID_UNIT':
        return 'Invalid unit (e.g. milk should be ml)';
      case 'INVALID_QUANTITY':
        return 'Quantity must be greater than 0';
      case 'INVALID_INPUT':
        return 'Input is invalid';
      case 'RATE_LIMIT_EXCEEDED':
        let retry = this.recipeService.rateLimitInfo();
        return retry !== null
          ? `Too many requests. Try again in ${retry}s`
          : 'Too many requests. Try again later.';
      case 'SERVER_ERROR':
        return 'Server error. Please try again.';
      default:
        return 'Something went wrong';
    }
  }
}
