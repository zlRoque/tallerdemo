import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NegocioPageRoutingModule } from './negocio-routing.module';

import { NegocioPage } from './negocio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NegocioPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [NegocioPage]
})
export class NegocioPageModule {}
