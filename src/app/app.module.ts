import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { GoodsComponent } from './goods/goods.component';


@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
