import { Component, OnInit, inject } from '@angular/core';
import { QueryftProService } from '../../../services/queryft_pro/queryft-pro.service';
import {QueryProductFamily} from '../../../Interface/QueryProductFamily'
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  template:'button ()',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent implements OnInit{

  mostrarTabla_:boolean = false;

  mostraModal() {
  this.mostrarTabla_=true;
  console.log('clic')
  
  }
  cerrarModal() {
    this.mostrarTabla_ = false;
    
  }
  //private queryFam_Produc = inject(QueryftProService)
  constructor(private serviceQueryProd_Fam:QueryftProService){}
  prod_fami_query: QueryProductFamily[];
  palabra: string = 'mouse';
  idItemProduct : number;
  ngOnInit(): void {
    this.serviceQueryProd_Fam.getallProductFamily(this.palabra).subscribe({
      next:((datosQuery)=>{
        this.prod_fami_query= datosQuery;
      }),error:((error)=>{console.log(error)}),
      complete:(()=>{
        console.log(this.prod_fami_query)
      })
    })
    
    
  }

  agregarItem(id:number){
    this.idItemProduct = id;
    console.log(`Dentro de agregar Item ${this.idItemProduct}`)
  }

}
