import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  // FormsModule: permite usar ngModel (enlazar inputs con variables)
  // CommonModule: permite usar directivas como *ngIf
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
 styleUrl: './registro.css',
})
export class RegistroComponent {

  // Variables enlazadas con cada campo del formulario
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Rol del usuario: puede ser 'alumno' o 'empresa'
  // Por defecto arranca en 'alumno'
  rol: string = 'alumno';

  // Variables para mostrar mensajes en pantalla
  errorMsg: string = '';
  exitoMsg: string = '';

  constructor(private router: Router) {}

  // Función que se ejecuta cuando el usuario hace click en "Crear cuenta"
  registrarse() {

    // Validación 1: todos los campos deben estar completos
    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'Por favor completá todos los campos.';
      return;
    }

    // Validación 2: las contraseñas deben coincidir
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    // Validación 3: la contraseña debe tener al menos 6 caracteres
    if (this.password.length < 6) {
      this.errorMsg = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    // Si pasa todas las validaciones, mostramos mensaje de éxito
    this.errorMsg = '';
    this.exitoMsg = '¡Registro exitoso! Redirigiendo...';

    // Esperamos 2 segundos y redirigimos al login
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  // Función para volver a la pantalla de login
  irALogin() {
    this.router.navigate(['/login']);
  }
}