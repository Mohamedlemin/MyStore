import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductItemDetailsComponent } from './components/product-item-details/product-item-details.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'details/:id', component: ProductItemDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: ProductListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
