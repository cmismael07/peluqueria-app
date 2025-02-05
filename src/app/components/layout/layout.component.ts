// src/app/components/layout/layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  template: `
    <!-- Si el usuario está autenticado se muestra el layout completo -->
    <ng-container *ngIf="(isAuthenticated$ | async); else noNav">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer class="sidenav" mode="side" opened>
          <mat-nav-list>
            <a mat-list-item routerLink="/clientes">Clientes</a>
            <a mat-list-item routerLink="/citas/nuevo">Agendar Cita</a>
            <a mat-list-item routerLink="/atenciones">Atenciones</a>
            <a mat-list-item routerLink="/atenciones/nuevo">Registrar Atención</a>
            <a mat-list-item (click)="logout()">Cerrar sesión</a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <mat-toolbar color="primary">
            <button mat-icon-button (click)="drawer.toggle()" class="menu-button">
              <mat-icon>menu</mat-icon>
            </button>
            <span>Peluquería Anita</span>
          </mat-toolbar>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </ng-container>

    <!-- Si no está autenticado, se muestra solo el router-outlet -->
    <ng-template #noNav>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
    }
    .sidenav {
      width: 250px;
    }
    .menu-button {
      margin-right: 8px;
    }
    .content {
      padding: 16px;
    }
  `]
})
export class LayoutComponent {
  // Observable que emite true si el usuario está autenticado, false en caso contrario
  isAuthenticated$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {
    this.isAuthenticated$ = this.auth.getAuthState();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
