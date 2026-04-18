import { Component, inject } from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { Unit } from '../../types/recipe_types';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-generator',
  imports: [FormsModule, RouterLink],
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
  editingIndex: number | null = null;
  openUnitIndex: number | null = null;
  ingredientFilter: string = '';

  ngOnInit() {
    this.recipeService.getIngredientsName();
  }

  selectUnit(unit: Unit) {
    this.selectedUnit = unit;
    this.open = false;
  }

  hasQuantityError(): boolean {
    return this.quantity === null || this.quantity < 1;
  }

  isValidIngredient(): boolean {
    return this.ingredient.trim() !== '' && !this.hasQuantityError();
  }

  addIngredient() {
    this.quantityError = this.hasQuantityError();
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
    this.quantityTouched = false;
  }

  toggleUnitDropdown(index: number) {
    this.openUnitIndex = this.openUnitIndex === index ? null : index;
  }

  selectUnitForItem(unit: Unit, item: any) {
    item.unit = unit;
    this.openUnitIndex = null;
  }

  removeIngredient(index: number) {
    this.recipeService.ingredients.splice(index, 1);
  }

  startEdit(index: number) {
    this.editingIndex = index;
  }

  saveEdit() {
    this.editingIndex = null;
    this.openUnitIndex = null;
  }

  getSuggestions() {
    return this.recipeService
      .ingredientsName()
      .filter((ing) => ing.name.toLowerCase().startsWith(this.ingredient.toLowerCase()))
      .slice(0, 3);
  }

  selectIngredient(name: string) {
    this.ingredient = name;
  }
}
