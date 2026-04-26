import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMsg: string = '';
  mostrarPassword: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  iniciarSesion() {
    if (this.email === '' || this.password === '') {
      this.errorMsg = 'Por favor completá todos los campos.';
      return;
    }

    this.usuarioService.login(this.email, this.password).subscribe({
      next: (respuesta: any) => {
        if (respuesta === 'Login exitoso') {
          this.errorMsg = '';
          this.router.navigate(['/home']);
        } else {
          this.errorMsg = respuesta;
        }
      },
      error: () => {
        this.errorMsg = 'Error al conectar con el servidor.';
      }
    });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}