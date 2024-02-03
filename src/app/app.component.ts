import { Component, OnDestroy } from '@angular/core';
import { AuthserviceService } from './services/serauth/authservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  title = 'producto';
  cuerpo: boolean = false;
  centinelaLogin: boolean = false;
  private authSubscription: Subscription;
  
  constructor(private authService: AuthserviceService,private router:Router){
    this.authSubscription =this.authService.userLoginOnObservable.subscribe({
      next:((userLoginOn)=>{
        (this.cuerpo= userLoginOn), (this.centinelaLogin=userLoginOn)
      })
    })
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  loginOff(){
    this.authService.loginoff()
    this.router.navigate(['/login'])
  }


}
