import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraComponent } from './componente/barra/barra.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { ProductoCrearComponent } from './componente/productos/producto-crear/producto-crear.component';
import { ProductoEditarComponent } from './componente/productos/producto-editar/producto-editar.component';
import { UsuarioComponent } from './componente/usuario/usuario.component';
import { LoginComponent } from './componente/login/login.component';
import { VentasComponent } from './componente/ventas/ventas.component';
import { ContactoComponent } from './componente/contacto/contacto.component';
import { NoAuthComponent } from './componente/no-auth/no-auth.component';
import { RegistarClienteComponent } from './componente/registar-cliente/registar-cliente.component';
import { AgendamientoComponent } from './componente/agendamiento/agendamiento.component';
import { ProductoInicioComponent } from './componente/productos/producto-inicio/producto-inicio.component';
import { ServicioInicioComponent } from './componente/servicios/servicio-inicio/servicio-inicio.component';
import { ServicioCrearComponent } from './componente/servicios/servicio-crear/servicio-crear.component';
import { ServicioEditarComponent } from './componente/servicios/servicio-editar/servicio-editar.component';

const routes: Routes = [
  { path: 'barra', component: BarraComponent },
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'productoCrear', component: ProductoCrearComponent },
  { path: 'productoEditar', component: ProductoEditarComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'noAutorizado', component: NoAuthComponent },
  { path: 'registrarCliente', component: RegistarClienteComponent },
  { path: 'agendamiento', component: AgendamientoComponent },
  { path: 'productoInicio', component: ProductoInicioComponent },
  { path: 'servicioInicio', component: ServicioInicioComponent },
  { path: 'servicioCrear', component: ServicioCrearComponent },
  { path: 'servicioEditar', component: ServicioEditarComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
