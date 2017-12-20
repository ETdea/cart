import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Goods } from './goods';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  isVisible = false;
  goods: Goods[];
  keyword: string;
  
  
  // validateForm: FormGroup;
  
  //   submitForm() {
  //     for (const i in this.validateForm.controls) {
  //       this.validateForm.controls[ i ].markAsDirty();
  //     }
  //   }
  
  //   get isHorizontal() {
  //     return this.validateForm.controls[ 'formLayout' ] && this.validateForm.controls[ 'formLayout' ].value === 'horizontal';
  //   }
  constructor() { }

  ngOnInit() {
    this.goods = [];
    // this.formInit();
  }

  // formInit(){
  //   this.validateForm = this.fb.group({
  //     formLayout: [ 'horizontal' ],
  //     userName  : [ null, [ Validators.required ] ],
  //     password  : [ null, [ Validators.required ] ]
  //   });
  // }

  showModal = () => {
    this.isVisible = true;
  }

  handleOk(e){
    this.isVisible = false;
  }

  handleCancel(e){
    this.isVisible = false;
  }

  edit(id){
    console.log(id);
    this.showModal()
  }

  search(){
    GoodsService.search(this.keyword).subscribe(data => {
      this.goods = data;
    });
  }
}

export class GoodsService{
    static search(keyword): Observable<Goods[]>{
      return Observable.of(require('../mock/goods.json'));
    }
}