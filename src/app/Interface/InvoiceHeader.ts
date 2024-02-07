export interface InvoiceHeader {
    numeroFactura:number,
    ruc:string,
    razonSocial:string,
    subtotal:number,
    procentajeIgv:number,
    igv:number,
    total:number,
    fechaCreacion: Date;
}