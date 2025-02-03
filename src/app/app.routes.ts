import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientCitasComponent } from './components/client-citas/client-citas.component';
import { CitaCreateComponent } from './components/cita-create/cita-create.component';
import { AtencionListComponent } from './components/atencion-list/atencion-list.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientListComponent, canActivate: [AuthGuard] },
  { path: 'clientes/nuevo', component: ClientCreateComponent, canActivate: [AuthGuard] },
  { path: 'clientes/:cliente/citas', component: ClientCitasComponent, canActivate: [AuthGuard] },
  { path: 'citas/nuevo', component: CitaCreateComponent, canActivate: [AuthGuard] },
  { path: 'atenciones', component: AtencionListComponent, canActivate: [AuthGuard] }
];
