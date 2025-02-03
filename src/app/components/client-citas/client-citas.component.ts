import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClientService, Cita } from '../../services/client.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-client-citas',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h2>Citas del Cliente</h2>
      <div *ngIf="citas && citas.length > 0; else noCitas">
        <mat-card *ngFor="let cita of citas" class="cita-card">
          <mat-card-title>{{ cita.fecha }} - {{ cita.hora }}</mat-card-title>
          <mat-card-content>
            <p>Estado: {{ cita.estado }}</p>
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
  clienteId!: number;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    // Obtén el id del cliente de la ruta
    this.clienteId = Number(this.route.snapshot.paramMap.get('cliente'));
    this.clientService.getCitasPorCliente(this.clienteId).subscribe({
      next: (data) => this.citas = data,
      error: (err) => console.error('Error al cargar citas', err)
    });
  }
}
