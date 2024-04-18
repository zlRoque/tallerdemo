import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from "../productos/productos.service";
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  public products: any[];
  localStorageService: any;

  constructor(
    private alertController: AlertController,
    private firebaseService: FirebaseService,
    private LocalStorageService: LocalStorageService
  ) {
    this.products = [];
  }

  ngOnInit() {
    this.loadProducts(),
    this.LocalStorageService.hasItem() ;
  }

  loadProducts() {
    this.firebaseService.getCollection('products').subscribe((data: any[]) => {
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

  async addProduct() {
    const alert = await this.alertController.create({
      header: 'AGREGAR PRODUCTO',
      message: 'Ingrese los detalles del nuevo producto',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'details',
          type: 'text',
          placeholder: 'Detalles'
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Precio'
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'URL de la Imagen'
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'AGREGAR',
          handler: async (data) => {
            // Generar un ID único
            const newId = this.firebaseService.firestore.createId();
            const newProduct = {
              Id: newId,
              Name: data.name,
              Details: data.details,
              Price: +data.price,
              Image: data.image
            };
            this.firebaseService.setCollectionWithId('products', newId, newProduct)
              .then(() => {
                this.loadProducts();
              })
              .catch((error) => {
                console.error('Error al agregar producto:', error);
              });
          }
        }
      ]
    });

    await alert.present();
  }


  async updateProduct(product: any) {
    const alert = await this.alertController.create({
      header: 'ACTUALIZAR PRODUCTO/SERVICIO',
      message: 'NUEVOS DETALLES DEL PRODUCTO',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre',
          value: product.Name
        },
        {
          name: 'details',
          type: 'text',
          placeholder: 'Detalles',
          value: product.Details
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Precio',
          value: product.Price.toString()
        },
        {
          name: 'image',
          type: 'text',
          placeholder: 'URL de la Imagen',
          value: product.Image
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'GUARDAR',
          handler: (data) => {
            const updatedProduct = {
              ...product,
              Name: data.name,
              Details: data.details,
              Price: +data.price,
              Image: data.image
            };
            this.firebaseService.update(`products/${product.Id}`, updatedProduct)
              .then(() => {
                this.loadProducts();
              })
              .catch((error) => {
                console.error('Error al actualizar producto:', error);
              });
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteProduct(product: any) {
    const alert = await this.alertController.create({
      header: 'ELIMINAR PRODUCTO/SERVICIO',
      message: `¿Quieres borrar ${product.Name}?`,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel'
        },
        {
          text: 'ELIMINAR',
          handler: () => {
            this.firebaseService.deleteDocument('products', product.Id)
              .then(() => {
                this.loadProducts();
              })
              .catch((error) => {
                console.error('Error al eliminar producto:', error);
              });
          }
        }
      ]
    });

    await alert.present();
  }
}
