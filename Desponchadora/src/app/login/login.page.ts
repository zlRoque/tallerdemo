import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from "../services/firebase.service";
import { AlertControllerService } from '../services/alert-controller.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/localstorage.service'; // Importa el servicio de almacenamiento local
import { dencrypt, encrypt } from '../util/util-encrypt'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  mostrarPassword1: boolean = false;
  FormularioInicio: FormGroup;
  path = "usuarios";

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
    private alertController: AlertControllerService,
    private localStorageService: LocalStorageService // Inyecta el servicio de almacenamiento local
  ) {
    this.FormularioInicio = this.fb.group({
      'Password': new FormControl("", Validators.required),
      'CorreoElectronico': new FormControl("", [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {
    this.localStorageService.hasItem();
  }

  login() {
    var f = this.FormularioInicio.value;
    if (this.FormularioInicio.invalid) {
      this.alertController.mostrarAlerta('Campos Inválidos', 'Por favor complete todos los campos correctamente.');
      return;
    }

    try {
      this.firebaseService.getcolleccionByEmail(this.path, f.CorreoElectronico.toUpperCase()).subscribe(users => {
        if (users && users.length > 0) {
          const user = users[0];
          const decryptedPassword = dencrypt(user['contraseña']);
          if (decryptedPassword === f.Password) {
            this.localStorageService.setItem('user', user);
            this.alertController.mostrarAlerta('Bienvenido', 'Ingresaste');
            if (user['TipoUsuario'] === 'Cliente') {
              this.router.navigate(['/tabs1/home1'])
            } else {
              this.router.navigate(['/tabs/home'])
            }
          } else {
            this.alertController.mostrarAlerta('Error', 'Credenciales inválidas. Por favor, inténtelo de nuevo.');
          }
        } else {
          this.alertController.mostrarAlerta('Error', 'Credenciales inválidas. Por favor, inténtelo de nuevo.');
        }
      });
    } catch (error) {
      this.alertController.mostrarAlerta('Error', 'Hubo un problema al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
    }
  }

  toggleMostrarPassword1() {
    this.mostrarPassword1 = !this.mostrarPassword1;
  }
}
