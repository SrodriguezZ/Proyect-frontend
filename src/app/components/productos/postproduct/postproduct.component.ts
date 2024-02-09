import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamProducto } from '../../../Interface/FamProducto';
import { FamProductoService } from '../../../services/servifamProduct/fam-producto.service';
import { ProductService } from '../../../services/productos/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postproduct',
  templateUrl: './postproduct.component.html',
  styleUrl: './postproduct.component.css'
})
export class PostproductComponent implements OnInit{

  constructor(private _formBuilder:FormBuilder, private _productFamily:FamProductoService, private _postproduct:ProductService, private _router:Router){}
  formProducto:FormGroup;
  ProductFamily:FamProducto[];
  fecha:Date = new Date();
  ngOnInit(): void {
   this.iniFormProducto()
   this._productFamily.getAllProduct().subscribe({
    next:((productFamily)=>{
      this.ProductFamily = productFamily,
      console.log(this.ProductFamily)
    }),error:()=>{console.log('Error Service getAll ProductService')}
   })
  }
  iniFormProducto(){
    this.formProducto = this._formBuilder.group({
      codigo :['',[Validators.pattern('^[a-zA-Z0-9]{1,15}$'),Validators.required]],
      nombre:['',[Validators.pattern('^[a-zA-Z]+$'),Validators.required]],
      precio:['',[Validators.pattern('^[0-9]+$'),Validators.required]],
      stock:['',[Validators.pattern('^[0-9]+$'),Validators.required]],
      fechaCreacion:[this.fecha.toISOString().slice(0,10)],
      activo:[true],
      idFamilia:['',Validators.required]
    })
  }

  get familyProducto(){
    return this.formProducto.get('fechaCreacion')
  }

  btnGuardar(){
   if(this.formProducto.valid){
    const getid_product_family = this.formProducto.get('idFamilia')
    this._postproduct.postProduct(this.formProducto.value).subscribe({
      next:(()=>{
        console.log('Envió ok'),
        this._router.navigate(['/home'])
      }),
      error:((errorDato)=>{console.log(errorDato)})
    })

    console.log(this.formProducto.value)
    console.log('Selector:' + getid_product_family?.value)
   
  }else{
   const cod  = this.formProducto.get('codigo')
   const nom = this.formProducto.get('codigo')
   const pre = this.formProducto.get('precio')
   const st = this.formProducto.get('stock')
   const idFm = this.formProducto.get('idFamilia')

   let error = '';

   if (cod?.invalid) {
     error += 'Por favor, ingresa un código válido 15 caracteres.<br>';
   }
 
   if (nom?.invalid) {
     error += 'Por favor, ingresa un nombre válido.<br>';
   }
 
   if (pre?.invalid) {
     error += 'Por favor, ingresa un precio válido.<br>';
   }
 
   if (st?.invalid) {
     error += 'Por favor, ingresa un stock válido.<br>';
   }
 
   if (idFm?.invalid) {
     error += 'Por favor, selecciona una familia válida.<br>';
   }
 
   Swal.fire({
     icon: 'error',
     title: 'X',
     html: error,
   });

   }

   
  
   
  }
  btnClear() {
    this.iniFormProducto()
    }

  
}
