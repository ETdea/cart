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
import { UserService } from './service/user.service';
import { MessageService } from './service/messages.service';
import { LayoutService } from './service/layout.service';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MessagesComponent } from './messages/messages.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AppConfig } from './app.config';
import { AuthenticationService } from './service/authentication.service';
import { UserComponent } from './user/user.component';
import { UserDialog } from './user/user.dialog';

@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    GoodsDialog,
    CartComponent,
    MessagesComponent,
    OrderComponent,
    LoginComponent,
    LayoutComponent,
    UserComponent,
    UserDialog
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
    GoodsDialog,
    UserDialog
  ],
  providers: [AuthenticationService, UserService, AppConfig, AuthGuard , FormBuilder,  GoodsService, OrderService, LayoutService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
