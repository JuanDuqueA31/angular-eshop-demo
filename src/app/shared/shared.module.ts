import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostRatedProductListComponent } from './components/most-rated-product-list/most-rated-product-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    MostRatedProductListComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MostRatedProductListComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
