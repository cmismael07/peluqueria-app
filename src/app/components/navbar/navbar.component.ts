import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';  // Agrega esta línea

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule], // Agrega CommonModule aquí
  template: `
 <mat-toolbar color="primary">
  <span>Peluquería Anita</span>
  <span class="spacer"></span>
  <button mat-button routerLink="/clientes">Clientes</button>
  <button mat-button routerLink="/citas/nuevo">Agendar Cita</button>
  <button mat-button routerLink="/atenciones">Atenciones</button>
  <!-- Agrega el botón para registrar una atención -->
  <button mat-button routerLink="/atenciones/nuevo">Registrar Atención</button>
  <button mat-button *ngIf="(isAuthenticated$ | async)" (click)="logout()">Salir</button>
</mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {
    this.isAuthenticated$ = this.auth.getAuthState();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
