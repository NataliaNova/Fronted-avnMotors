import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/usuario-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //Var.Aux
  public user: any;
  public token: any;
  public identity: any;
  public nombre: any;
  public rol: any;

  public mensajeOk: any;
  public mensajeError: any;

  formValue!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.camposLogin();
  }

  camposLogin() {
    this.formValue = this.formBuilder.group({
      email: [''],
      contrasena: [''],
    });
  }

  login() {
    if (this.formValue.value.email == '') {
      // this.mensajeError('Debe diligenciar su correo');
      alert('Debe diligenciar su correo');
    } else if (this.formValue.value.contrasena == '') {
      alert('Debe diligenciar su contraseña');
      //this.mensajeError = 'Debe diligenciar su correo';
    } else {
      this.usuarioService.login(this.formValue.value).subscribe(
        (response) => {
          console.log(response);

          if (response.mensaje == 'El correo electrónico no es correcto') {
            // this.mensajeError('El correo no existe');
            alert('El correo no existe');
          } else if (response.mensaje == 'La contraseña no es correcta') {
            // this.mensajeError('La contraseña es incorrecta');
            alert('La contraseña es incorrecta');
          } else {
            Swal.fire('Inicio de sessión exitoso!');

            // Variables de BD
            this.token = response.token;
            this.nombre = response.nombres;
            this.identity = response.id;
            this.rol = response.rol;

            // Local Storage
            localStorage.setItem('token', this.token);
            localStorage.setItem('nombres', this.nombre);
            localStorage.setItem('id', this.identity);
            localStorage.setItem('rol', this.rol);

            this.usuarioService.login(this.formValue.value).subscribe(
              (response) => {
                console.log(response);

                this.router.navigate(['']);
              },
              (error) => {
                console.log(error);
                alert(error);
              }
            );
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
    }
  }
  cerrarAlerta() {
    this.mensajeError = '';
  }
}
