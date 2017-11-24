import { Component, OnInit } from '@angular/core';
// import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { CartService } from '../cart.service';
import { getPluralCase } from '@angular/common/src/i18n/localization';
import { strictEqual } from 'assert';
import { concat } from 'rxjs/operators/concat';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {
  title = 'app';
  selectedOption;
  options = [];
  keyword: string;

  data = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    
    this.getCategory();
  }

  getCategory() {
    this.cartService.取商品分類().subscribe((data: any) => {
      this.options = data;
    })
  }

  search() {
    const query = encodeURI(this.keyword);
    
    this.cartService.商品搜尋(this.keyword, null).subscribe((data: any) => {
      this.data = data;
    });
  }

  addToCart(id: string){
    this.cartService.加入購物車(id).subscribe();
  }
}
