export interface InvoiceDetail {
    "idFactura":number,
    "idProducto":number,
    "codigoProducto":string;
    "nombreProducto":string;
    "precio":number;
    "cantidad":number;
    "subtotal":number;
    "fechaCreacion":Date;
}