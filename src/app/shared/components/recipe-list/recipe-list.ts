import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../service/recipe_service';
import { CuisineType } from '../../types/recipe_types';
import { RecipeSingle } from '../recipe-single/recipe-single';

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink, RecipeSingle],
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.scss'],
})
export class RecipeList {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  recipeService = inject(RecipeService);
  cuisine: CuisineType | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 15;

  heroMap: Record<string, string> = {
    italian: '/assets/img/hero/italian.svg',
    german: '/assets/img/hero/german.svg',
    indian: '/assets/img/hero/indian.svg',
    japanese: '/assets/img/hero/japanese.svg',
    gourmet: '/assets/img/hero/gourmet.svg',
    fusion: '/assets/img/hero/fusion.svg',
  };

  ngOnInit(): void {
    let cuisineParam = this.route.snapshot.paramMap.get('cuisine') as CuisineType;
    if (!cuisineParam) return;
    this.cuisine = cuisineParam;
    this.recipeService.getRecipesByCuisine(cuisineParam);
  }

  paginatedRecipes() {
    const all = this.recipeService.recipeByCuisine();

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    return all.slice(start, end);
  }

  totalPages() {
    return Math.ceil(this.recipeService.recipeByCuisine().length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
