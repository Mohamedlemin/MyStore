import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  // form!: FormGroup;
 
 
  name: string = '';
  address: string = '';
  creditcard: string = '';
  isValid: boolean = false;

  cartProducts: any[] = [];
  total: number = 0;

  constructor(private router: Router, private snackBar: MatSnackBar, private cartService :CartService) {  }
 
 
  validQuntity:boolean=true

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe(cartProducts => {
      this.cartProducts = cartProducts;
    });
    this.cartService.getCartProducts();
    this.total=this.cartService.total;
    // console.log(this.cartProducts)
  }

  validateForm() {
    const nameRegex = /^[a-zA-Z ]{3,}$/;
    const addressRegex = /^[a-zA-Z0-9\s,'-]{6,}$/;
    const creditcardRegex = /^[0-9]{16}$/;


    const isNameValid = nameRegex.test(this.name);
    const isAddressValid = addressRegex.test(this.address);
    const isCreditCardValid = creditcardRegex.test(this.creditcard);

    this.isValid = isNameValid && isAddressValid && isCreditCardValid;
  }

  checkout(){
        const queryParams = `fullName=${this.name}&total=${this.total}`;
        const url = `/success?${queryParams}`;
        this.router.navigateByUrl(url);
      }
    
  

      addAmount(index: number) {
        this.cartService.addAmount(index);
        this.total=this.cartService.total;

      }
    
      minsAmount(index: number) {
        this.cartService.minsAmount(index);
        this.total=this.cartService.total;

      }
    
      deleteProduct(index: number) {
        this.cartService.deleteProduct(index);
        this.total=this.cartService.total;

      }
    
      clearCart() {
        this.cartService.clearCart();
        this.total=this.cartService.total;

      }

      detectChange() {
        this.cartService.detectChange();
        this.total=this.cartService.total;

      }
    
      getTotal() {
        this.cartService.getCartTotal();
        this.total=this.cartService.total;

      }
    }
