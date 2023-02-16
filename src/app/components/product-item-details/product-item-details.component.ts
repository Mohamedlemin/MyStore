import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item-details',
  templateUrl: './product-item-details.component.html',
  styleUrls: ['./product-item-details.component.css']
})
export class ProductItemDetailsComponent {
  id:any
  data:any={}
  loading:boolean = false
  constructor(private route:ActivatedRoute , private service:ProductsService) {
   this.id = this.route.snapshot.paramMap.get("id")
   console.log(this.id)
  }
  
  ngOnInit(): void {
    this.getProductById(this.id)
    //console.log(this.data)
  }

  

  getProductById(id: number): void {
    this.service.getAllProducts().pipe(
      map(products => products.find(product => product.id ==id)),
      tap(product => this.data = product)
    )
    .subscribe();
  
    
    
    }
 
}
