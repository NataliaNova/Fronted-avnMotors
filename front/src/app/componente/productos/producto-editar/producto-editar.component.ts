import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoService } from 'src/app/Servicios/producto-servicio';
import { ProductosModel } from 'src/app/Models/productos-model';
import { Producto } from 'src/app/Models/productos-model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css'],
})
export class ProductoEditarComponent implements OnInit {
  //Var.Aux
  public rol: any;
  public productO: any;
  public dataProductos: any;
  public _id: any;
  public token!: any;
  public base_url = environment.url;
  formValue!: FormGroup;

  //producto: Producto = new Producto();
  public productoModel: any;

  error_message!: any;
  success_message!: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.rol = this.usuarioService.obtenerRol();
    this.token = this.usuarioService.obtenerToken();
    this.productoModel = new Producto('', '', '', '', '', 0, 0, 0);
  }

  ngOnInit(): void {
    //this.validar();
    this.obtenerCampos();
  }
  validar() {
    if (this.rol != 'Admin') {
      this.router.navigate(['noAutorizado']);
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
      imagen: [''],
    });
    this.obtener();
  }

  /*  obtener() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.productoService.obtenerProducto(this.id).subscribe((response) => {
        this.productosModel = response;
        console.log(this.producto);
        this.formValue.controls['nombre'].setValue(this.productosModel.nombre);
        this.formValue.controls['marca'].setValue(this.productosModel.marca);
        this.formValue.controls['descripcion'].setValue(
          this.productosModel.descripcion
        );
        this.formValue.controls['precio_venta'].setValue(
          this.productosModel.precio_venta
        );
        this.formValue.controls['precio_compra'].setValue(
          this.productosModel.precio_compra
        );

        this.formValue.controls['cantidad'].setValue(
          this.productosModel.cantidad
        );

        this.productosModel._id = this.productosModel._id;
      });
    });
  } */

  obtener() {
    this.route.params.subscribe((params) => {
      this._id = params['id'];
      this.productoService.obtenerProducto(this._id).subscribe((response) => {
        this.productO = response;
        console.log(this.productO);
        this.formValue.controls['nombre'].setValue(this.productO.nombre);
        this.formValue.controls['marca'].setValue(this.productO.marca);
        this.formValue.controls['descripcion'].setValue(
          this.productO.descripcion
        );
        this.formValue.controls['precio_venta'].setValue(
          this.productO.precio_venta
        );
        this.formValue.controls['precio_compra'].setValue(
          this.productO.precio_compra
        );

        this.formValue.controls['cantidad'].setValue(this.productO.cantidad);

        this.productoModel._id = this.productO._id;
      });
    });
  }

  /*   actualizarProducto() {
    this.productosModel.nombre = this.formValue.value.nombre;
    this.productosModel.marca = this.formValue.value.marca;
    this.productosModel.descripcion = this.formValue.value.descripcion;
    this.productosModel.precio_compra = this.formValue.value.precio_compra;
    this.productosModel.precio_venta = this.formValue.value.precio_venta;
    this.productosModel.cantidad = this.formValue.value.cantidad;
    this.productosModel.imagen = this.file;

    this.productoService
      .actualizarProducto(this.productoModel, this.productosModel._id)
      .subscribe((res) => {
        Swal.fire('El producto ha sido actualizado!');
        setTimeout(() => {
          this.router.navigate(['producto-index']);
        }, 2000);
      });
  } */

  actualizarProducto() {
    this.productoModel.nombre = this.formValue.value.nombre;
    this.productoModel.marca = this.formValue.value.marca;
    this.productoModel.descripcion = this.formValue.value.descripcion;
    this.productoModel.precio_compra = this.formValue.value.precio_compra;
    this.productoModel.precio_venta = this.formValue.value.precio_venta;
    this.productoModel.cantidad = this.formValue.value.cantidad;

    this.productoService
      .actualizarProducto(this.productoModel, this.productoModel._id)
      .subscribe((res) => {
        Swal.fire('El producto ha sido actualizado!');
        setTimeout(() => {
          this.router.navigate(['producto-index']);
        }, 2000);
      });
  }

  enConstruccion() {
    Swal.fire(
      'Estimado adminitrador, esta sección se encuentra en construcción'
    );
  }
}
