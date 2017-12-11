import { Component, OnInit } from '@angular/core';
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
}
