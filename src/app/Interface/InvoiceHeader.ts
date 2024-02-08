export interface InvoiceHeader {
    idFactura:number;
    numeroFactura:number,
    ruc:string,
    razonSocial:string,
    subtotal:number,
    procentajeIgv:number,
    igv:number,
    total:number,
    fechaCreacion: Date;
}