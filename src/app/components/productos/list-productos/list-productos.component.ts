import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/productos/product.service';
import { Product } from '../../../Interface/Product';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements OnInit{
  //private servicelist = inject(ProductService);
  constructor(private producService: ProductService){}
  products: Product[];
  ngOnInit(): void {
    this.producService.getAllProduct().subscribe({
      next:((getAll)=>{this.products = getAll, console.log('Lista: ok')}),
      error:()=>{console.log('Se ha producido un error')}
    })
  }

}
