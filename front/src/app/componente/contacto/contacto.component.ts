import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent implements OnInit {
  formValue!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerCamposFormulario();
  }

  obtenerCamposFormulario() {
    this.formValue = this.formBuilder.group({
      nombresCapturaContacto: [''],
      apellidosCapturaContacto: [''],
      correoCapturaContacto: [''],
      telefonoCapturaContacto: [''],
      comentarioCapturaContacto: [''],
    });
  }

  enviar() {
    if (this.formValue.value.nombresCapturaContacto == '') {
      Swal.fire(
        'El campo nombres no puede estar vacio',
        'Gracias por preferirnos',
        'error'
      );
    } else if (this.formValue.value.apellidosCapturaContacto == '') {
      Swal.fire(
        'El campo apellidos no puede estar vacio',
        'Gracias por preferirnos',
        'error'
      );
    } else if (this.formValue.value.correoCapturaContacto == '') {
      Swal.fire(
        'El campo correo no puede estar vacio',
        'Gracias por preferirnos',
        'error'
      );
    } else if (this.formValue.value.telefonoCapturaContacto == '') {
      Swal.fire(
        'El campo teléfono no puede estar vacio',
        'Gracias por preferirnos',
        'error'
      );
    } else if (this.formValue.value.comentarioCapturaContacto == '') {
      Swal.fire(
        'El campo comentario no puede estar vacio',
        'Gracias por preferirnos',
        'error'
      );
    } else {
      Swal.fire(
        'Pronto nos prondrémos en contacto contigo',
        'Gracias por preferirnos',
        'success'
      );

      this.formValue = this.formBuilder.group({
        nombresCapturaContacto: [''],
        apellidosCapturaContacto: [''],
        correoCapturaContacto: [''],
        telefonoCapturaContacto: [''],
        comentarioCapturaContacto: [''],
      });
    }
  }
}
