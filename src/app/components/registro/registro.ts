import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  telefono: string = '';
  rol: string = 'alumno';
  errorMsg: string = '';
  exitoMsg: string = '';
  mostrarPassword: boolean = false;
  mostrarConfirmPassword: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  registrarse() {
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Por favor completá todos los campos.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    const nuevoUsuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      contrasena: this.password,
      telefono: this.telefono,
      estado: true
    };

    this.usuarioService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.errorMsg = '';
        this.exitoMsg = '¡Registro exitoso! Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMsg = 'Error al registrar. Intentá de nuevo.';
      }
    });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmPassword() {
    this.mostrarConfirmPassword = !this.mostrarConfirmPassword;
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}