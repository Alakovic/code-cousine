import { Component, inject, signal, computed } from '@angular/core';
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
  currentPage = signal(1);
  itemsPerPage: number = 15;

  heroMap: Record<string, string> = {
    italian: 'assets/img/hero/italian.svg',
    german: 'assets/img/hero/german.svg',
    indian: 'assets/img/hero/indian.svg',
    japanese: 'assets/img/hero/japanese.svg',
    gourmet: 'assets/img/hero/gourmet.svg',
    fusion: 'assets/img/hero/fusion.svg',
  };

  titleMap: Record<string, string> = {
    italian: 'Italian cuisine',
    german: 'German cuisine',
    indian: 'Indian cuisine',
    japanese: 'Japanese cuisine',
    gourmet: 'Gourmet cuisine',
    fusion: 'Fusion cuisine',
  };

  ngOnInit(): void {
    let cuisineParam = this.route.snapshot.paramMap.get('cuisine') as CuisineType;
    if (!cuisineParam) return;
    this.cuisine = cuisineParam;
    this.recipeService.getRecipesByCuisine(cuisineParam);
  }

  paginatedRecipes = computed(() => {
    let all = this.recipeService.recipeByCuisine();
    let page = this.currentPage();
    let start = (page - 1) * this.itemsPerPage;
    let end = start + this.itemsPerPage;
    return all.slice(start, end);
  });

  totalPages = computed(() => {
    return Math.ceil(this.recipeService.recipeByCuisine().length / this.itemsPerPage);
  });

  pages = computed(() => {
    let total = this.totalPages();
    let current = this.currentPage();
    let pages: (number | string)[] = [];
    pages.push(1);
    if (current > 3) {
      pages.push('...');
    }
    pages.push(...this.getMiddlePages(current, total));
    if (current < total - 2) {
      pages.push('...');
    }
    if (total > 1) {
      pages.push(total);
    }
    return pages;
  });

  getMiddlePages(current: number, total: number): number[] {
    let pages: number[] = [];
    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }

    return pages;
  }

  goToPage(page: number | string) {
    if (typeof page !== 'number') return;
    this.currentPage.set(page);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }
}
