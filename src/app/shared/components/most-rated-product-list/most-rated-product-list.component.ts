import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../features/products/services/products.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Product } from '../../../features/products/models/Product.model';

@Component({
  selector: 'app-most-rated-product-list',
  templateUrl: './most-rated-product-list.component.html',
  styleUrl: './most-rated-product-list.component.scss'
})
export class MostRatedProductListComponent {
  private readonly productsService = inject(ProductsService);

  private readonly page$ = new BehaviorSubject<number>(1);

  readonly itemsPerPage = 6;

  readonly products$ = this.productsService.getMostRatedProducts();

  readonly paginatedProducts$: Observable<Product[]> = combineLatest([
    this.products$,
    this.page$
  ]).pipe(
    map(([products, page]) => {
      const start = (page - 1) * this.itemsPerPage;
      return products.slice(start, start + this.itemsPerPage);
    })
  );

  readonly totalPages$: Observable<number> = this.products$.pipe(
    map(products => Math.ceil(products.length / this.itemsPerPage))
  );

  changePage(page: number) {
    this.page$.next(page);
  }

  get currentPage() {
    return this.page$.value;
  }

}
