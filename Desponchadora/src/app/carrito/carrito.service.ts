import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';

  getCart(): any[] {
    const cartStr = localStorage.getItem(this.cartKey);
    return cartStr ? JSON.parse(cartStr) : [];
  }

  addToCart(producto: any): void {
    let cart = this.getCart();
    cart.push(producto);
    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter(item => item.Id !== productId);
    this.saveCart(cart);
  }

  private saveCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
