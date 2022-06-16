export class ServiciosModel {
    public _id: any = '';
    public nombre: String = '';
    public descripcion: String = '';
    public tiempoEstimado: Number = 0;
    public precio: Number = 0;
    public imagen: any;
           
  }
  
  export class Servicio {
    constructor(
      public _id: any,
      public nombre: string,
      public descripcion: string,
      public tiempoEstimado: number,
      public precio: number,
      public imagen: any
    
    ) {}
  }
  