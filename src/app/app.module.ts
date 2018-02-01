import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoodsComponent } from './goods/goods.component';
import { GoodsDialog } from './goods/goods.dialog';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { GoodsService } from './service/goods.service';
import { OrderService } from './service/order.service';
import { LayoutService } from './service/layout.service';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodsDialog,
    CartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule
  ],
  entryComponents:[
    GoodsDialog
  ],
  providers: [FormBuilder,  GoodsService, OrderService, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
