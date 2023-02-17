import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';

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

 ngOnInit(): void {}

 add() {
  
    this.item.emit({item:this.data ,quantity:this.amount })
  }
}
