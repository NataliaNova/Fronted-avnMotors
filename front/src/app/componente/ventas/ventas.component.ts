import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/Servicios/usuario.service';
import { ProductoService } from 'src/app/Servicios/producto-servicio';
import { Router } from '@angular/router';
import { ventaProductoServicio } from 'src/app/Servicios/ventaProducto-servicio';
import { DetalleVentaProducto } from 'src/app/Models/detalleVentaProducto-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/Servicios/cliente-servicio';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
})
export class VentasComponent implements OnInit {
  //Variables Aux
  formValue!: FormGroup;
  formProductos!: FormGroup;

  public idUser: any;
  public nombre: any;
  public clientes: any;

  public cantidad: any;

  public venta: any = {
    idcliente: '',
  };
  public productos: any;
  public producto: any = {
    cantidad: '--|--',
  };
  public total = 0;

  public data_detalle: Array<any> = [];
  public detalle: any = {
    idproducto: '',
  };

  public error_message: any;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private ruoter: Router,
    private ventaProductoService: ventaProductoServicio,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {}
  listarClientes() {
    this.clienteService.obtenerCliente().subscribe((res) => {
      this.clientes = res;
      console.log(this.clientes);
    });
  }

  listarProductos() {
    this.productoService.obtenerProductos().subscribe((res) => {
      this.productos = res;
      console.log(this.productos);
    });
  }

  get_data_producto(id: any) {
    this.productoService.obtenerProducto(id).subscribe((response) => {
      this.producto = response;
      console.log(this.producto);
    });
  }

  save_detalle(detalleForm: any) {
    if (detalleForm.valid) {
      if (detalleForm.value.cantidad <= this.producto.stock) {
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          cantidad: detalleForm.value.cantidad,
          producto: this.producto.titulo,
          precio_venta: this.producto.precio_venta,
        });
        this.detalle = new DetalleVentaProducto('', '', 0);
        this.producto.stock = '--|--';

        this.total =
          this.total +
          parseInt(this.producto.precio_venta) *
            parseInt(detalleForm.value.cantidad);
        console.log(this.total);
      }
    } else {
      this.error_message = 'Producto no disponible';
    }
  }

  eliminar(idx: any, precio_venta: any, cantidad: any) {
    this.data_detalle.splice(idx, 1);
    this.total = this.total - parseInt(precio_venta) * parseInt(cantidad);
  }

  onSubmit1(ventaForm: any) {
    if (ventaForm.value.idcliente != '') {
      let data = {
        idcliente: ventaForm.value.idcliente,
        iduser: this.idUser,
        detalles: this.data_detalle,
      };
      this.ventaProductoService.registrarVenta(data).subscribe((response) => {
        this.ruoter.navigate(['venta-index']);
      });
    } else {
      this.error_message = 'Selecciona un cliente';
    }
  }

  /*  onSubmit(ventaForm: any) {
    if (ventaForm.valid) {
      if (ventaForm.value.idcliente != '') {
        let data = {
          idcliente: ventaForm.value.idcliente,
          iduser: this.idUser,
          detalles: this.data_detalle,
        };

        this.ventaProductoService.registrarVenta(data).subscribe(
          (response) => {
            this.router.navigate(['venta']);
            console.log('estoy en data ' + this.data_detalle);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log('error');
      }
    } else {
      console.log('error');
    }
  } */

  close_alert() {}
}
