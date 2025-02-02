import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
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
            </mat-form-field>
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Contraseña</mat-label>
              <input matInput formControlName="password" type="password">
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
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

 // login.component.ts (fragmento)
ngOnInit(): void {
  this.loginForm = this.fb.group({
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required, Validators.minLength(6)] }]
  });
}


  onSubmit() {
    if (this.loginForm.invalid) return;
    
    const { username, password } = this.loginForm.value;
    console.log('Formulario enviado:', this.loginForm.value);
    
    this.auth.login(username, password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
      }
    });
  }
}
