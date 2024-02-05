import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FamProducto } from '../../Interface/FamProducto';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FamProductoService {
  constructor(private http: HttpClient) {}
  //Post Product
  postFamProducto(famProducto: FamProducto): Observable<any> {
    return this.http
      .post(environment.urlFamilyProduct, famProducto)
      .pipe(catchError(this.handleError));
  }

  //GetAll Product
  getAllProduct():Observable<FamProducto[]>{
    return this.http.get<FamProducto[]>(environment.urlFamilyProduct).pipe(
      catchError(this.handleError)
    )
  }

  //getIdProduct
  getIdProduct(id:number):Observable<FamProducto>{
    return this.http.get<FamProducto>(environment.urlFamilyProduct+`/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  
  //updateFamProduct
  updateProduct(id:number, famProducto:FamProducto):Observable<FamProducto>{
    return this.http.patch<FamProducto>(environment.urlFamilyProduct+`/${id}`,famProducto).pipe(
      catchError(this.handleError)
    )
  }

  //DeleteFamProduct
  deleteProduct(id:number):Observable<any>{
   return this.http.delete(environment.urlFamilyProduct+`/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('Se ha producido un error: ' + error.message);
    }else{
      console.log('Se ha producido un error del backend ' + error.status + error.message)
    }
    return throwError(()=> new Error('Vuelva intentar'))
  }
}
