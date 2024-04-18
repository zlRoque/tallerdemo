import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CartService } from '../carrito/carrito.service';
import { FirebaseService } from '../services/firebase.service'; // Asegúrate de importar correctamente el servicio Firebase
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-productos1',
  templateUrl: './productos1.page.html',
  styleUrls: ['./productos1.page.scss'],
})
export class Productos1Page implements OnInit {
  public products: any[];


  constructor(
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private cartService: CartService,
    private LocalStorageService: LocalStorageService
  ) {
    this.products = [];
  }

  ngOnInit() {
    this.loadProducts()
    this.LocalStorageService.hasItem();
  }

  loadProducts() {
    this.firebaseService.getcolleccion('products').subscribe((data) => {
      this.products = data;
    });
  }

  async showProductDetails(product: any) {
    const alert = await this.alertController.create({
      header: `${product.Name}`,
      subHeader: `Precio: $${product.Price.toFixed(2)}`,
      message: `Detalles: ${product.Details}`,
      buttons: ['CERRAR']
    });

    await alert.present();
  }

  async agregarAlCarrito(product: any) {
    this.cartService.addToCart(product);
    const alert = await this.alertController.create({
      header: 'Producto Agregado',
      message: `Se agregó ${product.Name} al carrito.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}

