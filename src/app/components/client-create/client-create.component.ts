import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-create',
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
        <mat-card-title>Nuevo Cliente</mat-card-title>
        <mat-card-content>
          <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nombre" type="text">
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Teléfono</mat-label>
              <input matInput formControlName="telefono" type="text">
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email">
            </mat-form-field>
            <div class="button-container">
              <button mat-raised-button color="primary" type="submit">Crear Cliente</button>
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
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  `]
})
export class ClientCreateComponent {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      nombre: [''],
      telefono: [''],
      email: ['']
    });
  }

  onSubmit() {
    const newClient = this.clientForm.value;
    this.http.post('http://localhost:8000/api/clientes', newClient)
      .subscribe({
        next: (res) => {
          console.log('Cliente creado', res);
          this.router.navigate(['/clientes']);
        },
        error: (err) => console.error('Error al crear cliente', err)
      });
  }
}
