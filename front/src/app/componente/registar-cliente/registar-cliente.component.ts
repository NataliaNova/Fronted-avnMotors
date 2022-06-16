import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/Servicios/cliente-servicio';
import { Cliente } from 'src/app/Models/cliente-model';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registar-cliente',
  templateUrl: './registar-cliente.component.html',
  styleUrls: ['./registar-cliente.component.css'],
})
export class RegistarClienteComponent implements OnInit {
  //Var.Aux
  correo!: any;
  public id: any;
  public rol = ['Cliente'];

  formValue!: FormGroup;

  clienteModel: Cliente = new Cliente();

  public mensajeOk: any;
  public mensajeError: any;

  constructor(
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }
  obtenerDatos() {
    this.formValue = this.formBuilder.group({
      nombres: [''],
      apellidos: [''],
      documento: [''],
      telefono: [''],
      email: [''],
      contrasena: [''],
      rol: [''],
      placas: [''],
    });
  }
  crearCliente() {
    this.clienteModel.nombres = this.formValue.value.nombres;
    this.clienteModel.apellidos = this.formValue.value.apellidos;
    this.clienteModel.documento = this.formValue.value.documento;
    this.clienteModel.telefono = this.formValue.value.telefono;
    this.clienteModel.email = this.formValue.value.email;
    this.clienteModel.contrasena = this.formValue.value.contrasena;
    this.clienteModel.rol = this.formValue.value.rol;
    this.clienteModel.placas = this.formValue.value.placas;

    if (this.clienteModel.nombres == '') {
      this.mensajeError = 'Debes completar el campo nombres';
    } else if (this.clienteModel.apellidos == '') {
      this.mensajeError = 'Debes completar el campo apellidos';
    } else if (this.clienteModel.documento == '') {
      this.mensajeError = 'Debes completar el campo documento';
    } else if (this.clienteModel.telefono == '') {
      this.mensajeError = 'Debes completar el campo teléfono ';
    } else if (this.clienteModel.email == '') {
      this.mensajeError = 'Debes completar el campo Email ';
    } else if (this.clienteModel.contrasena == '') {
      this.mensajeError = 'Debes completar el campo contraseña';
    } else if (this.clienteModel.placas == '') {
      this.mensajeError = 'Debes completar el campo placas';
    } else if (this.clienteModel.rol == '') {
      this.mensajeError = 'Debes seleccionar el campo cliente';
    } else {
      this.clienteService.crearcliente(this.clienteModel).subscribe(
        (res) => {
          console.log(res);

          if (res.mensaje == 'El cliente ya se encuentra creado') {
            this.mensajeError = 'El cliente ya se encuentra registrado';
          } else {
            this.mensajeOk = 'El usuario se registró correctamente';
            this.router.navigate(['login']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  cerrarAlerta() {
    this.mensajeError = '';
  }
}
