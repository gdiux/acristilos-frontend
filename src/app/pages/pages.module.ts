import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';

// MODULES
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProductoComponent } from './producto/producto.component';
import { CardsComponent } from './dashboard/components/cards/cards.component';
import { TareasComponent } from './tareas/tareas.component';
import { MachineComponent } from './machine/machine.component';
import { MachinesComponent } from './machines/machines.component';
import { TareaComponent } from './tarea/tarea.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    PerfilComponent,
    ProductoComponent,
    CardsComponent,
    TareasComponent,
    MachineComponent,
    MachinesComponent,
    TareaComponent
  ],
  exports:[
    DashboardComponent,
    ProductosComponent,
    ClientesComponent,
    UsuariosComponent,
    PagesComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SwiperModule
    
  ]
})
export class PagesModule { }
