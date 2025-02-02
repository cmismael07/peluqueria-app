// src/app/components/atencion-list/atencion-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-atencion-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <h1>Listado de Atenciones</h1>
      <div class="atencion-cards">
        <mat-card *ngFor="let atencion of atenciones" class="atencion-card">
          <mat-card-title>{{ atencion.descripcion }}</mat-card-title>
          <mat-card-subtitle>
            {{ atencion.fecha_atencion | date: 'medium' }}
          </mat-card-subtitle>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .atencion-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-top: 20px;
    }
    .atencion-card {
      width: 300px;
    }
  `]
})
export class AtencionListComponent implements OnInit {
  atenciones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/atenciones')
      .subscribe({
        next: (data) => this.atenciones = data,
        error: (err) => console.error('Error al obtener atenciones', err)
      });
  }
}
