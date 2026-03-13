import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private readonly http: HttpClient = inject(HttpClient)

  private readonly URL: string = 'https://dummyjson.com'

  get<T>(path: string, params?: HttpParams): Observable<T>{
    return this.http.get<T>(`${this.URL}/${path}`, {params})
  }

  post<Res, Body>(path: string, body: Body): Observable<Res>{
    return this.http.post<Res>(`${this.URL}/${path}`, body)
  }
}
