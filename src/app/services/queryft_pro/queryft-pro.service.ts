import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { QueryProductFamily } from '../../Interface/QueryProductFamily';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class QueryftProService {

  constructor(private _http:HttpClient) { }
  getallProductFamily(nombreProducto:string):Observable<QueryProductFamily[]>{
    return this._http.get<QueryProductFamily[]>(environment.urlQueryProductFamily+`${nombreProducto}`).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.log('Se ha ocurrido un error' + error.status)
    }else{
      console.log('Se ha producido error desde  el backend: ' + error.status + error.message)
    }
    return throwError(()=> new Error("Se ha producido un error, vuelva intentar"))
  }

}
