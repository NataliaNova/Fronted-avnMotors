import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/Servicios/producto-servicio';
import { ProductosModel } from 'src/app/Models/productos-model';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-inicio',
  templateUrl: './producto-inicio.component.html',
  styleUrls: ['./producto-inicio.component.css'],
})
export class ProductoInicioComponent implements OnInit {
  //Var.Aux
  public rol: any;
  public token: any;
  public dataProductos!: any;
  public filtro: any;
  public filtroText: any;
  public base_url = environment.url;

  productoModel: ProductosModel = new ProductosModel();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private productoService: ProductoService,
    private formBuilder: FormBuilder
  ) {
    this.rol = this.usuarioService.obtenerRol();
    this.token = this.usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.productoService.obtenerProductos().subscribe((res) => {
      this.dataProductos = res;
      console.log(this.dataProductos);
    });
  }

  search(searchForm: any) {
    if (this.filtroText == '') {
      this.listar();
    } else {
      this.productoService
        .obtenerProductosParametro(searchForm.value.filtro)
        .subscribe((res) => {
          this.dataProductos = res;
          console.log(this.dataProductos);
        });
    }
  }

  eliminarProducto2(item: any) {
    Swal.fire({
      title: '¿Realmente deseas eliminar este producto?',
      showDenyButton: true,

      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(item._id).subscribe((res) => {
          Swal.fire('El producto ha sido eliminado!');
          this.listar();
        });
      } else if (result.isDenied) {
        Swal.fire('No se ha eliminado el producto');
      }
    });
  }

  comprarProducto() {
    if (this.rol == 'Cliente') {
      Swal.fire({
        title: '¿Realmente quieres comprar este producto?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Tu producto ha sido agregado al carrito');
        }
      });
    } else {
      this.token == null;
      Swal.fire('Para realizar tu compra debes registrarte como cliente');
    }
  }
}
