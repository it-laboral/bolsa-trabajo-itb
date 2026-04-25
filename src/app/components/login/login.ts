import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  // FormsModule: permite usar ngModel (enlazar inputs con variables)
  // CommonModule: permite usar directivas como *ngIf
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  // Variables que se enlazan con los inputs del formulario
  email: string = '';
  password: string = '';

  // Variable para mostrar mensajes de error en pantalla
  errorMsg: string = '';

  // Controla si la contraseña es visible o no
  mostrarPassword: boolean = false;

  // Router nos permite navegar entre pantallas desde el código
  constructor(private router: Router) {}

  // Función que se ejecuta cuando el usuario hace click en "Iniciar sesión"
  iniciarSesion() {
    // Validación: verificamos que los campos no estén vacíos
    if (this.email === '' || this.password === '') {
      this.errorMsg = 'Por favor completá todos los campos.';
      return;
    }
    // Si las validaciones pasan, limpiamos el error
    this.errorMsg = '';
    // Acá más adelante se conectará con el backend para verificar credenciales
    console.log('Iniciando sesión con:', this.email);
  }

  // Alterna entre mostrar y ocultar la contraseña
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  // Función para navegar a la pantalla de registro
  irARegistro() {
    this.router.navigate(['/registro']);
  }
}