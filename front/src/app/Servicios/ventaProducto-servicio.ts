import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../Models/usuario-model';
const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ventaProductoServicio {
  constructor(private _htpp: HttpClient) {}

  /* obtenerProductosParametro(nombre: any) {
    return this._htpp
      .get<any>(base_url + 'producto/listarNombre/' + nombre)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  get_ventas(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._htpp.get(base_url + 'ventas', { headers: headers });
  }

  obtenerVentas() {
    return this._htpp.get<any>(base_url + 'venta/listar').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  obtenerVentasId(id: any) {
    return this._htpp.get<any>(base_url + 'venta/listarId/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  } */

  registrarVenta(data: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._htpp
      .post<any>(base_url + 'ventaProducto/crearVentaProducto', data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  save_data(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._htpp.post(
      base_url + 'ventaProducto/crearVentaProducto',
      data,
      {
        headers: headers,
      }
    );
  }

  /* data_venta(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._htpp.get(base_url + 'venta/listarDetalles/' + id, {
      headers: headers,
    });
  }

  obtenerDetalleVentas(id: string) {
    return this._htpp.get<any>(base_url + 'venta/listarDetalles/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  } */
}
