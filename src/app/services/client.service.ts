import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define y exporta la interfaz Cliente
export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}

// Si es necesario, también puedes definir la interfaz Cita aquí o en otro archivo
export interface Cita {
  id: number;
  cliente_id: number;
  fecha: string;
  hora: string;
  estado: string;
  // Otros campos según tus necesidades
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8000/api/clientes';

  constructor(private http: HttpClient) {}

  // Obtener el listado de clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}`);
  }

  // Obtener las citas de un cliente
  getCitasPorCliente(clienteId: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/${clienteId}/citas`);
  }
}
