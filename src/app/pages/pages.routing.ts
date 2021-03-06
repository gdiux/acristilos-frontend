import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// GUARDS
import { AuthGuard } from '../guards/auth.guard';

// COMPONENTS
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductoComponent } from './producto/producto.component';
import { TareasComponent } from './tareas/tareas.component';
import { MachinesComponent } from './machines/machines.component';
import { MachineComponent } from './machine/machine.component';
import { TareaComponent } from './tarea/tarea.component';


// COMPONENTS

const routes: Routes = [
    
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children:
        [
          { path: '', component: DashboardComponent, data:{ title: 'Dashboard' } },
          { path: 'clientes', component: ClientesComponent, data:{ title: 'Clientes' } },

          { path: 'maquinas', component: MachinesComponent, data:{ title: 'Maquinas' } },
          { path: 'maquina/:id', component: MachineComponent, data:{ title: 'Maquina' } },

          { path: 'productos', component: ProductosComponent, data:{ title: 'Productos' } },
          { path: 'producto/:id', component: ProductoComponent, data:{ title: 'Producto' } },
          
          { path: 'perfil/:id', component: PerfilComponent, data:{ title: 'Perfil' } },
          { path: 'usuarios', component: UsuariosComponent, data:{ title: 'Usuarios' } },

          { path: 'tareas', component: TareasComponent, data:{ title: 'Tareas' } },
          { path: 'tarea/:id', component: TareaComponent, data:{ title: 'Tarea' } },

          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ] 
      },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
