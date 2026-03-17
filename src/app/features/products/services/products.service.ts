import { map } from 'rxjs/operators';

import { ProductsRepository } from '../data-acces/products.repository';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly productsRepo: ProductsRepository = inject(ProductsRepository);


  //addProduct(){}

  getProductList(): Observable<Product[]>{
    return this.productsRepo.getProducts();
  }

  getProductsById(id: string): Observable<Product>{
    return this.productsRepo.getProducts(id);
  }

  getMostRatedProducts(): Observable<Product[]> {
  return this.productsRepo.getProducts().pipe(
    map(products => [...products].sort((a, b) => b.rating - a.rating))
  );
  }

  searchProducts(search: HttpParams): Observable<Product[]>{
    return this.productsRepo.searchProducts(search)
  }
}
