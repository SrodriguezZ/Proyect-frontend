export interface Product {
    idProducto:    number;
    codigo:        string;
    nombre:        string;
    idFamilia:     number;
    precio:        number;
    stock:         number;
    activo:        boolean;
    fechaCreacion: Date;
}