import { Component, OnInit } from '@angular/core';
import { ServiciosModel } from 'src/app/Models/servicios-model';
import { ServicioService } from 'src/app/Servicios/servicio-servicio';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-inicio',
  templateUrl: './servicio-inicio.component.html',
  styleUrls: ['./servicio-inicio.component.css']
})
export class ServicioInicioComponent implements OnInit {
//Var.Aux

public rol: any;
public token: any;
public dataServicios!: any;
public filtro: any;
public filtroText: any;
public base_url = environment.url;


servicioModel:ServiciosModel= new ServiciosModel();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private servicioService: ServicioService,
    private formBuilder: FormBuilder
  ) {
    this.rol = this.usuarioService.obtenerRol();
    this.token = this.usuarioService.obtenerToken();
   }

  ngOnInit(): void {
    this.listar();
    
  }

  listar() {
    this.servicioService.obtenerServicios().subscribe((res) => {
      this.dataServicios = res;
      console.log(this.dataServicios);
    });
  }
 

  eliminarServicio(row: any) {
    this.servicioService.deleteServicio(row._id).subscribe((res) => {
      Swal.fire('Servicio eliminado!' + 'error');
      this.listar();
    });
  }


}
