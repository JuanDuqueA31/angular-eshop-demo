import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { ProductsRepository } from '../data-acces/products.repository';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly productsRepo: ProductsRepository = inject(ProductsRepository);


  //addProduct(){}

  getProductList(){
    return this.productsRepo.getProducts();
  }

  getProductsById(id: HttpParams){
    return this.productsRepo.getProducts(id);
  }

  getExpensiveProducts() {
  return this.productsRepo.getProducts().pipe(
    map(products => [...products].sort((a, b) => b.price - a.price))
  );
}

getCheaperProducts() {
  return this.productsRepo.getProducts().pipe(
    map(products => [...products].sort((a, b) => a.price - b.price))
  );
}
}
