import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import { Goods, GoodsDialog, GoodsService } from '../goods/goods';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private formbuilder: FormBuilder) { }
  searchedInputValue: string;
  autocompleteList: SearchedResult[];
  
  
  
  list: Goods[];

  // isSpinnerVisible = false;
  // displayedColumns = ['title', 'nhidrug'];

  // dataSource = new MatTableDataSource<Goods>();

  ngOnInit() {
    
  }

  // updateTable(data: Goods[]): this { this.dataSource.data = data; return this; }

  // tableInit() {
  //   CartService.getNew().subscribe(result => { this.updateTable(result) });
  //   return this;
  // }

  searchedButtonClick(): void {
    GoodsService.search(this.searchedInputValue).subscribe(result => {
      this.list = result;
    });
  }
}


export class SearchedResult{
  id: string;
  title: string;
}

export class Order{
  total:number;
  goods: CartGoods[]
}

export class CartGoods{
  goodsId: string;
  units: CartGoodsUnit[];
  total: number;
}

export class CartGoodsUnit{
  title: string;
  quantity: number;
  price: number;
}
