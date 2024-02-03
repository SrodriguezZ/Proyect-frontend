import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Login } from '../../Class/Login';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  //BehaviorSubject
  userLongOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) { }

  authLogin(login: Login):Observable<string>{
    return this.http.post(environment.urlAuth+`/ingreso`,login, { responseType: 'text' }).
    pipe(
      tap(()=>{
        this.userLongOn.next(true)
      }),catchError(this.handleError)
    )
}
  //Control de  Errores
  private handleError(error:HttpErrorResponse):Observable<string>{
    if(error.status === 401){
      return throwError('Error Credencial Usuario o contraseña incorrecta');
    }else if(error.status === 403){
      return throwError('Usuario bloqueado o error de autorización')
    }else{
      return throwError('Otro error desde el backend');
    }
}

//Obtener el valor de mi BehaviorSUbject
get userLoginOncurrent(){
  return this.userLongOn.value;
}
//current loginOn Observable
get userLoginOnObservable():Observable<boolean>{
  return this.userLongOn.asObservable();
}
}
