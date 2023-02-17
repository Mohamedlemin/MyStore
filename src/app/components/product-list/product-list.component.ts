import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products';
import { ProductsService } from 'src/app/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  cartProducts:any[] = [];

  constructor(private dataService: ProductsService,
    private snackBar: MatSnackBar,
    ) { }
 
    openSnackBar(message: string) {
      this.snackBar.open(message);
    }
  ngOnInit() {
   
    this.dataService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addTocart(event:any){
    if("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if(exist) {
        this.snackBar.open('Product is already in your cart', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
       
      }else {
        this.cartProducts.push(event)
        localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
        
        this.snackBar.open('Well done !!', 'Dismiss', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });

      }
    } else {
      this.cartProducts.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProducts))
      this.snackBar.open('Well done !!', 'Dismiss', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
      });

    }
  }

  }


