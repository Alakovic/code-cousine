import { Component, computed, inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { RecipeMiniCard } from '../recipe-mini-card/recipe-mini-card';
import { RecipeInterface } from '../../interfaces/recipe_interface';
import { Router ,RouterLink} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cookbook',
  imports: [RecipeMiniCard, RouterLink],
  templateUrl: './cookbook.html',
  styleUrls: ['./cookbook.scss'],
})
export class Cookbook {
  recipeService = inject(RecipeService);
  router = inject(Router);
  location = inject(Location);
  isDown: boolean = false;
  isDragging: boolean = false;
  startX: number = 0;
  scrollLeft: number = 0;

  cuisines= [
    {name:'italian', label: 'Italian cuisine', labelIcon:'🤌', image:'assets/img/cuisine/italian.svg' },
    {name:'german', label: 'German cuisine', labelIcon:'🥨', image:'assets/img/cuisine/german.svg' },
    {name:'japanese', label: 'Japanese cuisine', labelIcon:'🥢', image:'assets/img/cuisine/japanese.svg' },
    {name:'gourmet', label: 'Gourmet cuisine', labelIcon:'✨', image:'assets/img/cuisine/gourmet.svg' },
    {name:'indian', label: 'Indian cuisine', labelIcon:'🍛', image:'assets/img/cuisine/indian.svg' },
    {name:'fusion', label: 'Fusion cuisine', labelIcon:'🍢', image:'assets/img/cuisine/fusion.svg' },
  ]

  /**
   * Computed list of the top 6 most liked recipes.
   * - Sorts all recipes by likes in descending order
   * - Returns only the first 6 items
   */
  mostLiked = computed(() => {
    return this.recipeService
      .allRecipes()
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6);
  });

  goBack() {
    this.location.back();
  }

  goToCuisine(cuisine: string) {
    this.router.navigate(['/recipes', cuisine]);
  }

  /**
   * Initializes the drag operation.
   * - Sets the dragging state (isDown)
   * - Stores the initial mouse X position relative to the container
   * - Stores the current scroll position
   */
  startDrag(event: MouseEvent) {
    this.isDown = true;
    this.startX = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    this.scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
  }

  /**
   * Handles mouse movement during dragging.
   * - Exits if dragging is not active
   * - Prevents text selection while dragging
   * - Calculates the horizontal movement (dx)
   * - Updates the scroll position accordingly
   * - Marks the interaction as a drag if movement exceeds 5px
   */
  onDrag(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    let x = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    let walk = (x - this.startX) * 2;
    (event.currentTarget as HTMLElement).scrollLeft = this.scrollLeft - walk;
    if (Math.abs(x - this.startX) > 5) {
      this.isDragging = true;
    }
  }

  /**
   * Stops the drag operation.
   * - Resets the dragging state (isDown)
   * - Delays resetting the isDragging state to allow click events to be ignored
   */
  stopDrag() {
    this.isDown = false;
    setTimeout(() => {
      this.isDragging = false;
    }, 100);
  }

  /**
   * Handles click events on a recipe card.
   * - Prevents navigation if the user was dragging
   * - Otherwise, navigates to the recipe detail page
   */
  handleClick(event: MouseEvent, recipe: RecipeInterface) {
    if (this.isDragging) {
      event.preventDefault();
      event.stopPropagation();
      return;
    } else {
      this.router.navigate(['/recipe', recipe.id]);
    }
  }
}
