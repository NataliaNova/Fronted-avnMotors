import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicioService } from 'src/app/Servicios/servicio-servicio';
import { Servicio, ServiciosModel } from 'src/app/Models/servicios-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-servicio-crear',
  templateUrl: './servicio-crear.component.html',
  styleUrls: ['./servicio-crear.component.css']
})
export class ServicioCrearComponent implements OnInit {
    //Var.Aux
    formValue!: FormGroup;
  public servicioModel: any;

  error_message!: any;
  success_message!: any;

  public rol: any;
  public token: any;

    //variables imagenes

    public file!: File;
    public archivos: any[] | undefined;
    imagenUrl!: any;
    public imgSelect: String | ArrayBuffer | any;
 
  constructor(
    private usuarioService: UsuarioService,
    private servicioService: ServicioService,
    private router: Router,
    private formBuilder: FormBuilder

  ) {

    this.rol = this.usuarioService.obtenerRol();
    this.token = this.usuarioService.obtenerToken();
    this.servicioModel = new Servicio('','', '', 0 , 0, '');


   }

  ngOnInit(): void {
  }

  validar() {
    if (this.rol != 'Admin') {
      this.router.navigate(['no-autorizado']);
    } else {
      this.obtenerCampos();
      this.CrearServicio();
    }
  }
  obtenerCampos() {
    this.formValue = this.formBuilder.group({
      nombre: [''],
      descripcion: [''],
      tiempoEstimado: [0],
      precio: [0],
    });
    this.imagenUrl = '';
    this.imgSelect = '../../../../assets/img/Screenshot_1.png';
  }

//

CrearServicio() {
  this.servicioModel.nombre = this.formValue.value.nombre;
  this.servicioModel.descripcion = this.formValue.value.descripcion;
  this.servicioModel.tiempoEstimado = this.formValue.value.tiempoEstimado;
  this.servicioModel.precio = this.formValue.value.precio;
  this.servicioModel.imagen = this.file.name;
  

  if (this.servicioModel.nombre == '') {
    this.error_message = 'Debes completar el nombre';
  }  else if (this.servicioModel.descripcion == '') {
    this.error_message = 'Debes completar la descripción';
  } else {
    this.servicioService.agregar(this.servicioModel).subscribe(
      (res) => {
        console.log(res);
        if (res.mensaje == 'El servicio ya se encuentra creado') {
          this.error_message = res.mensaje;
        } else {
          this.success_message = 'Se ha creado el servicio exitosamente';
          this.formValue = this.formBuilder.group({
            nombre: [''],
            descripcion: [''],
            tiempoEstimado: [0],
            precio: [0]
            
          });
          this.imagenUrl = '';
          this.imgSelect = '../../../../assets/img/Screenshot_1.png';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

onSubmit(servicioForm: any) {
  if (servicioForm.valid) {
    if (this.file != this.imgSelect) {
      this.servicioService
        .insert_servicio({
          nombre: servicioForm.value.nombre,
          descripcion: servicioForm.value.descripcion,          
          tiempoEstimado: servicioForm.value.tiempoEstimado,
          precio: servicioForm.value.precio,
          imagen: this.file,
          
        })
        .subscribe(
          (response) => {
            this.success_message = 'Se registro el servicio correctamente';
            this.servicioModel = new Servicio('','', '', 0 , 0, '');
            this.imgSelect = '../../../../assets/img/Screenshot_1.png';
            this.imagenUrl = '';
            this.file = this.imgSelect;
          },
          (error) => {}
        );
    } else {
      this.error_message = 'Favor cargue una imagen';
    }
  } else {
    this.error_message = 'Complete correctamente el formulario';
  }
}

seleccionarImagen(event: any) {
  this.file = <File>event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => (this.imgSelect = reader.result);
  reader.readAsDataURL(this.file);
  console.log('soy el archivo ' + this.file.name);
}




}
