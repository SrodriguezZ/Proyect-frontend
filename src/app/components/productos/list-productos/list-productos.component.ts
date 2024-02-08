import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../../services/productos/product.service';
import { Product } from '../../../Interface/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamProducto } from '../../../Interface/FamProducto';
import { FamProductoService } from '../../../services/servifamProduct/fam-producto.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css',
})
export class ListProductosComponent implements OnInit {

  //private servicelist = inject(ProductService);
  constructor(
    private _producService: ProductService,
    private _productFamily: FamProductoService,
    private _formBuilder: FormBuilder
  ) {}
  ipUpdate: number;
  tabla: boolean = true;
  editar: boolean = false;
  formProducto: FormGroup;
  products: Product[];
  ProductFamily: FamProducto[];
  fecha: Date = new Date();
  ngOnInit(): void {
    this.iniFormProducto();
    this._producService.getAllProduct().subscribe({
      next: (getAll) => {
        (this.products = getAll), console.log('Lista: ok');
      },
      error: () => {
        console.log('Se ha producido un error');
      },
    });
    this._productFamily.getAllProduct().subscribe({
      next: (productFamily) => {
        (this.ProductFamily = productFamily), console.log(this.ProductFamily);
      },
      error: () => {
        console.log('Error Service getAll ProductService');
      },
    });
  }

  iniFormProducto() {
    this.formProducto = this._formBuilder.group({
      codigo: ['',[Validators.pattern('^[a-zA-Z0-9]{1,15}$'), Validators.required]],
      nombre: ['', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
      precio: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      stock: ['', [Validators.pattern('^[0-9]+$'), Validators.required]],
      fechaCreacion: [this.fecha.toISOString().slice(0, 10)],
      activo: [],
      idFamilia: ['', Validators.required],
    });
  }

  editarProducto(id: number) {
    this.ipUpdate = id;
    this.tabla = false;
    this.editar = true;
    this._producService.getIdProduct(id).subscribe({
      next: (product) => {
        this.formProducto.patchValue(product);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  btnGuardar() {
    if (this.formProducto.valid) {
      this.editar = false;
      this.tabla = true;
      console.log('Id Update: ' + this.ipUpdate);
      this._producService
        .updateProduct(this.ipUpdate, this.formProducto.value)
        .subscribe({
          next: () => {
            console.log('Update Ok'), this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      console.log('Formulario no valido');
    }
  }

  getBtn() {
    this.tabla = true;
    this.editar = false;
    this.ngOnInit();
  }

  //DeleleteId
  deleteId(id: number) {
    this._producService.deleteProductId(id).subscribe({
      next:(()=>{console.log('Id eliminado'), this.ngOnInit()}),
      error:((errorDato)=>{console.log(errorDato)})
    })
    }
}
