// src/app/components/atencion-list/atencion-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-atencion-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Listado de Atenciones</h2>
      <ul>
        <li *ngFor="let atencion of atenciones">
          {{ atencion.descripcion }} - {{ atencion.fecha_atencion }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
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
