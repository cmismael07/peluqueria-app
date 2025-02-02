import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { CitaCreateComponent } from './components/cita-create/cita-create.component';
import { AtencionListComponent } from './components/atencion-list/atencion-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientListComponent },
  { path: 'clientes/nuevo', component: ClientCreateComponent },
  { path: 'citas/nuevo', component: CitaCreateComponent },
  { path: 'atenciones', component: AtencionListComponent }
];

