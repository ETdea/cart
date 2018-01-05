import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoodsComponent, GoodsDialog } from './goods/goods';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodsDialog,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents:[
    GoodsDialog
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
