import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoodsComponent } from './goods/goods.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'goods', component: GoodsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'order', component: OrderComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
