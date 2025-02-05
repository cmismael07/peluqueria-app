import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Interfaz para representar una cita pendiente
export interface Cita {
  id: number;
  cliente_id: number;
  fecha: string;
  hora: string;
  estado: string;
  // Otros campos que puedas necesitar (por ejemplo, nombre del cliente, si lo deseas mostrar)
}

@Component({
  selector: 'app-atencion-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-title>Registrar Atención</mat-card-title>
        <mat-card-content>
          <form [formGroup]="atencionForm" (ngSubmit)="onSubmit()">
            <!-- Seleccionar la cita pendiente -->
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Cita</mat-label>
              <mat-select formControlName="cita_id">
                <mat-option *ngFor="let cita of citas" [value]="cita.id">
                  <!-- Puedes mostrar información adicional, como la fecha y hora de la cita -->
                  Cita #{{ cita.id }} - {{ cita.fecha }} {{ cita.hora }}
                </mat-option>
              </mat-select>
              <mat-error *ngIf="atencionForm.get('cita_id')?.hasError('required')">
                Seleccione una cita.
              </mat-error>
            </mat-form-field>
            
            <!-- Descripción de la atención (por ejemplo, corte de pelo, manicure, etc.) -->
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Descripción</mat-label>
              <input matInput formControlName="descripcion" type="text">
              <mat-error *ngIf="atencionForm.get('descripcion')?.hasError('required')">
                La descripción es obligatoria.
              </mat-error>
            </mat-form-field>
            
            <!-- Fecha y hora en que se realizó la atención -->
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Fecha y Hora de Atención</mat-label>
              <!-- Usamos "datetime-local" para obtener ambos datos en un solo input -->
              <input matInput formControlName="fecha_atencion" type="datetime-local">
              <mat-error *ngIf="atencionForm.get('fecha_atencion')?.hasError('required')">
                La fecha y hora son obligatorias.
              </mat-error>
            </mat-form-field>
            
            <div class="button-container">
              <button mat-raised-button color="primary" type="submit" [disabled]="atencionForm.invalid">
                Registrar Atención
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
export class AtencionCreateComponent implements OnInit {
  atencionForm: FormGroup;
  citas: Cita[] = []; // Lista de citas pendientes (citas programadas que aún no se han atendido)

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.atencionForm = this.fb.group({
      cita_id: ['', { validators: [Validators.required] }],
      descripcion: ['', { validators: [Validators.required] }],
      fecha_atencion: ['', { validators: [Validators.required] }]
    });
  }

  ngOnInit(): void {
    // Ahora se hace la solicitud GET al endpoint que permite filtrar por estado
    this.http.get<Cita[]>('http://localhost:8000/api/citas?estado=programada')
      .subscribe({
        next: (data) => {
          console.log('Citas pendientes:', data);
          this.citas = data;
        },
        error: (err) => console.error('Error al cargar citas pendientes', err)
      });
  }
  

  onSubmit(): void {
    if (this.atencionForm.invalid) {
      return;
    }
    const formValue = this.atencionForm.value;
    
    // Convertir la fecha-hora a un formato adecuado (opcional)
    // Por ejemplo, agregar ":00" al final para incluir los segundos:
    formValue.fecha_atencion = formValue.fecha_atencion + ':00';
  
    this.http.post('http://localhost:8000/api/atenciones', formValue)
      .subscribe({
        next: (res) => {
          console.log('Atención registrada:', res);
          this.router.navigate(['/atenciones']);
        },
        error: (err) => console.error('Error al registrar atención', err)
      });
  }
}
