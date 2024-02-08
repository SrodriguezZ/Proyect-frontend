import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Product } from '../../Interface/Product';
import { HttpClient, HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { InvoiceNumberSequence } from '../../Interface/InvoiceNumberSequence';
import { environment } from '../../environment/environment';
import { InvoiceHeader } from '../../Interface/InvoiceHeader';
import { InvoiceDetail } from '../../Interface/InvoiceDetail';
import { UpdateStock } from '../../Interface/UpdateStock';

@Injectable({
  providedIn: 'root'
})
export class FactservService {

  constructor(private _http:HttpClient) { }
  
  getInvoiceNumberSequence():Observable<InvoiceNumberSequence>{
    return this._http.get<InvoiceNumberSequence>(environment.urlQueryInvoiceQuerySequence).pipe(
      catchError(this.headerError)
    )
  }

  postInvoiceHeader(invoiceHeader:InvoiceHeader):Observable<InvoiceHeader>{
    return this._http.post<InvoiceHeader>(environment.urlInvoiceHeader,invoiceHeader).pipe(
      catchError(this.headerError)
    )
  }

  postInvoiceDetail(invoiceDetail:InvoiceDetail[]):Observable<InvoiceDetail[]>{
    return this._http.post<InvoiceDetail[]>(environment.urlInvoiceDetail,invoiceDetail).pipe(
      catchError(this.headerError)
    )
  }

  //restStockProduct  }
  updateStockProduct(id:number,stock:number){
    return this._http.put(environment.urlProduct+`/update/stock/${id}/${stock}`,{}).pipe(
      catchError(this.headerError)
    )
  }


  headerError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Error desde el Frontend ' + error.status)
    }else{
      console.log('Error desde el backend ' + error.status + error.message)
    }
    return throwError(()=>{new Error('Vuelva intentar')})
  }
}
