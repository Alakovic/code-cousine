import { Component, inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { Unit } from '../../types/recipe_types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-generator',
  imports: [FormsModule],
  templateUrl: './recipe-generator.html',
  styleUrl: './recipe-generator.scss',
})
export class RecipeGenerator {
  open: boolean = false;
  selectedUnit: Unit = 'gram';
  recipeService = inject(RecipeService);
  units = this.recipeService.units;
  ingredient: string = '';
  quantity: number | null = null;
  quantityError: boolean = false;
  quantityTouched: boolean = false;

  selectUnit(unit: Unit) {
    this.selectedUnit = unit;
    this.open = false;
  }

  isValidIngredient(): boolean {
    this.quantityError = this.quantity === null || this.quantity < 1;
    return this.ingredient.trim() !== '' && !this.quantityError;
  }

  addIngredient() {
    if (!this.isValidIngredient()) return;
    this.recipeService.ingredients.push({
      name: this.ingredient,
      quantity: this.quantity,
      unit: this.selectedUnit,
    });
    this.ingredient = '';
    this.quantity = null;
    this.selectedUnit = 'gram';
    this.quantityError = false;
  }
}
