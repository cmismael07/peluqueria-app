// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <label for="username">Usuario</label>
        <input id="username" formControlName="username" type="text">
        <label for="password">Contraseña</label>
        <input id="password" formControlName="password" type="password">
        <button type="submit">Entrar</button>
      </form>
    </div>
  `,
  styles: [`
    .login-container { max-width: 400px; margin: auto; padding: 20px; }
  `]
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    const credentials = this.loginForm.value;
    this.http.post<{ token: string }>('http://localhost:8000/api/login', credentials)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/clientes']);
        },
        error: (err) => console.error('Error de autenticación', err)
      });
  }
}

