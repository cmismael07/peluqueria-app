// src/app/components/client-list/client-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService, Cliente } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Listado de Clientes</h1>
      <ul>
        <li *ngFor="let cliente of clientes">
          {{ cliente.nombre }} - {{ cliente.telefono }} - {{ cliente.email }}
        </li>
      </ul>
      <a routerLink="/clientes/nuevo">Agregar Nuevo Cliente</a>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
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

