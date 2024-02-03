import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FamProducto } from '../../Class/FamProducto';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FamProductoService {
  constructor(private http: HttpClient) {}

  postFamProducto(famProducto: FamProducto): Observable<any> {
    return this.http
      .post(environment.urlbackend + `family/product`, famProducto)
      .pipe(catchError(this.handleError));
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
