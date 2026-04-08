import { Component ,Input,inject} from '@angular/core';
import { RecipeInterface } from '../../interfaces/recipe_interface';
import { RecipeService } from '../../service/recipe_service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  @Input() recipe!: RecipeInterface;
  @Input() index!:number;
  recipeService = inject(RecipeService)
}
