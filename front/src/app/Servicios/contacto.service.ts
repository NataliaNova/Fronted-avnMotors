import { Injectable } from '@angular/core';

import { Observable,map } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contacto } from '../componente/model/contacto-model';

const baseUrl = environment.url

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http:HttpClient) {}

  // crear(data : any){
  //   return this.http.post<any>(baseUrl + 'agendamiento/crearAgendamiento', data)
  //   .pipe(map((res:any) => {
  //     return res;
  //   }))
  // }

}
