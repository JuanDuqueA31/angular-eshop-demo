import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';
import { ApiService } from '../../../core/services/api.service';
import { inject, Injectable } from "@angular/core";
import { HttpParams } from '@angular/common/http';



@Injectable({providedIn: 'root'})

export class ProductsRepository{

    private readonly api: ApiService = inject(ApiService);


    mapResponseApi(apiResponse: any): Product{
        return {
            id: apiResponse.id,
            name: apiResponse.name,
            category: apiResponse.category,
            description: apiResponse.description,
            images: apiResponse.images,
            price: apiResponse.price,
            stock: apiResponse.stock
        }
    }

    getProducts(): Observable<Product[]>;
    getProducts(id: HttpParams): Observable<Product>;
    getProducts(id?: HttpParams): Observable<Product[] | Product>{
        if (!id){
            return this.api.get<{products: any[]}>('products').pipe(map(
            res => res.products.map(p => this.mapResponseApi(p))
        ))
        }
        return this.api.get<{product: any}>('product', id).pipe(map(
            res => this.mapResponseApi(res.product)
        ))
    }
}


