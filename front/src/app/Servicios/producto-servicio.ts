import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private _htpp: HttpClient) {}

  obtenerProductos() {
    return this._htpp.get<any>(base_url + 'producto/listarProductos/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  obtenerProducto(id: number) {
    return this._htpp
      .get<any>(base_url + 'producto/listarProductos/' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  obtenerProductosParametro(nombre: any) {
    return this._htpp
      .get<any>(base_url + 'producto/listarNombre/' + nombre)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  agregar(data: any) {
    return this._htpp.post<any>(base_url + 'producto/crearProducto', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  insert_producto(data: any) {
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('marca', data.marca);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('cantidad', data.cantidad);

    return this._htpp.post(base_url + 'producto/crearProducto', fd);
  }

  actualizarProducto(_id: string, data: any) {
    return this._htpp
      .put<any>(base_url + 'producto/actualizarProducto/' + _id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteProducto(_id: string) {
    return this._htpp.delete(base_url + 'producto/eliminarProducto/' + _id);
  }

  eliminar() {}
}
