import { Routes } from '@angular/router';
import { LandingPage } from './shared/components/landing-page/landing-page';
import { Cookbook } from './shared/components/cookbook/cookbook';
import { RecipeGenerator } from './shared/components/recipe-generator/recipe-generator';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'cookbook',
        component: Cookbook
    },
    {
        path: 'recipe-generator',
        component: RecipeGenerator
    }
];
