import { Component, inject } from '@angular/core';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  private readonly productsService = inject(ProductsService);

  // Filtro, búsqueda y página
  private readonly filter$ = new BehaviorSubject<'all' | 'expensive' | 'cheaper'>('all');
  private readonly search$ = new BehaviorSubject<string>(''); 
  private readonly page$ = new BehaviorSubject<number>(1);

  readonly pageSize = 5;
  currentPage = 1;
  searchTerm = '';


  readonly pagedProducts$ = combineLatest([this.filter$, this.search$, this.page$]).pipe(
    switchMap(([filter, searchTerm, page]) => {
      let products$;

      
      if (searchTerm) {
        const params = new HttpParams().set('q', searchTerm);
        products$ = this.productsService.searchProducts(params);
      } else {
        
        products$ = this.productsService.getProductList();
      }

      return products$.pipe(
        map(products => {
          let filteredProducts = [...products];

          // Aplicar filtro solo si no es "all"
          if (filter === 'expensive') {
            filteredProducts.sort((a, b) => b.price - a.price);
          } else if (filter === 'cheaper') {
            filteredProducts.sort((a, b) => a.price - b.price);
          }

          // Paginar
          const start = (page - 1) * this.pageSize;
          return filteredProducts.slice(start, start + this.pageSize);
        })
      );
    })
  );

  // Cambiar filtro
  setFilter(filter: 'all' | 'expensive' | 'cheaper') {
    this.filter$.next(filter);
    this.changePage(1);


    if (filter === 'all') {
      this.searchTerm = '';
      this.search$.next('');
    }
  }

  // Cambiar página
  changePage(page: number) {
    this.currentPage = page;
    this.page$.next(page);
  }

  // Botón de búsqueda
  search() {
    this.changePage(1);
    this.search$.next(this.searchTerm);
  }
}