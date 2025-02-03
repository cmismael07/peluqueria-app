import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientService, Cita, Cliente } from '../../services/client.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-client-citas',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h2 *ngIf="cliente">Citas de {{ cliente.nombre }}</h2>
      <h2 *ngIf="!cliente">Citas del Cliente</h2>
      <div *ngIf="citas && citas.length > 0; else noCitas">
        <mat-card *ngFor="let cita of citas" class="cita-card">
          <mat-card-title>{{ cita.fecha }} - {{ cita.hora }}</mat-card-title>
          <mat-card-content>
            <p>Estado: {{ cita.estado }}</p>
            <!-- Puedes agregar más detalles según tus datos -->
          </mat-card-content>
        </mat-card>
      </div>
      <ng-template #noCitas>
        <p>No se encontraron citas para este cliente.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .cita-card { margin-bottom: 15px; }
  `]
})
export class ClientCitasComponent implements OnInit {
  citas: Cita[] = [];
  cliente!: Cliente;
  clienteId!: number;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    // Obtiene el parámetro 'cliente' de la URL (ejemplo: /clientes/5/citas)
    this.clienteId = Number(this.route.snapshot.paramMap.get('cliente'));

    // Obtener las citas del cliente
    this.clientService.getCitasPorCliente(this.clienteId).subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al cargar citas', err)
    });

    // Obtener los datos del cliente
    this.clientService.getClienteById(this.clienteId).subscribe({
      next: (data) => this.cliente = data,
      error: (err) => console.error('Error al cargar datos del cliente', err)
    });
  }
}
