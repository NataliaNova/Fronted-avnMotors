export class ProductosModel {
  public _id: any = '';
  public nombre: String = '';
  public marca: String = '';
  public descripcion: String = '';
  public imagen: any;
  public precio_compra: Number = 0;
  public precio_venta: Number = 0;
  public cantidad: Number = 0;
}

export class Producto {
  constructor(
    public _id: any,
    public nombre: string,
    public marca: string,
    public descripcion: string,
    public imagen: any,
    public precio_compra: number,
    public precio_venta: number,
    public cantidad: number
  ) {}
}
