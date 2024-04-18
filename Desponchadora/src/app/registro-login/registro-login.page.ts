import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertControllerService } from '../services/alert-controller.service';
import { FirebaseService } from "../services/firebase.service";
import { User } from '../model/user.model';
import { encrypt } from '../util/util-encrypt'
import { take } from 'rxjs';
@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.page.html',
  styleUrls: ['./registro-login.page.scss'],
})
export class RegistroLoginPage implements OnInit {
  user: User;
  isPickerOpen = false;
  FormularioRegistro: FormGroup;
  mostrarPassword1: boolean = false;
  mostrarPassword2: boolean = false;
  path = "usuarios"

  constructor(
    public fb: FormBuilder,
    public alertController: AlertControllerService,
    private router: Router,
    private database: FirebaseService,
  ) {
    this.FormularioRegistro = this.fb.group({
      'Nombre': new FormControl("", Validators.required),
      'Apellido': new FormControl("", Validators.required),
      'Password': new FormControl("", Validators.required),
      'CorreoElectronico': new FormControl("", [Validators.required, Validators.email]),
      'ConfirmacionPassword': new FormControl("", Validators.required),
      'TipoUsuario': new FormControl("", Validators.required),
      'FechaNacimiento': new FormControl("", Validators.required)
    });

  }

  ngOnInit() {
  }

  Registrar() {
    var f = this.FormularioRegistro.value;

    f.FechaNacimiento = Date.parse(f.FechaNacimiento);
    var fechaNacimiento = new Date(1999, 0, 1);

    if (f.TipoUsuario === 'Cliente') {
      // Validar que la fecha de nacimiento sea válida
      fechaNacimiento = new Date(f.FechaNacimiento);
      if (isNaN(fechaNacimiento.getTime())) {
        this.alertController.mostrarAlerta('Error en el registro', 'Fecha de nacimiento no válida');
        return;
      }
    }
    var hace16Anios = new Date();
    hace16Anios.setFullYear(hace16Anios.getFullYear() - 16);

    // Comparar la fecha de nacimiento con hace16Anios
    if (fechaNacimiento > hace16Anios) {
      this.alertController.mostrarAlerta('Error en el registro', 'Debes tener al menos 16 años para registrarte como cliente');
      return;
    }

    if (!f.CorreoElectronico.includes('@') || !f.CorreoElectronico.toLowerCase().includes('.com')) {
      this.alertController.mostrarAlerta('Información incorrecta', 'El correo electrónico debe contener "@" y ".com"');
      return;
    }
    if (f.Password !== f.ConfirmacionPassword) {
      this.alertController.mostrarAlerta('Contraseñas Incorrectas', "Las contraseñas no coinciden");
      return;
    }
    f.Password = encrypt(f.Password);
    this.database.getcolleccionByEmail(this.path, f.CorreoElectronico.toUpperCase()).pipe(take(1)).subscribe(users => {
      if (users && users.length > 0) {
        this.alertController.mostrarAlerta('Error en el registro', 'El correo electrónico ya está en uso');
        return;
      } else {
        const user: User = {
          Nombre: f.Nombre.toUpperCase(),
          correoElectronico: f.CorreoElectronico.toUpperCase(),
          contraseña: f.Password,
          TipoUsuario: f.TipoUsuario,
          Apellido: f.TipoUsuario === 'Cliente' ? f.Apellido.toUpperCase() : ' No aplica',
          FechaNacimiento: fechaNacimiento,
        };
        for (const prop in user) {
          if (user[prop] === null || user[prop] === undefined || user[prop] === '') {
            this.alertController.mostrarAlerta('Error en el registro', 'Favor de verificar que todos los campos esten llenos');
            return;
          }
        }
        this.database.setcollecion(this.path, user).then(() => {
          this.alertController.mostrarAlerta('Registro Exitoso', "Se ha registrado correctamente")
          this.FormularioRegistro.reset();
          this.router.navigate(['/login '])
        }).catch((error) => {
          this.alertController.mostrarAlerta('Error en el registro', error.message);
        })
      }
    });

  }

  Cancelar() {
    this.FormularioRegistro.patchValue({ TipoUsuario: null });
    this.FormularioRegistro.reset();
    this.router.navigate(['/login'])
  }

  public Columnas = [
    {
      name: 'Tipo_Usuario',
      options: [
        {
          text: 'Empresa',
          value: 'Empresa',
        },
        {
          text: 'Cliente',
          value: 'Cliente',
        },
      ],
    },
  ];

  public BotonesPicker = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Aceptar',
      handler: (value: any) => {
        this.FormularioRegistro.patchValue({ TipoUsuario: value.Tipo_Usuario.value });
      },
    },
  ];

  Abrir(isOpen: boolean) {
    this.isPickerOpen = isOpen;
  }
  onFechaNacimientoChange(event: CustomEvent) {
    const selectedDate = event.detail.value; // Obtiene la fecha seleccionada del evento
    this.FormularioRegistro.patchValue({ FechaNacimiento: selectedDate }); // Asigna la fecha al control del formulario
  }

  toggleMostrarPassword1() {
    this.mostrarPassword1 = !this.mostrarPassword1;
  }
  toggleMostrarPassword2() {
    this.mostrarPassword2 = !this.mostrarPassword2;
  }
}
