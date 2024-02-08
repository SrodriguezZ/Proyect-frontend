import { Component, OnInit } from '@angular/core';
import { QueryftProService } from '../../../services/queryft_pro/queryft-pro.service';
import { QueryProductFamily } from '../../../Interface/QueryProductFamily';
import { ProductService } from '../../../services/productos/product.service';
import { Product } from '../../../Interface/Product';
import { FactservService } from '../../../services/factura/factserv.service';
import { InvoiceNumberSequence } from '../../../Interface/InvoiceNumberSequence';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css',
})
export class FactComponent implements OnInit {

  
  constructor(
    private serviceQueryProd_Fam: QueryftProService,
    private productService: ProductService,
    private factservice:FactservService,
    private formBuilder:FormBuilder
  ) {}

  ngOnInit(): void {
    this.factservice.getInvoiceNumberSequence().subscribe({
      next:((numberFact)=>{
        this.numberFactura = numberFact,
      console.log('Sequence Number Fact = '+this.numberFactura.idSecuenciaNumeroFactura)}),
      error:((errorNumber) =>{console.log('Erro number: ' , errorNumber)})
    })
    
  }
  //Variable
  centinela: boolean = false;
  inputSearch: string;
  idVentProduct: number;
  calIgv:number;
  sub_Total_:number = 0;
  totalConIGV: number = 0;
  total : number = 0;
  ruc:string = '';
  razonSocial:string = '';
  idFactura:number;
  fecha:any = new Date().toISOString().slice(0,10);
  invoiceHeader:FormGroup;
  numberFactura:InvoiceNumberSequence = {idSecuenciaNumeroFactura:0};
  //Fin variable
  //[]
  prod_fami_query: QueryProductFamily[];
  products: Product[] = [];
  cantidad: number[] = [];
  subtotal: number[] = [];
  // fin []
  //Formulario

  homeFormul(){
    this.invoiceHeader = this.formBuilder.group({
      numeroFactura:[this.numberFactura.idSecuenciaNumeroFactura],
      ruc:[this.ruc],
      razonSocial:[this.razonSocial],
      subtotal:[this.sub_Total_],
      porcentajeIgv:[0.18],
      igv:[this.totalConIGV],
      total:[this.total],
      fechaCreacion:[this.fecha]
    })
  }

  facturarPost(){
    console.log(this.invoiceHeader.value)
   this.factservice.postInvoiceHeader(this.invoiceHeader.value).subscribe({
      next:((headerFactura)=>{
        console.log('Factura Ok'),
      this.idFactura = headerFactura.idFactura,
    console.log("Recuperando el IDFACTURA:  " + this.idFactura)}),
      error:((errorDato)=>{console.log(errorDato)})
    })
  }
  
  
  //activar ventana producto
  //Vent Product
  openVent() {
    this.centinela = true;
    this.serviceQueryProd_Fam.getallProductFamily(this.inputSearch).subscribe({
      next: (queryProduct) => {
        this.prod_fami_query = queryProduct;
        console.log(this.prod_fami_query);
      },
      error: (errorProduct) => {
        console.log(errorProduct);
      },
    });
  }
  closeVent() {
    this.centinela = false;
  }
//Fin Product


  ventProductos(id: number) {
    this.idVentProduct = id;
    console.log('Id product: ' + this.idVentProduct);
    this.productService.getIdProduct(id).subscribe({
      next: (getProduct) => {
        this.products.push(getProduct), (this.centinela = false);
        console.log('Productos=>', this.products);
        //Validacion de datos 
       
        if(!this.cantidad.length && !this.subtotal.length){
          this.cantidad = new Array(this.products.length).fill(0);
          this.subtotal = new Array(this.products.length).fill(0);
          this.cantidad[0] = 1
        }else{
          this.cantidad.push(1)
          this.subtotal.push(0)
        }
      
      },
      error: (error) => {
        console.log(error), console.log(this.products);
      },
    });
  }

  //Math Prec*Cant
  //Event de Actualizar - Para los campos de Tb
  actualizarSubtotal(): void {
    this.subtotal = this.cantidad.map(
      (cantidad, index) => cantidad * this.products[index].precio
    );
    this.sub_Total_ = this.calcularTotal()
    this.totalConIGV = this.calcularTotal() * 0.18;
    this.total = this.sub_Total_ + this.totalConIGV
    this.homeFormul()
  }

  calcularTotal() {
    return this.subtotal.reduce((total, subtotal) => total + subtotal, 0);
    
  }
  //Eliminar Product - ArrayCant - ArraySub
  deleteProduct(index: number) {
    this.products.splice(index,1);
    this.cantidad.splice(index,1);
    this.subtotal.splice(index,1);
    console.log('Suma Total: ',this.calcularTotal())

    }

  //igv
}
