import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}

export interface Cita {
  id: number;
  cliente_id: number;
  fecha: string;
  hora: string;
  estado: string;
  // Otros campos, si es necesario
}
export interface Atencion {
  id: number;
  cita_id: number;
  descripcion: string;
  fecha_atencion: string;
  // La propiedad "cita" se define opcionalmente para reflejar la relación
  cita?: {
    cliente?: {
      id: number;
      nombre: string;
      telefono: string;
      email: string;
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8000/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  getCitasPorCliente(clienteId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/${clienteId}/citas`);
  }

  // Nuevo método: Obtener los datos de un cliente por su ID
  getClienteById(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${clienteId}`);
  }
}
