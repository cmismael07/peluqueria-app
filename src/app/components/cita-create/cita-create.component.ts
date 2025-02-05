import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ClientService, Cliente } from '../../services/client.service';

@Component({
  selector: 'app-cita-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-title>Agendar Cita</mat-card-title>
        <mat-card-content>
          <form [formGroup]="citaForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Cliente</mat-label>
              <mat-select formControlName="cliente_id">
                <mat-option *ngFor="let cliente of clientes" [value]="cliente.id">
                  {{ cliente.nombre }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="citaForm.get('cliente_id')?.hasError('required')">
                Seleccionar un cliente es obligatorio.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Fecha</mat-label>
              <input matInput type="date" formControlName="fecha">
              <mat-error *ngIf="citaForm.get('fecha')?.hasError('required')">
                La fecha es obligatoria.
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Hora</mat-label>
              <input matInput type="time" formControlName="hora">
              <mat-error *ngIf="citaForm.get('hora')?.hasError('required')">
                La hora es obligatoria.
              </mat-error>
            </mat-form-field>

            <div class="button-container">
              <button mat-raised-button color="primary" type="submit" [disabled]="citaForm.invalid">
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
export class CitaCreateComponent implements OnInit {
  citaForm: FormGroup;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private clientService: ClientService
  ) {
    this.citaForm = this.fb.group({
      cliente_id: ['', { validators: [Validators.required] }],
      fecha: ['', { validators: [Validators.required] }],
      hora: ['', { validators: [Validators.required] }]
    });
  }

  ngOnInit(): void {
    this.clientService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
        this.clientes = data;
      },
      error: (err) => console.error('Error al cargar clientes', err)
    });
  }

  onSubmit() {
    if (this.citaForm.invalid) {
      return;
    }
    const newCita = this.citaForm.value;
    this.http.post('http://localhost:8000/api/citas', newCita).subscribe({
      next: (res) => {
        console.log('Cita creada:', res);
        this.router.navigate(['/clientes']);
      },
      error: (err) => console.error('Error al crear cita', err)
    });
  }
}
