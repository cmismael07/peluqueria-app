import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-title>Iniciar Sesión</mat-card-title>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Usuario</mat-label>
              <input matInput formControlName="username" type="text">
              <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
                El usuario es obligatorio.
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" type="password">
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                La contraseña es obligatoria.
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                La contraseña debe tener al menos 6 caracteres.
              </mat-error>
            </mat-form-field>
            <div class="button-container">
              <button mat-raised-button color="primary" type="submit">Entrar</button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      margin-top: 50px;
    }
    mat-card {
      width: 400px;
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
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required, Validators.minLength(6)] }]
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/clientes']);
      },
      error: (err) => console.error('Error de autenticación', err)
    });
  }
}
