import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Router } from '@angular/router';
import { Agendamiento } from '../model/agendamiento-model';
import { AgendamientoService } from 'src/app/Servicios/agendamiento.service';

@Component({
  selector: 'app-agendamiento',
  templateUrl: './agendamiento.component.html',
  styleUrls: ['./agendamiento.component.css'],
})
export class AgendamientoComponent implements OnInit {

  formValue !: FormGroup;

  // Aux Model
  public dataDetalle : Array<any> = [];
  public fechaCaptura : any;
  public nombresCaptura : any;
  public apellidosCaptura : any;
  public placaCaptura : any;
  public servicioCaptura =["Cambio de aceite", "Cambio de pastillas de freno", "Alineación"];
  public correoCaptura : any;
  public telefonoCaptura : any;
  public comentarioCaptura : any;
  public mensajeOk : any;
  public mensajeError : any;

  agendamientoModel : Agendamiento = new Agendamiento;

  constructor(
    private formBuilder : FormBuilder, 
    private agendamientoService: AgendamientoService, 
    private router: Router )
    {

    }

  ngOnInit(): void {
    this.obtenerCamposFormulario();
    this.listarAgendamientos();
  }


  obtenerCamposFormulario(){
    this.formValue = this.formBuilder.group({
      fechaCaptura : [''], 
      nombresCaptura : [''],
      apellidosCaptura : [''],
      placaCaptura : [''],
      servicioCaptura : [''],
      correoCaptura : [''],
      telefonoCaptura : [''],
      comentarioCaptura : [''],
      
    })
  }

  crearAgendamiento(){

    this.agendamientoModel.fechaSolicitud = this.formValue.value.fechaCaptura;
    this.agendamientoModel.nombres = this.formValue.value.nombresCaptura;
    this.agendamientoModel.apellidos = this.formValue.value.apellidosCaptura;
    this.agendamientoModel.placa = this.formValue.value.placaCaptura;
    this.agendamientoModel.servicio = this.formValue.value.servicioCaptura;
    this.agendamientoModel.correo = this.formValue.value.correoCaptura;
    this.agendamientoModel.telefono = this.formValue.value.telefonoCaptura;
    this.agendamientoModel.comentarios = this.formValue.value.comentarioCaptura;


    if(this.agendamientoModel.fechaSolicitud == ""){
      // this.mensajeError = "El campo de fechaSolicitud no puede estar vacio";
      Swal.fire(
        'El campo de fechaSolicitud no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.nombres == ""){
      // this.mensajeError = "El campo de nombre no puede estar vacio";
      Swal.fire(
        'El campo de nombres no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.apellidos == ""){
      // this.mensajeError = "El campo de apellidos no puede estar vacio";
      Swal.fire(
        'El campo de apellidos no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.placa == ""){
      // this.mensajeError = "El campo de placa no puede estar vacio";
      Swal.fire(
        'El campo de placa no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.servicio == ""){
      // this.mensajeError = "El campo de servicios no puede estar vacio";
      Swal.fire(
        'El campo de servicio no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.correo == ""){
      // this.mensajeError = "El campo de correo no puede estar vacio";
      Swal.fire(
        'El campo de correo no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.telefono == ""){
      // this.mensajeError = "El campo de telefono no puede estar vacio";
      Swal.fire(
        'El campo de comentarios no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else if(this.agendamientoModel.comentarios == ""){
      // this.mensajeError = "El campo de comentarios no puede estar vacio";
      Swal.fire(
        'El campo de comentarios no puede estar vacio',
        'Por favor llena todos los campos',
        'error'
      )
    }

    else{
      this.agendamientoService.crear(this.agendamientoModel)
      .subscribe(res => {
        console.log(res);
          if(res.mensaje == "La fecha u hora no se encuentra disponible. Intenta en otra hora u otro día"){
            this.mensajeError = res.mensaje;
          }
          else{
            Swal.fire(
              'Agendamiento realizado!',
              'Te esperamos!',
              'success'
            )
            this.formValue = this.formBuilder.group({
              fechaCaptura : [''], 
              nombresCaptura : [''],
              apellidosCaptura : [''],
              placaCaptura : [''],
              servicioCaptura : [''],
              correoCaptura : [''],
              telefonoCaptura : [''],
              comentarioCaptura : [''],
              
            })
          }
      },
      err => {
        console.log(err)
      })
    }

  }

  listarAgendamientos(){
    this.agendamientoService.listar().subscribe(res => {
      this.dataDetalle = res
      console.log(this.dataDetalle)
    })
  }

  editar(item:any){
    this.agendamientoModel._id = item._id

    this.formValue.controls['fechaCaptura'].setValue(item.fechaCaptura)
    this.formValue.controls['nombresCaptura'].setValue(item.nombresCaptura)
    this.formValue.controls['apellidosCaptura'].setValue(item.apellidosCaptura)
    this.formValue.controls['placaCaptura'].setValue(item.placaCaptura)
    this.formValue.controls['servicioCaptura'].setValue(item.servicioCaptura)
    this.formValue.controls['correoCaptura'].setValue(item.correoCaptura)
    this.formValue.controls['telefonoCaptura'].setValue(item.telefonoCaptura)
    this.formValue.controls['comentarioCaptura'].setValue(item.comentarioCaptura)
    
  }

  actualizar(){
    this.agendamientoModel.fechaSolicitud = this.formValue.value.fechaCaptura;
    this.agendamientoModel.nombres = this.formValue.value.nombresCaptura;
    this.agendamientoModel.apellidos = this.formValue.value.apellidosCaptura;
    this.agendamientoModel.placa = this.formValue.value.placaCaptura;
    this.agendamientoModel.servicio = this.formValue.value.servicioCaptura;
    this.agendamientoModel.correo = this.formValue.value.correoCaptura;
    this.agendamientoModel.telefono = this.formValue.value.telefonoCaptura;
    this.agendamientoModel.comentarios = this.formValue.value.comentarioCaptura;

    this.agendamientoService.actualizar(this.agendamientoModel._id, this.agendamientoModel)
    .subscribe(res => {
      Swal.fire(
        'El agendamiento fue actualizado',
        'Gracias por preferirnos',
        'success'
      )
    })

  }

  eliminar(item:any){
    this.agendamientoService.eliminar(item)
    .subscribe(res => {
      Swal.fire(
        'El día agendado fue eliminado exitosamente',
        'Gracias por preferirnos',
        'info'
      )
    })
  }

}
