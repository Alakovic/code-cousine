import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink,Router,NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isWhiteTheme = false;

  constructor(private router:Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isWhiteTheme = event.urlAfterRedirects.includes('cookbook') || event.urlAfterRedirects.includes('recipe-generator');
      }
    });

  }
}
