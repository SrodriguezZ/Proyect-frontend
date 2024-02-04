import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamProducto } from '../../../Class/FamProducto';
import { FamProductoService } from '../../../services/servifamProduct/fam-producto.service';

@Component({
  selector: 'app-postproduct',
  templateUrl: './postproduct.component.html',
  styleUrl: './postproduct.component.css'
})
export class PostproductComponent implements OnInit{
  constructor(private _formBuilder:FormBuilder, private _productFamily:FamProductoService){}
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
      familia_productos:['',Validators.required]
    })
  }

  get familyProducto(){
    return this.formProducto.get('fechaCreacion')
  }

  btnGuardar(){
   if(this.formProducto.valid){
    const getfamily = this.formProducto.get('familia_productos')
    console.log(this.formProducto.value)
    console.log('Selector:' + getfamily?.value)
   }else{
    console.log('No se cumplio el formato')
    Object.keys(this.formProducto.controls).forEach((controlName) => {
      const control = this.formProducto.get(controlName);
      if (control?.invalid) {
        console.log(`Campo ${controlName} tiene errores:`);
      }
    });
   }
  
   
  }
  onSelectorChange() {
    this.btnGuardar();
  }
  
}
