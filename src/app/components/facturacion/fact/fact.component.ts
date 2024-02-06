import { Component, OnInit } from '@angular/core';
import { QueryftProService } from '../../../services/queryft_pro/queryft-pro.service';
import { QueryProductFamily } from '../../../Interface/QueryProductFamily';
import { ProductService } from '../../../services/productos/product.service';
import { Product } from '../../../Interface/Product';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css',
})
export class FactComponent implements OnInit {
  
  constructor(
    private serviceQueryProd_Fam: QueryftProService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}
  //Variable
  centinela: boolean = false;
  inputSearch: string;
  idVentProduct: number;
  //Fin variable
  //[]
  prod_fami_query: QueryProductFamily[];
  products: Product[] = [];
  cantidad: number[] = [];
  subtotal: number[] = [];
  // fin []
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
 
  actualizarSubtotal(): void {
    this.subtotal = this.cantidad.map(
      (cantidad, index) => cantidad * this.products[index].precio
    );
  }

  calcularTotal(): number {
    return this.subtotal.reduce((total, subtotal) => total + subtotal, 0);
  }
}
