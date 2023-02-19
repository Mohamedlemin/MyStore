import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  // form!: FormGroup;
  cartProducts:any[] = [];
  total:number = 0;
  success:boolean = false
  validQuntity:boolean=true
 
  name: string = '';
  address: string = '';
  creditcard: string = '';
  isValid: boolean = false;
  constructor(private router: Router, private snackBar: MatSnackBar,) {}


  ngOnInit(): void {
    this.getCartProducts()
    // this.form = new FormGroup({
    //   fullName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    //   adress: new FormControl('', [Validators.required,Validators.minLength(6)]),
    //   creditCart: new FormControl('', [Validators.required,Validators.minLength(16)]),
   
    // });
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
    
  

  getCartProducts() {
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

  addAmount(index:number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
  }
  minsAmount(index:number) {
    if(this.cartProducts[index].quantity<=1){
      this.validQuntity=false
      this.snackBar.open('Product quntity cannot be less than 1 !!', 'Dismiss', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
      });
    }else{
          this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    }
  }
  detectChange() {
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    
  }

  deleteProduct(index:number) {
    this.cartProducts.splice(index , 1)
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    this.snackBar.open('Product deleted succesfully !!', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
    this.snackBar.open('your card is cleared !!', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
  getCartTotal() {
    this.total = 0
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
  
    this.success = true
    
  }

}
