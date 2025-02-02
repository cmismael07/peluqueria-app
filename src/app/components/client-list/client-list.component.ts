import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, Cliente } from '../../services/client.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="container">
      <h1>Listado de Clientes</h1>
      <div class="client-cards">
        <mat-card *ngFor="let cliente of clientes" class="client-card">
          <mat-card-title>{{ cliente.nombre }}</mat-card-title>
          <mat-card-content>
            <p>Teléfono: {{ cliente.telefono }}</p>
            <p>Email: {{ cliente.email }}</p>
          </mat-card-content>
        </mat-card>
      </div>
      <div class="button-container">
        <button mat-raised-button color="accent" routerLink="/clientes/nuevo">
          Agregar Nuevo Cliente
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .client-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .client-card {
      width: 300px;
    }
    .button-container {
      margin-top: 20px;
    }
  `]
})
export class ClientListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error al obtener clientes', err)
    });
  }
}
