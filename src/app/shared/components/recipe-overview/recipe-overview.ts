import { Component,inject } from '@angular/core';
import {  RouterLink,Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../service/recipe_service';

@Component({
  selector: 'app-recipe-overview',
  imports: [RouterLink],
  templateUrl: './recipe-overview.html',
  styleUrls: ['./recipe-overview.scss'],
})
export class RecipeOverview {
  private route = inject (ActivatedRoute)
  recipeService = inject(RecipeService);
  detail = this.recipeService.recipeDetail;
  router = inject(Router);

  chefImages= [
    '/assets/img/cook1.svg',
    '/assets/img/cook2.svg',
    '/assets/img/cook3.svg',
    '/assets/img/cook4.svg'
  ]

  ngOnInit():void{
    let recipeId = Number(this.route.snapshot.paramMap.get('id'));
    if(!recipeId)return;
    this.recipeService.getRecipeById(recipeId);
  }

  chefsArray(){
    return this.chefImages.slice(0, this.detail().chefs);
  }
}
