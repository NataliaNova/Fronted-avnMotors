import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private _htpp: HttpClient) {}

  obtenerServicios() {
    return this._htpp.get<any>(base_url + 'servicios/listarServicios/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  
  agregar(data: any) {
    return this._htpp.post<any>(base_url + 'servicios/crearServicio', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  insert_servicio(data: any) {
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('descripcion', data.descripcion);
    fd.append('tiempoEstimado', data.tiempoEstimado);
    fd.append('precio', data.precio);
    fd.append('imagen', data.imagen);
    
        return this._htpp.post(base_url + 'servicios/crearServicio', fd);
  }

  
  actualizarServicio(data: any, id: number) {
    return this._htpp
      .put<any>(base_url + 'servicios/actualizarServicios/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteServicio(_id: string) {
    return this._htpp.delete(base_url + 'servicio/eliminarServicio/' + _id);
  }
}
