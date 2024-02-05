import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../../Interface/Product';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }
  //Get
  getAllProduct():Observable<Product[]>{
    return this._http.get<Product[]>(environment.urlProduct).pipe(
      catchError(this.handleError)
    )
  }

  //Post
  postProduct(product:Product):Observable<Product>{
    return this._http.post<Product>(environment.urlProduct,product);
  }

  handleError(error:HttpErrorResponse){
    if(error.status ===0){
      console.log('Se ha ocurrido un error' + error.status)
    }else{
      console.log('Se ha producido error desde  el backend: ' + error.status + error.message)
    }
    return throwError(()=>new Error('Vuelva Intentar'))
  }
}
