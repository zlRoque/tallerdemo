import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Productos1PageRoutingModule } from './productos1-routing.module';
import { Productos1Page } from './productos1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Productos1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Productos1Page]
})
export class Productos1PageModule {}
