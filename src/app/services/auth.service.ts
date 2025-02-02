import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  // Un BehaviorSubject para mantener y emitir el estado de autenticación
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  /**
   * Realiza la solicitud de login a la API.
   * Si es exitoso, guarda el token y actualiza el estado.
   */
  login(username: string, password: string): Observable<{ token: string }> {
    const url = 'http://localhost:8000/api/login';
    console.log('Enviando login con:', username, password);
    return this.http.post<{ token: string }>(url, { username, password }).pipe(
      tap(response => {
        console.log('Respuesta del backend:', response);
        localStorage.setItem(this.tokenKey, response.token);
        this.authState.next(true);
      })
    );
  }
  

  /**
   * Elimina el token y actualiza el estado de autenticación.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
  }

  /**
   * Retorna true si existe un token almacenado.
   */
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  /**
   * Retorna un observable para poder subscribirse al estado de autenticación.
   */
  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  // Método privado para verificar si existe el token
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
