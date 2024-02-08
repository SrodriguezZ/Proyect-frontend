import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Login } from '../../Interface/Login';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  //BehaviorSubject
  userLongOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private _http: HttpClient) {}

  //PostLogin
  authLogin(login: Login): Observable<string> {
    return this._http
      .post(environment.urlAuth + `/ingreso`, login, { responseType: 'text' })
      .pipe(
        tap(() => {
          this.userLongOn.next(true);
        }), 
      );
  }
  //loginOff
  loginoff() {
    this.userLongOn.next(false);
  }

  //PostRegister
  postRegistUser(user:Login){
    return this._http.post<Login>(environment.urlbackend+`usuario`,user).pipe(
      catchError(this.headerError)
    )
  }


  //Control de  Errores
  public headerError(error:HttpErrorResponse) {
    if(error.status === 0){
      console.log('Error desde el Frontend')
    }else{
      console.log('Error desde el backend')
    }
    return throwError (()=>new Error('Vuelva Intentar'))
  }

  //Obtener el valor de mi BehaviorSUbject
  get userLoginOncurrent() {
    return this.userLongOn.value;
  }
  //current loginOn Observable
  get userLoginOnObservable(): Observable<boolean> {
    return this.userLongOn.asObservable();
  }
}
