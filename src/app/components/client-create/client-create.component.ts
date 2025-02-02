// src/app/components/client-create/client-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Nuevo Cliente</h2>
      <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
        <label for="nombre">Nombre</label>
        <input id="nombre" formControlName="nombre" type="text">
        <label for="telefono">Teléfono</label>
        <input id="telefono" formControlName="telefono" type="text">
        <label for="email">Email</label>
        <input id="email" formControlName="email" type="email">
        <button type="submit">Crear Cliente</button>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 500px; margin: auto; }
  `]
})
export class ClientCreateComponent {
  clientForm = this.fb.group({
    nombre: [''],
    telefono: [''],
    email: ['']
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

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
