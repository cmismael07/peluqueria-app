// src/app/components/cita-create/cita-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Agendar Cita</h2>
      <form [formGroup]="citaForm" (ngSubmit)="onSubmit()">
        <label for="cliente_id">ID Cliente</label>
        <input id="cliente_id" formControlName="cliente_id" type="number">
        <label for="fecha">Fecha</label>
        <input id="fecha" formControlName="fecha" type="date">
        <label for="hora">Hora</label>
        <input id="hora" formControlName="hora" type="time">
        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 500px; margin: auto; }
  `]
})
export class CitaCreateComponent {
  citaForm = this.fb.group({
    cliente_id: [''],
    fecha: [''],
    hora: ['']
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    const newCita = this.citaForm.value;
    this.http.post('http://localhost:8000/api/citas', newCita)
      .subscribe({
        next: (res) => {
          console.log('Cita creada', res);
          this.router.navigate(['/clientes']);
        },
        error: (err) => console.error('Error al crear cita', err)
      });
  }
}
