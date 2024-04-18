import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Productos1Page } from './productos1.page';

const routes: Routes = [
  {
    path: '',
    component: Productos1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Productos1PageRoutingModule {}
