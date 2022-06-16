import { Injectable } from '@angular/core';

// Importaciones
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioComponent } from 'src/app/componente/usuario/usuario.component';

const base_url = environment.url;

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public user: any;
  public token: any;
  public identity: any;
  public nombres: any;
  public id: any;

  constructor(private _http: HttpClient) {}

  crearcliente(data: any) {
    return this._http.post<any>(base_url + 'cliente/crearCliente', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  login(cliente: any, obtenerToken = null): Observable<any> {
    let json = cliente;
    if (obtenerToken != null) {
      cliente.token = true;
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(base_url + 'cliente/loginCliente', json, {
      headers: headers,
    });
  }
  obtenerCliente() {
    return this._http.get<any>(base_url + 'cliente/listarclientes').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  obtenerToken(): Observable<any> {
    let tokenAux = localStorage.getItem('token');
    if (tokenAux) {
      this.token = tokenAux;
    } else {
      this.token = null;
    }

    return this.token;
  }

  obtenerIdentidad(): Observable<any> {
    let identityAux = localStorage.getItem('id');
    if (identityAux) {
      this.identity = identityAux;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  obtenernombre(): Observable<any> {
    let nombresAux = localStorage.getItem('nombres');
    if (nombresAux) {
      this.nombres = nombresAux;
    } else {
      this.nombres = null;
    }

    return this.nombres;
  }
}
