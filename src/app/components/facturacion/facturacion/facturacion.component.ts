import { Component, OnInit } from '@angular/core';
import { QueryftProService } from '../../../services/queryft_pro/queryft-pro.service';
import {QueryProductFamily} from '../../../Interface/QueryProductFamily'
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/productos/product.service';
import { Product } from '../../../Interface/Product';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  template:'button ()',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent implements OnInit{


  //private queryFam_Produc = inject(QueryftProService)
  constructor(private serviceQueryProd_Fam:QueryftProService, private formBuider:FormBuilder, private productService:ProductService){}
  //Atributo
  mostrarTabla_:boolean = false;
  prod_fami_query: QueryProductFamily[];
  inputBuscar: string ;
  idItemProduct : number;
  products : Product;
  //Fin Atributo
  ngOnInit(): void {
    this.productService.getIdProduct(this.idItemProduct).subscribe({
      next:((productos)=>{
        this.products = productos;  
      }),error:((errorProduct)=>{console.log(errorProduct)})
    })
    
  }

  agregarItem(id:number){
    this.idItemProduct = id;
    console.log(`Dentro de agregar Item ${this.idItemProduct}`)
    this.ngOnInit()
    console.log('Product object: ' + this.products.nombre)
    console.log('Parse Object ' + JSON.stringify(this.products))
  }

  
  mostraModal() {
    this.mostrarTabla_=true;
    //console.log('clic')
    //console.log(this.inputBuscar)
    
    this.serviceQueryProd_Fam.getallProductFamily(this.inputBuscar).subscribe({
      next:((datosQuery)=>{
        this.prod_fami_query= datosQuery;
      }),error:((error)=>{console.log(error)}),
      complete:(()=>{
        console.log(this.prod_fami_query)
        console.log(this.inputBuscar)
      })
    })
    

    
    }
    cerrarModal() {
      this.mostrarTabla_ = false;
      
    }

}
