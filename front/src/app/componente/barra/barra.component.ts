import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css'],
})
export class BarraComponent implements OnInit {
  public id: any;
  public token: any;
  public nombres: any;
  public rol: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {
    this.id = usuarioService.obtenerIdentidad();
    this.token = usuarioService.obtenerToken();
    this.nombres = usuarioService.obtenerNombre();
    this.rol = usuarioService.obtenerRol();
  }

  ngOnInit(): void {}

  inicioSesion() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombres');
    localStorage.removeItem('rol');

    this.id = null;
    this.nombres = null;
    this.nombres = null;
    this.rol = null;

    Swal.fire('Has cerrado sesión correctamente!');

    this.router.navigate(['']);
  }
}
