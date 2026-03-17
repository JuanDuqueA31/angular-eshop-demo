import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './pages/product/product.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const routes: Route[] = [
  {
  path: '',
  component: ProductsListComponent
  },
  {
  path: ':id',
  component: ProductComponent
  }
]

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule 
  ]
})
export class ProductsModule { }
