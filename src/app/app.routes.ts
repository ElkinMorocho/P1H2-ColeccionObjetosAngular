import { Routes } from '@angular/router';
import { ListarComponent } from './Componentes/listar/listar.component';
import { AgregarComponent } from './Componentes/agregar/agregar.component';
import { ModificarComponent } from './Componentes/modificar/modificar.component';
import { EliminarComponent } from './Componentes/eliminar/eliminar.component';

export const routes: Routes = [
  { path: '', component: ListarComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'modificar/:codigo', component: ModificarComponent },
  { path: 'eliminar/:codigo', component: EliminarComponent },
];