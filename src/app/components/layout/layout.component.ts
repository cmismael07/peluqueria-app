import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatListModule, RouterOutlet, RouterLink, MatIconModule],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/clientes">Clientes</a>
          <a mat-list-item routerLink="/citas/nuevo">Agendar Cita</a>
          <a mat-list-item routerLink="/atenciones">Atenciones</a>
          <a mat-list-item routerLink="/atenciones/nuevo">Registrar Atención</a>
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
  `,
  styles: [`
    /* Aquí usamos CSS en lugar de SCSS */
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
export class LayoutComponent {}
