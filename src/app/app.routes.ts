import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent:()=>import('./pages/landing/landing.component').then((mod)=>mod.LandingComponent)}
];
