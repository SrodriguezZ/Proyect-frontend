import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../../services/serauth/authservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotExpr } from '@angular/compiler';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-authlogin',
  templateUrl: './authlogin.component.html',
  styleUrl: './authlogin.component.css',
})
export class AuthloginComponent implements OnInit {
clear() {
this.inicializarFormulario();
}
  ngOnInit(): void {
    this.inicializarFormulario();
    this.startRegister();
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthserviceService,
    private router: Router
  ) {}
  //Formulario

  login: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  register: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formularioLogin: FormGroup;
  formularioRegister: FormGroup;

  inicializarFormulario() {
    this.formularioLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  startRegister() {
    this.formularioRegister = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginOn() {
    if (this.formularioLogin.valid) {
      this.authService.authLogin(this.formularioLogin.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario registrado con éxito',
            showConfirmButton: false,
            timer: 1000,
          });
        },
        error: (error: HttpErrorResponse) => {
          let errorMessage: string;

          switch (error.status) {
            case 401:
              errorMessage =
                'Error de credenciales: Usuario o contraseña incorrecta.';
              break;
            case 403:
              errorMessage = 'Usuario bloqueado';
              break;
            default:
              errorMessage = 'Error desde el backend';
              break;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: errorMessage,
            confirmButtonColor:"#007bff"
          });
        },
      });
    } else {
      const user = this.formularioLogin.get('username');
      const pass = this.formularioLogin.get('password');
      if (user?.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, ingresa un nombre de usuario válido.',
          confirmButtonColor:"#007bff"
        });
      } else if (pass?.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, ingresa una contraseña válida.',
          confirmButtonColor:"#007bff"
        });
      }
    }
  }

  btnRegister() {
    this.login.next(false);
    this.register.next(true);
  }

  btnPost() {
    if (this.formularioRegister.valid) {
      this.authService.postRegistUser(this.formularioRegister.value).subscribe({
        next: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario registrado con éxito',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.login.next(true);
            this.register.next(false);
          });
        },
        error: (error) => {
          console.log('Error Register => ' + error);
          Swal.fire({
            icon: 'error',
            title: 'X',
            text: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.',
          });
        },
      });
    } else {
      const user = this.formularioRegister.get('username1');
      const passw = this.formularioRegister.get('password1');
      if (user?.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, ingresa un nombre de usuario válido.',
          confirmButtonColor:"#007bff"
        });
      } else if (passw?.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, ingresa una contraseña válida.',
          confirmButtonColor:"#007bff"
        });
      }
    }
  }
}
