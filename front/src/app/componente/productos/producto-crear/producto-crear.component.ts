import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/Servicios/producto-servicio';
import { Producto, ProductosModel } from 'src/app/Models/productos-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css'],
})
export class ProductoCrearComponent implements OnInit {
  //Var.Aux
  formValue!: FormGroup;

  // productoModel: ProductosModel = new ProductosModel();
  public productoModel: any;

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
    private productoService: ProductoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.rol = this.usuarioService.obtenerRol();
    this.token = this.usuarioService.obtenerToken();
    this.productoModel = new Producto('', '', '', '', '', 0, 0, 0);
  }

  ngOnInit(): void {
    //this.validar();
  }

  validar() {
    if (this.rol !== 'Admin') {
      this.router.navigate(['noAutorizado']);
    } else {
      this.obtenerCampos();
      this.CrearProducto();
    }
  }

  obtenerCampos() {
    this.formValue = this.formBuilder.group({
      nombre: [''],
      marca: [''],
      descripcion: [''],
      precio_compra: [''],
      precio_venta: [''],
      cantidad: [''],
    });
    this.imagenUrl = '';
    this.imgSelect = '../../../../assets/img/Screenshot_1.png';
  }

  CrearProducto() {
    this.productoModel.nombre = this.formValue.value.nombre;
    this.productoModel.marca = this.formValue.value.marca;
    this.productoModel.descripcion = this.formValue.value.descripcion;
    this.productoModel.precio_compra = this.formValue.value.precio_compra;
    this.productoModel.precio_venta = this.formValue.value.precio_venta;
    this.productoModel.cantidad = this.formValue.value.cantidad;
    this.productoModel.imagen = '';
    //  this.productoModel.imagen = this.imagenUrl;

    if (this.productoModel.nombre == '') {
      this.error_message = 'Debes completar el nombre';
    } else if (this.productoModel.marca == '') {
      this.error_message = 'Debes completar la marca';
    } else if (this.productoModel.descripcion == '') {
      this.error_message = 'Debes completar la descripción';
    } else {
      this.productoService.agregar(this.productoModel).subscribe(
        (res) => {
          console.log(res);
          if (res.mensaje == 'El prodcuto ya se encuentra creado') {
            this.error_message = res.mensaje;
          } else {
            this.success_message = 'Se ha creado el producto exitosamente';
            this.formValue = this.formBuilder.group({
              nombre: [''],
              marca: [''],
              descripcion: [''],
              precio_compra: [''],
              precio_venta: [''],
              cantidad: [''],
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

  onSubmit(productoForm: any) {
    if (productoForm.valid) {
      if (this.file != this.imgSelect) {
        this.productoService
          .insert_producto({
            nombre: productoForm.value.nombre,
            marca: productoForm.value.marca,
            descripcion: productoForm.value.descripcion,
            imagen: this.file,
            precio_compra: productoForm.value.precio_compra,
            precio_venta: productoForm.value.precio_venta,
            cantidad: productoForm.value.cantidad,
          })
          .subscribe(
            (response) => {
              this.success_message = 'Se registro el producto correctamente';
              this.productoModel = new Producto('', '', '', '', '', 0, 0, 0);
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

  // seleccionarImagen(event: HtmlInputEvent){
  //   if(event.target.files  && event.target.files[0]){
  //       this.file = <File>event.target.files[0];

  //       const reader = new FileReader();
  //       reader.onload = e => this.imgSelect= reader.result;
  //       reader.readAsDataURL(this.file);
  //       console.log("soy el file " +this.file.name)
  //   }
  // }
}
