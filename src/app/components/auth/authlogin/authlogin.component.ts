import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../services/serauth/authservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-authlogin',
  templateUrl: './authlogin.component.html',
  styleUrl: './authlogin.component.css'
})
export class AuthloginComponent implements OnInit{
  ngOnInit(): void {
    this.inicializarFormulario();
  }
  constructor(private formBuilder:FormBuilder, private authService:AuthserviceService, private router:Router){}
  //Formulario
  formularioLogin:FormGroup;
  
  inicializarFormulario(){
    this.formularioLogin = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  loginOn() {
    if(this.formularioLogin.valid){
      this.authService.authLogin(this.formularioLogin.value).subscribe({
        next:()=>{console.log('Ingreso ok')
      this.router.navigate(['/home'])},
        error:((datoError)=>{
          this.authService.handleError(datoError).subscribe( alert =>{
            Swal.fire({ // Muestra el mensaje de error utilizando Swal.fire
              icon: 'error',
              title: 'Error de autenticación',
              text: alert
            });
          });
          
        })
      })
    }else{
      alert('Error en el formulario')
    }
    }
}
