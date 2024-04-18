import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from "../services/firebase.service";
import { LocalStorageService } from '../services/localstorage.service'; // Ruta a tu servicio Firebase

@Component({
  selector: 'app-negocio',
  templateUrl: './negocio.page.html',
  styleUrls: ['./negocio.page.scss'],
})
export class NegocioPage implements OnInit {
  formularionegocio: FormGroup;
  
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private LocalStorageService: LocalStorageService
     // Injecta el servicio Firebase
  ) {
    this.formularionegocio = this.fb.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      propietario: ['', Validators.required],
      direccion: ['', Validators.required],
      contacto: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  
  ngOnInit() {
    this.LocalStorageService.hasItem();
  }
  async guardarNegocio() {
    if (this.formularionegocio.valid) {
      // Generar un ID único para el negocio
      const id = '_' + Math.random().toString(36).substr(2, 9);

      // Obtener los valores del formulario
      const negocio = {
        id: id,
        nombre: this.formularionegocio.value.nombre,
        tipo: this.formularionegocio.value.tipo,
        propietario: this.formularionegocio.value.propietario,
        direccion: this.formularionegocio.value.direccion,
        contacto: this.formularionegocio.value.contacto,
        imagen: this.formularionegocio.value.imagen
      };

      // Guardar negocio en Firebase
      try {
        await this.firebaseService.setcollecion('negocios', negocio);
        
        // Mostrar la alerta
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'El negocio se guardó correctamente.',
          buttons: ['OK']
        });
        await alert.present();

        // Redirigir a la página principal
        this.router.navigate(['tabs/productos']);
      } catch (error) {
        console.error('Error al guardar negocio:', error);
        // Manejar el error adecuadamente
      }
    } else {
      // Mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
