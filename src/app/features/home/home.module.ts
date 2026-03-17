import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'home',
    component:HomeComponent
  }
]

@NgModule({
  declarations: [
    LandingPageComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
