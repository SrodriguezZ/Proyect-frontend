import { Component, OnDestroy } from '@angular/core';
import { AuthserviceService } from './services/serauth/authservice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'producto';
  cuerpo: boolean = false;
  centinelaLogin: boolean = false;
  private authSubscription: Subscription;
  
  constructor(private authService: AuthserviceService){
    this.authSubscription =this.authService.userLoginOnObservable.subscribe({
      next:((userLoginOn)=>{
        (this.cuerpo= userLoginOn), (this.centinelaLogin=userLoginOn)
      })
    })
  }


}
