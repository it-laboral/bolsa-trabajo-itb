# Resumen: Configuración de Login y Registro en Angular
### Proyecto: Bolsa de Trabajo ITB
---

## 1. Requisitos previos

Antes de arrancar necesitás tener instalado:
- **Node.js** (descargar desde https://nodejs.org)
- **Angular CLI**: se instala ejecutando en la terminal:

```bash
npm install -g @angular/cli
```

---

## 2. Crear el proyecto

Abrí la terminal en la carpeta donde vas a trabajar (en nuestro caso `C:\Algoritmos`) y ejecutá:

```bash
ng new app
```

Cuando te pregunte:
- **Which stylesheet system would you like to use?** → elegí `CSS` y Enter
- **Do you want to enable Server-Side Rendering (SSR)?** → escribí `N` y Enter
- **Which AI tools do you want to configure?** → ya está en `None`, solo Enter

Esto crea la carpeta del proyecto con todos los archivos necesarios.

---

## 3. Entrar al proyecto y generar los componentes

```bash
cd app
ng g c components/login
ng g c components/registro
```

> `g` es abreviatura de `generate` y `c` de `component`.

Esto crea dos carpetas dentro de `src/app/components/`, cada una con sus archivos:
- `login.html` → la pantalla visual (template)
- `login.ts` → la lógica (clase del componente)
- `login.css` → los estilos

---

## 4. Abrir el proyecto en VS Code

```bash
code .
```

---

## 5. Configurar las rutas (`app.routes.ts`)

Las rutas le dicen a Angular qué componente mostrar según la URL.

Reemplazá todo el contenido de `src/app/app.routes.ts` por:

```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // redirige la raíz al login
  { path: 'login', component: LoginComponent },          // ruta /login
  { path: 'registro', component: RegistroComponent }     // ruta /registro
];
```

---

## 6. Configurar el punto de entrada (`app.html`)

Borrá todo el contenido de `src/app/app.html` y dejá solo:

```html
<router-outlet />
```

> Esto es el "hueco" donde Angular inserta cada pantalla según la ruta activa.

---

## 7. Componente Login

### `src/app/components/login/login.ts`

```typescript
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

  // Router nos permite navegar entre pantallas desde el código
  constructor(private router: Router) {}

  // Función que se ejecuta cuando el usuario hace click en "Iniciar sesión"
  iniciarSesion() {

    // Validación: verificamos que los campos no estén vacíos
    if (this.email === '' || this.password === '') {
      this.errorMsg = 'Por favor completá todos los campos.';
      return; // Cortamos la ejecución si hay error
    }

    // Si las validaciones pasan, limpiamos el error
    this.errorMsg = '';

    // Acá más adelante se conectará con el backend para verificar credenciales
    console.log('Iniciando sesión con:', this.email);
  }

  // Función para navegar a la pantalla de registro
  irARegistro() {
    this.router.navigate(['/registro']);
  }
}
```

### `src/app/components/login/login.html`

```html
<div class="login-container">

  <h2>Bolsa de Trabajo — ITB</h2>
  <h3>Iniciar Sesión</h3>

  <!-- [(ngModel)] enlaza el input con la variable "email" del componente -->
  <input
    type="email"
    placeholder="Correo electrónico"
    [(ngModel)]="email"
  />

  <!-- [(ngModel)] enlaza el input con la variable "password" del componente -->
  <input
    type="password"
    placeholder="Contraseña"
    [(ngModel)]="password"
  />

  <!-- *ngIf muestra este párrafo SOLO si errorMsg tiene contenido -->
  <p class="error" *ngIf="errorMsg">{{ errorMsg }}</p>

  <!-- (click) llama a la función iniciarSesion() al hacer click -->
  <button (click)="iniciarSesion()">Entrar</button>

  <p>¿No tenés cuenta?
    <!-- (click) navega a la pantalla de registro -->
    <a (click)="irARegistro()">Registrate</a>
  </p>

</div>
```

---

## 8. Componente Registro

### `src/app/components/registro/registro.ts`

```typescript
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
  styleUrl: './registro.css'
})
export class RegistroComponent {

  // Variables enlazadas con cada campo del formulario
  nombre: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Rol del usuario: puede ser 'alumno' o 'empresa'
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
```

### `src/app/components/registro/registro.html`

```html
<div class="registro-container">

  <h2>Bolsa de Trabajo — ITB</h2>
  <h3>Crear Cuenta</h3>

  <!-- Campo nombre completo -->
  <input
    type="text"
    placeholder="Nombre completo"
    [(ngModel)]="nombre"
  />

  <!-- Campo email -->
  <input
    type="email"
    placeholder="Correo electrónico"
    [(ngModel)]="email"
  />

  <!-- Selector de rol: define si el usuario es alumno o empresa -->
  <select [(ngModel)]="rol">
    <option value="alumno">Alumno</option>
    <option value="empresa">Empresa</option>
  </select>

  <!-- Campo contraseña -->
  <input
    type="password"
    placeholder="Contraseña"
    [(ngModel)]="password"
  />

  <!-- Campo confirmación de contraseña -->
  <input
    type="password"
    placeholder="Confirmar contraseña"
    [(ngModel)]="confirmPassword"
  />

  <!-- Mensaje de error, visible solo si hay un error -->
  <p class="error" *ngIf="errorMsg">{{ errorMsg }}</p>

  <!-- Mensaje de éxito, visible solo si el registro fue exitoso -->
  <p class="exito" *ngIf="exitoMsg">{{ exitoMsg }}</p>

  <!-- Botón que llama a la función registrarse() -->
  <button (click)="registrarse()">Crear cuenta</button>

  <p>¿Ya tenés cuenta?
    <a (click)="irALogin()">Iniciá sesión</a>
  </p>

</div>
```

---

## 9. Estilos globales (`src/styles.css`)

Reemplazá todo el contenido de `src/styles.css` por:

```css
/* Reset general: elimina márgenes y paddings por defecto del navegador */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}

/* Centramos todo verticalmente y horizontalmente en la pantalla */
body {
  background: #f0f4ff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Tarjeta blanca compartida por login y registro */
.login-container,
.registro-container {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Título principal */
h2 {
  color: #1a237e;
  font-size: 1.1rem;
  text-align: center;
}

/* Subtítulo */
h3 {
  color: #333;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 0.5rem;
}

/* Inputs y select */
input, select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}

input:focus, select:focus {
  outline: none;
  border-color: #3f51b5;
}

/* Botón principal */
button {
  background: #3f51b5;
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #303f9f;
}

p {
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}

a {
  color: #3f51b5;
  cursor: pointer;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}

/* Mensaje de error */
.error {
  color: #c62828;
  background: #ffebee;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

/* Mensaje de éxito */
.exito {
  color: #2e7d32;
  background: #e8f5e9;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
}
```

---

## 10. Levantar el servidor

```bash
ng serve
```

Abrí el navegador en: **http://localhost:4200**

---

## Conceptos clave de Angular usados

| Sintaxis | ¿Qué hace? |
|---|---|
| `[(ngModel)]="variable"` | Two-way binding: une el input con una variable TypeScript |
| `(click)="funcion()"` | Llama a una función cuando hacés click |
| `{{ variable }}` | Muestra el valor de una variable en el HTML |
| `*ngIf="condicion"` | Muestra el elemento solo si la condición es verdadera |
| `router.navigate(['/ruta'])` | Navega a otra pantalla desde el código |

---

## Errores comunes y soluciones

| Error | Causa | Solución |
|---|---|---|
| `ng` no reconocido | Angular CLI no instalado | Ejecutar `npm install -g @angular/cli` |
| `unknown arguments: component` | Versión nueva de Angular CLI | Usar `ng g c` en lugar de `ng generate component` |
| `Cannot find module login.component` | Ruta de import incorrecta | Importar desde `./components/login/login` sin `.component` |
| `Could not find template file` | templateUrl incorrecto en el .ts | Usar `./login.html` en lugar de `./login.component.html` |
| Propiedad duplicada en el .ts | Se pegó el templateUrl dos veces | Borrar la línea duplicada |
