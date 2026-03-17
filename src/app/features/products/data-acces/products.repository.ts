import { Product } from './../models/Product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { inject, Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';



@Injectable({providedIn: 'root'})

export class ProductsRepository{

    private readonly api: ApiService = inject(ApiService);


    mapResponseApi(apiResponse: any): Product{
        return {
            id: apiResponse.id,
            name: apiResponse.title,
            category: apiResponse.category,
            description: apiResponse.description,
            images: apiResponse.images,
            price: apiResponse.price,
            stock: apiResponse.stock,
            rating: apiResponse.rating
        }
    }

    getProducts(): Observable<Product[]>;
    getProducts(id: string): Observable<Product>;
    getProducts(id?: string): Observable<Product[] | Product>{
        if (!id){
            return this.api.get<{products: Product[]}>('products').pipe(map(
            res => res.products.map(p => this.mapResponseApi(p))
        ))
        }
        return this.api.get<Product>(`products/${id}`).pipe(map(
            res => this.mapResponseApi(res)
        ))
    }

    searchProducts(params: HttpParams): Observable<Product[]> {
    return this.api
        .get<{ products: any[] }>('products/search', params)
        .pipe(
            map(res => res.products.map(p => this.mapResponseApi(p)))
        );
    }
}



