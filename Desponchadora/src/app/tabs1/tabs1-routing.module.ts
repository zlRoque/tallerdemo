import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabs1Page } from './tabs1.page';

const routes: Routes = [
  {
    path: 'tabs1',
    component: Tabs1Page,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'acercade',
        loadChildren: () => import('../acercade/acercade.module').then( m => m.AcercadePageModule)
      },
      {
        path: 'home1',
        loadChildren: () => import('../home1/home1.module').then(m => m.Home1PageModule)
      },
      {
        path: 'productos1',
        loadChildren: () => import('../productos1/productos1.module').then(m => m.Productos1PageModule)
      },
      {
        path: 'carrito',
        loadChildren: () => import('../carrito/carrito.module').then(m => m.CarritoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs1/home1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs1/home1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class Tabs1PageRoutingModule {}
