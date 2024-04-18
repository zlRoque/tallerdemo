import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoPage } from './carrito.page';

import { CarritoPageRoutingModule } from './carrito-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CarritoPageRoutingModule
  ],
  declarations: [CarritoPage]
})
export class CarritoPageModule {}
