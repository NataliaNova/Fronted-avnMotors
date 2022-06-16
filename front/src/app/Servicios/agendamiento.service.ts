import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Agendamiento } from '../componente/model/agendamiento-model';

const baseUrl = environment.url

@Injectable({
  providedIn: 'root'
})
export class AgendamientoService {

  constructor(private http:HttpClient) { }


  crear(data : any){
    return this.http.post<any>(baseUrl + 'agendamiento/crearAgendamiento', data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  listar(){
    return this.http.get<any>(baseUrl + 'agendamiento/listarAgendamiento')
    .pipe(map((res:any) => {
      return res;
    }))
  }

  actualizar(id:any, data:any){
    return this.http.put<any>(baseUrl + 'agendamiento/actualizarAgendamiento/' + id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  eliminar(id:any){
    return this.http.delete<any>(baseUrl + 'agendamiento/eliminarAgendamiento/' + id)
  }




}
