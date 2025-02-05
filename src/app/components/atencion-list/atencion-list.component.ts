// src/app/components/atencion-list/atencion-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

export interface Atencion {
  id: number;
  cita_id: number;
  descripcion: string;
  fecha_atencion: string;
  cita?: {
    cliente?: {
      id: number;
      nombre: string;
      telefono: string;
      email: string;
    }
  };
}

@Component({
  selector: 'app-atencion-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h1>Listado de Atenciones</h1>
      <div *ngIf="atenciones && atenciones.length > 0; else noAtenciones">
        <mat-card *ngFor="let atencion of atenciones" class="atencion-card">
          <mat-card-title>
            {{ atencion.descripcion }}
          </mat-card-title>
          <mat-card-subtitle>
            Fecha: {{ atencion.fecha_atencion | date: 'medium' }}
            <br>
            Cliente: {{ atencion.cita?.cliente?.nombre || 'No especificado' }}
          </mat-card-subtitle>
        </mat-card>
      </div>
      <ng-template #noAtenciones>
        <p>No se encontraron atenciones.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .atencion-card { margin-bottom: 15px; }
  `]
})
export class AtencionListComponent implements OnInit {
  atenciones: Atencion[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Atencion[]>('http://localhost:8000/api/atenciones').subscribe({
      next: (data) => {
        console.log('Atenciones recibidas:', data);
        this.atenciones = data;
      },
      error: (err) => console.error('Error al obtener atenciones', err)
    });
  }
}
