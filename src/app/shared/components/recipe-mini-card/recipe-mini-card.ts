import { Component,inject ,Input} from '@angular/core';
import { RecipeService } from '../../service/recipe_service';
import { RecipeInterface } from '../../interfaces/recipe_interface';

@Component({
  selector: 'app-recipe-mini-card',
  imports: [],
  templateUrl: './recipe-mini-card.html',
  styleUrl: './recipe-mini-card.scss',
})
export class RecipeMiniCard {
  @Input() recipe!: RecipeInterface;
  @Input() index!: number;
  recipeService = inject(RecipeService);
}
