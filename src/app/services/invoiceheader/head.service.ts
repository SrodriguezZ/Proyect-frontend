import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { InvoiceHeader } from '../../Interface/InvoiceHeader';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadService {

  constructor(private _http:HttpClient) { }

  getIdInvoiceHeader(id:number):Observable<InvoiceHeader>{
    return this._http.get<InvoiceHeader>(environment.urlInvoiceHeader+`/${id}`).pipe(
      catchError(this.headerError)
    )
  }

  getAllInvoiceHeader():Observable<InvoiceHeader[]>{
    return this._http.get<InvoiceHeader[]>(environment.urlInvoiceHeader).pipe(
      catchError(this.headerError)
    )
  }

  deleteIdHeaderAndDetail(id:number){
    return this._http.delete(environment.urlInvoiceHeader+`/${id}`).pipe(
      catchError(this.headerError)
    )
  }

  headerError(error:HttpErrorResponse){
    if(error.status ===0){
      console.log('Error desde el Frontend: ' + error.message)
    }else{
      console.log('Error desde el backend: ' + error.status + error.message)
    }
    return throwError(()=>{new Error('Error vuelva intentar')})
  }
}
