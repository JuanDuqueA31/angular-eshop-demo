import { ProductsService } from './../../services/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/Product.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  
  product$: Observable<Product> | null = null;
  
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id')!;
      
    this.product$ = this.ProductsService.getProductsById(id);
  }


}
