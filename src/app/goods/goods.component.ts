import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Goods } from './goods';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { fail } from 'assert';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  readonly addedTitleText = "建立上架商品";
  readonly editedTitleText = "編輯上架商品";

  tableData: Goods[] = [];
  form: FormGroup;
  tableNoResult: string;
  searchedInputValue: string;
  modalTitle: string;

  isTableLoading = false;
  showTableLoading = () => this.isTableLoading = true;
  hideTableLoading = () => this.isTableLoading = false;

  isModalVisible = false;
  showModal = () => this.isModalVisible = true;
  hideModal = () => this.isModalVisible = false;

  // validateForm: FormGroup;

  //   submitForm() {
  //     for (const i in this.validateForm.controls) {
  //       this.validateForm.controls[ i ].markAsDirty();
  //     }
  //   }

  //   get isHorizontal() {
  //     return this.validateForm.controls[ 'formLayout' ] && this.validateForm.controls[ 'formLayout' ].value === 'horizontal';
  //   }
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit() {
    // this.formInit();

    this.tableInit();
    this.formInit();
  }

  // formInit(){
  //   this.validateForm = this.fb.group({
  //     formLayout: [ 'horizontal' ],
  //     userName  : [ null, [ Validators.required ] ],
  //     password  : [ null, [ Validators.required ] ]
  //   });
  // }

  tableInit() {
    this.showTableLoading();
    GoodsService.getNew().subscribe(result => {
      this.tableData = result;
      this.hideTableLoading();
    });
  }

  formInit(){
    this.form = this.formbuilder.group({
      title: ['test', Validators.required]
    });
  }

  searchedButtonClick() {
    this.showTableLoading();
    
    GoodsService.search(this.searchedInputValue).subscribe(result => {
      this.tableData = result;
      this.hideTableLoading();
    });
  }

  addedButtonClick() {
    this.modalTitle = this.addedTitleText;

    this.showModal();
  }

  tableRowClick(id) {
    this.modalTitle = this.editedTitleText;

    this.showModal();
  }
}

export class GoodsService {
  static search(keyword): Observable<Goods[]> {
    return Observable.of(require('../mock/goods.json')).delay(1000);
  }

  static getNew(): Observable<Goods[]> {
    return Observable.of(require('../mock/goods.json').slice(1,5)).delay(1000);
  }
}