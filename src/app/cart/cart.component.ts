import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { Goods, Candidate } from '../service/model/goods';
import { GoodsService } from '../service/goods.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

  constructor(private formBuilder: FormBuilder, private goodsService: GoodsService, private orderService: OrderService) { }

  searchedInputValue: string;
  searchedInputOldValue: string;
  autocompleteOptions: Observable<Candidate[]>;
  isSpinnerVisible = false;

  goodsFormArray = this.formBuilder.array([]);
  subtotals: number[] = [];
  total = 0;

  generateFormGroup = () => this.formBuilder.group({
    details: this.goodsFormArray
  });
  generateGoodsFormArrayGroup = (goods: Goods) => this.formBuilder.group({
    id: [goods.id],
    title: [goods.title],
    units: this.generateUnitFormArray(goods)
  });
  generateUnitFormArrayGroup = (title: string, price: number) => this.formBuilder.group({
    title: [title],
    quantity: [0],
    price: [price]
  });
  generateUnitFormArray(goods: Goods) {
    let unitArray = this.formBuilder.array([]);
    goods.units.forEach(unit => unitArray.push(this.generateUnitFormArrayGroup(unit.title, unit.price)));

    return unitArray;
  }

  form = this.generateFormGroup();
  list: Goods[] = [];

  isGoodsExist = (goods: Goods) => this.list.some(value => value.id === goods.id);
  isKeyInChar = () => this.searchedInputValue !== this.searchedInputOldValue;

  ngOnInit() {
    this.autocompleteInit();
  }

  autocompleteInit(): this {
    this.autocomplete.optionSelected.asObservable().subscribe(() => this.autocompleteSelect()); return this;
  }

  resetSearchedInput(): this {
    this.searchedInputValue = "";

    return this;
  }

  addList(goods: Goods): this {
    this.list.splice(0, 0, goods);

    return this;
  }

  addGoodsFormArray(goods: Goods): this {
    this.goodsFormArray.insert(0, this.generateGoodsFormArrayGroup(goods));

    return this;
  }

  addSubtotal(): this {
    this.subtotals.splice(0, 0, 0);
    return this;
  }

  setAutocompleteOptions(): this {
    this.autocompleteOptions = this.goodsService.getCandidates(this.searchedInputValue);

    return this;
  }

  setSearchedInputOldValue(): this {
    this.searchedInputOldValue = this.searchedInputValue;

    return this;
  }

  setSubtotal(index:number): this {
    this.subtotals[index] = this.countSubtotal(index);
    return this;
  }

  setTotal(): this {
    this.total = this.countTotal();

    return this;
  }

  countSubtotal(index: number) {
    return this.form.value.details[index].units.reduce((total, unit) => { return (unit.quantity * unit.price) + total }, 0);
  }

  countTotal(): number {
    return this.subtotals.reduce((total, subtotal) => subtotal + total);
  }

  autocompleteSelect(): void {
    let id = this.searchedInputValue;
    this.resetSearchedInput();
    this.goodsService.find(id).subscribe(goods => {
      if (!this.isGoodsExist(goods)) this.addList(goods).addGoodsFormArray(goods).addSubtotal();
    });
  }

  searchedInputKeyup(): void {
    if (this.isKeyInChar() && this.searchedInputValue != "") this.setAutocompleteOptions().setSearchedInputOldValue();
  }

  quantityInputValueChange(goodsIndex: number): void {
    this.setSubtotal(goodsIndex).setTotal();
  }

  submitButtonClick(): void {
    console.log(this.form.value);
    this.orderService.post(this.form.value).subscribe();
  }
}