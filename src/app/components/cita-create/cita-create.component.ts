// src/app/components/cita-create/cita-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cita-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-title>Agendar Cita</mat-card-title>
        <mat-card-content>
          <form [formGroup]="citaForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>ID Cliente</mat-label>
              <input matInput type="number" formControlName="cliente_id">
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Fecha</mat-label>
              <input matInput type="date" formControlName="fecha">
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Hora</mat-label>
              <input matInput type="time" formControlName="hora">
            </mat-form-field>
            <div class="button-container">
              <button mat-raised-button color="primary" type="submit">
                Agendar Cita
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
    mat-card {
      width: 500px;
    }
    .full-width {
      width: 100%;
    }
    .button-container {
      text-align: center;
      margin-top: 20px;
    }
  `]
})
export class CitaCreateComponent {
  citaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.citaForm = this.fb.group({
      cliente_id: [''],
      fecha: [''],
      hora: ['']
    });
  }

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
