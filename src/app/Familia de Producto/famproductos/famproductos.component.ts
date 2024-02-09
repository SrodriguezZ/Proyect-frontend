import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamProductoService } from '../../services/servifamProduct/fam-producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-famproductos',
  templateUrl: './famproductos.component.html',
  styleUrl: './famproductos.component.css',
})
export class FamproductosComponent implements OnInit {

  fam_producto: FormGroup;
  fecha: Date = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private serviceFamProd: FamProductoService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.iniciarForm();
  }
  iniciarForm() {
    this.fam_producto = this.formBuilder.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaCreacion: [
        this.fecha.toISOString().slice(0, 10),
        Validators.required,
      ],
      activo: [true],
    });
  }

  postProducto() {
    if (this.fam_producto.valid) {
      this.serviceFamProd.postFamProducto(this.fam_producto.value).subscribe({
        next: () => {console.log('Envió Ok'),
      this.router.navigate(['/home'])},
        error:((errorDato)=>{console.log(errorDato)})
      });
    }else{
      const cd = this.fam_producto.get('codigo')
      const nb = this.fam_producto.get('nombre')
      let error = '';
      if(cd?.invalid){
        error += 'Por favor, ingresa un código válido.<br>'
      }
      if(nb?.invalid){
        error += 'Por favor, ingresa un nombre válido.<br>'
      }

      Swal.fire({
        icon: 'error',
        title: 'X',
        html: error,
        confirmButtonColor:'#007bff'
      });
    }
  }

  clear() {
    this.iniciarForm();
    }
}
