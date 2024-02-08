import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../../Interface/Product';
import { environment } from '../../environment/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }
  //Get
  getAllProduct():Observable<Product[]>{
    return this._http.get<Product[]>(environment.urlProduct).pipe(
      catchError(this.headerError)
    )
  }

  //Post
  postProduct(product:Product):Observable<Product>{
    return this._http.post<Product>(environment.urlProduct,product).pipe(
      catchError(this.headerError)
    );
  }

  //GetId
  getIdProduct(id:number):Observable<Product>{
    return this._http.get<Product>(environment.urlProduct+`/${id}`).pipe(
      catchError(this.headerError)
    )
  }

  //UpdateProduct
  updateProduct(id:number, updateProduct:Product):Observable<Product>{
    return this._http.patch<Product>(environment.urlProduct+`/${id}`,updateProduct).pipe(
      catchError(this.headerError)
    )
  }
  
  //DeleteProduct
  deleteProductId(id:number):Observable<Product>{
    return this._http.delete<Product>(environment.urlProduct+`/${id}`).pipe(
      catchError(this.headerError)
    )
  }

  headerError(error:HttpErrorResponse){
    if(error.status ===0){
      console.log('Se ha ocurrido un error' + error.status)
    }else{
      console.log('Se ha producido error desde  el backend: ' + error.status + error.message)
    }
    return throwError(()=>new Error('Vuelva Intentar'))
  }
}
