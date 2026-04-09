import { Routes } from '@angular/router';
import { LandingPage } from './shared/components/landing-page/landing-page';
import { Cookbook } from './shared/components/cookbook/cookbook';
import { RecipeGenerator } from './shared/components/recipe-generator/recipe-generator';
import { RecipePreferences } from './shared/components/recipe-preferences/recipe-preferences';
import { RecipeResults } from './shared/components/recipe-results/recipe-results';
import { RecipeOverview } from './shared/components/recipe-overview/recipe-overview';

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
    },
    {
        path: 'preferences',
        component: RecipePreferences
    },
    {
        path: 'results',
        component: RecipeResults
    },
    {
        path: 'recipe/:id',
        component: RecipeOverview
    },
    {
        path: 'cookbook',
        component: Cookbook
    }
];
