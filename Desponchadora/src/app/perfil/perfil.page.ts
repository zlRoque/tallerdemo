import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: User;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.usuario = this.localStorageService.getItem('user');
  }

  cerrar() {
    this.localStorageService.clear();
  }
}
