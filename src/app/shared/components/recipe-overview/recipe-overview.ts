import { Component, computed, HostListener, inject } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../service/recipe_service';
import { TitleCasePipe, Location } from '@angular/common';

@Component({
  selector: 'app-recipe-overview',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './recipe-overview.html',
  styleUrls: ['./recipe-overview.scss'],
})
export class RecipeOverview {
  private route = inject(ActivatedRoute);
  location = inject(Location);
  recipeService = inject(RecipeService);
  detail = this.recipeService.recipeDetail;
  router = inject(Router);
  liked: boolean = false;
  showIngredients: boolean = false;
  showSteps: boolean = false;
  isDesktop = window.innerWidth > 755;

  chefImages = [
    'assets/img/cook1.svg',
    'assets/img/cook2.svg',
    'assets/img/cook3.svg',
    'assets/img/cook4.svg',
  ];

  ngOnInit(): void {
    let recipeId = Number(this.route.snapshot.paramMap.get('id'));
    if (!recipeId) return;
    this.recipeService.getRecipeById(recipeId);
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 755;
    if (this.isDesktop) {
      this.showIngredients = true;
      this.showSteps = true;
    }
  }

  chefsArray() {
    return this.chefImages.slice(0, this.detail().chefs);
  }

  getChefForStep(stepIndex: number): string {
    let chefsCount = this.detail().chefs || 1;
    let index = stepIndex % chefsCount;
    return this.chefImages[index];
  }

  isDietVisible() {
    return this.detail().diet !== 'none';
  }

  async toggleLike() {
    this.liked = !this.liked;
    let recipe = this.detail();
    let newLikes = this.liked ? recipe.likes + 1 : recipe.likes - 1;
    await this.recipeService.updateLikes(recipe.id, newLikes);
    await this.recipeService.getRecipeById(recipe.id);
  }

  goBack() {
    this.location.back();
  }

  backButtonLabel = computed(() => {
    let prev = this.recipeService.previousUrl();
    if (prev.includes('/cookbook')) return 'Back to Cookbook';
    if (prev.includes('results')) return 'Recipe results';
    return 'Back';
  });
}
