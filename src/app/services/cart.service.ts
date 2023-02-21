import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: { product: Product; quantity: number }[] = [];
  total = 0;
  validQuntity = true;
  success = false;
  cartSubject = new Subject<any[]>();

  constructor(private snackBar: MatSnackBar) {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      this.cartSubject.next(this.cartProducts);
    }
    this.getCartTotal();
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    this.updateCartInLocalStorage();
  }

  minsAmount(index: number) {
    if (this.cartProducts[index].quantity <= 1) {
      this.validQuntity = false;
      this.snackBar.open('Product quantity cannot be less than 1 !!', 'Dismiss', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
      });
    } else {
      this.cartProducts[index].quantity--;
      this.getCartTotal();
      this.updateCartInLocalStorage();
    }
  }

  detectChange() {
    this.getCartTotal();
    this.updateCartInLocalStorage();
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    this.updateCartInLocalStorage();
    this.snackBar.open('Product deleted successfully !!', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    this.updateCartInLocalStorage();
    this.snackBar.open('Your cart is cleared !!', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  getCartTotal() {
    for (let x in this.cartProducts) {
       this.total += this.cartProducts[x].product.price * this.cartProducts[x].quantity;
       console.log(this.total);

    }
  }

  addCart() {
    this.success = true;
  }

  addToCart(product: Product) {
    const existingItemIndex = this.cartProducts.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex === -1) {
      this.cartProducts.push({ product: product, quantity: 1 });
    } else {
      this.cartProducts[existingItemIndex].quantity++;
    }

    this.getCartTotal();
    this.updateCartInLocalStorage();
    this.snackBar.open('Product added to cart !!', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  private updateCartInLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.cartSubject.next(this.cartProducts);
  }
}