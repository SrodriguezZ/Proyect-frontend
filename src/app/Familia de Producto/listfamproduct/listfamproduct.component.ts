import { Component, OnInit } from '@angular/core';
import { FamProductoService } from '../../services/servifamProduct/fam-producto.service';
import { FamProducto } from '../../Class/FamProducto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listfamproduct',
  templateUrl: './listfamproduct.component.html',
  styleUrl: './listfamproduct.component.css'
})
export class ListfamproductComponent implements OnInit{

  constructor(private servForm_Product: FamProductoService, private formBuilder:FormBuilder){}
  fam_Product:FamProducto[];
  board:boolean=true;
  editProduc:boolean = false;
  formEditar:FormGroup;
  idEditarForm:number;
  ngOnInit(): void {
    this.formEditID()
    this.servForm_Product.getAllProduct().subscribe({
      next:((datoProduct)=>{
        this.fam_Product = datoProduct; 
      }),
      error:((erroDato)=>{console.log(erroDato)})
    });
  }

  //formInicar formulario
  formEditID(){
    this.formEditar =this.formBuilder.group({
      codigo: [''],
      nombre: [''],
      fechaCreacion: [''],
      activo: [],
    })
  }


  editProduct(id: number) {
    this.board = false;
    this.editProduc= true;
    console.log('Id mandado: ' + id)
    this.idEditarForm = id;
    this.servForm_Product.getIdProduct(id).subscribe({
      next:((userDato)=>{
        this.formEditar.patchValue(userDato)
      }),
      error:((errorIdDato)=>{console.log(errorIdDato)})
    })
  }
  
  btnGuardar(){
    this.board = true;
    this.editProduc= false;
    this.servForm_Product.updateProduct(this.idEditarForm,this.formEditar.value).subscribe({
      next:(()=>{
        console.log('Actualizado ok')
        this.ngOnInit();
        
      })
    })

  }

  //Delete
  btnDelete(id:number){
    this.servForm_Product.deleteProduct(id).subscribe({
      next:(()=>{
        console.log('Delete OK'),
        this.ngOnInit()
      }),error:((errorDato)=>{console.log(errorDato)})
    })
  }

}
