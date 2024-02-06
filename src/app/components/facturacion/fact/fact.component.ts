import { Component, OnInit } from '@angular/core';
import { QueryftProService } from '../../../services/queryft_pro/queryft-pro.service';
import { QueryProductFamily } from '../../../Interface/QueryProductFamily';
import { ProductService } from '../../../services/productos/product.service';
import { Product } from '../../../Interface/Product';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent implements OnInit{
constructor(private serviceQueryProd_Fam:QueryftProService, private productService:ProductService){
  this.products =[];
}

  ngOnInit(): void {
    
  }


centinela: boolean = false;
inputSearch:string;
prod_fami_query: QueryProductFamily[];
idVentProduct:number;
products : Product[];
activar(){
  this.centinela = true;
  this.serviceQueryProd_Fam.getallProductFamily(this.inputSearch).subscribe({
    next:((queryProduct)=>{
      this.prod_fami_query = queryProduct;
      console.log(this.prod_fami_query)
    }),error:((errorProduct)=>{console.log(errorProduct)})
  })
}
cerrarCentinela(){
  this.centinela = false;
}

ventProductos(id:number){
  this.idVentProduct=id
  console.log('Id product: ' + this.idVentProduct)
  this.productService.getIdProduct(id).subscribe({
    next:((getProduct)=>{
      this.products.push(getProduct),
      this.centinela=false;
      console.log('Productos=>',this.products)
    }),error:((error)=>{console.log(error), console.log(this.products)})
  })
}

}
