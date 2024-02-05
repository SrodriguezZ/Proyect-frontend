import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {QueryProductFamily} from '../../../Interface/QueryProductFamily'
@Component({
  selector: 'app-cuadroproductos',
  templateUrl: './cuadroproductos.component.html',
  styleUrl: './cuadroproductos.component.css'
})
export class CuadroproductosComponent implements OnInit{
  ngOnInit(): void {
    console.log(this.prod_fami_query);
  }
  @Input() prod_fami_query: QueryProductFamily[];
  @Output() cerrarModalEvent = new EventEmitter<void>();
  @Output() aggItem = new EventEmitter<number>();
  cerrarModal() {
    this.cerrarModalEvent.emit();
  }

  agregarItem(id:number){
    this.aggItem.emit(id);
  }
  
  
}
