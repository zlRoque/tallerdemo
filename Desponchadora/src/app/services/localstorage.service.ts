import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    private router: Router
  ) { }

  // Método para agregar un elemento al almacenamiento local
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Método para obtener un elemento del almacenamiento local
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Método para eliminar un elemento del almacenamiento local
  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.router.navigate(['/']);
  }

  // Método para eliminar todos los elementos del almacenamiento local
  clear(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  hasItem(): void {
    if (localStorage.getItem("user") == null) {
      this.router.navigate(['/login']);
    }
  }
}
