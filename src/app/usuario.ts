import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8081/usuarios';

  constructor(private http: HttpClient) {}

  registrar(usuario: any) {
    return this.http.post(this.apiUrl, usuario);
  }
   login(email: string, contrasena: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, contrasena }, { responseType: 'text' });
}
}