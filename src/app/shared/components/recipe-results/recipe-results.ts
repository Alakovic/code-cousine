import { Component,OnInit,signal } from '@angular/core';

@Component({
  selector: 'app-recipe-results',
  imports: [],
  templateUrl: './recipe-results.html',
  styleUrl: './recipe-results.scss',
})
export class RecipeResults implements OnInit {
  isLoading = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  }
}
