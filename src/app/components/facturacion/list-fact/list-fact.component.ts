import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/invoiceheader/head.service';
import { InvoiceHeader } from '../../../Interface/InvoiceHeader';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fact',
  templateUrl: './list-fact.component.html',
  styleUrl: './list-fact.component.css',
})
export class ListFactComponent implements OnInit {
  constructor(private _invoiceHeaderService: HeadService) {}
  ngOnInit(): void {
    this.startInvoiceHeader();
  }
  invoiceHeader: InvoiceHeader[] = [];
  startInvoiceHeader() {
    this._invoiceHeaderService.getAllInvoiceHeader().subscribe({
      next: (getAllInvoiceHeader) => {
        this.invoiceHeader = getAllInvoiceHeader;
      },
      error: (error) => {
        console.log('Error lista Factura => ' + error);
      },
    });
  }

  deleteIdHeaderAndDetail(id: number) {

    if(id !== 0){
      Swal.fire({
        title: 'Estas Seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#d33",
        cancelButtonText: 'Cancelar',
        confirmButtonText: '¡Si, Bórralo.!',
      }).then((result) => {
        if (result.isConfirmed) {
          this._invoiceHeaderService.deleteIdHeaderAndDetail(id).subscribe({
            next: () => {
              this.ngOnInit()
              Swal.fire({
                title: '¡Eliminado!',
                text: 'Factura ha sido eliminado con éxito.',
                icon: 'success',
                confirmButtonColor: '#007bff',
                cancelButtonText: 'OK'
              });
              console.log('Delete Ok  con el Id => ' + id);
            },error:(error)=>{
              console.log('Error Delete = > ' + error)
            }
          });
          
        }
      });
      
    }
    
  }
}
