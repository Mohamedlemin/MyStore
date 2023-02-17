import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

 
  @Input() data!:Product
  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0
  validQuntity:boolean=true

  constructor(
    private snackBar: MatSnackBar,
  ) {}

 ngOnInit(): void {}

 add() {
    if (this.amount<=0) {
      this.validQuntity=false
      this.snackBar.open('ops! Quantity number', 'Dismiss', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
      });
    }else{
      this.item.emit({item:this.data ,quantity:this.amount })
    }
  }
}
