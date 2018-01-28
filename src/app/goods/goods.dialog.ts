import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Goods } from './goods';

@Component({
  templateUrl: './goods.dialog.html',
  styleUrls: ['./goods.dialog.css']
})
export class GoodsDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<GoodsDialog>,
    @Inject(MAT_DIALOG_DATA) private inputData: Goods) {
  }

  readonly isCreatedMode = this.inputData == null;

  generateFormGroup = () => this.formBuilder.group({
    id: [""],
    title: [""],
    description: [""],
    startDate: [""],
    endDate: [""],
    product: this.formBuilder.group({
      name: ["", Validators.required],
      chineseName: ["", Validators.required],
      producer: [""],
      dosage: ["", Validators.required],
      nhiDrugCode: ["", Validators.required],
      nhiPrice: ["", Validators.required],
      package: ["", Validators.required]
    }),
    units: this.formArray
  });
  generateFormArrayGroup = () => this.formBuilder.group({
    title: ["", Validators.required],
    subtractStockQty: ["", Validators.required],
    price: ["", Validators.required]
  });

  formArray = this.formBuilder.array([]);
  form = this.generateFormGroup();

  get outputData(): Goods { return this.form.value; }

  ngOnInit(): void {
    if (this.isCreatedMode)
      this.addFormArray();
    else
      this.addFormArray(this.inputData.units.length).setFormValue(this.inputData);
  }

  addFormArray(size = 1): this {
    for (let i = 0; i < size; i++)
      this.formArray.push(this.generateFormArrayGroup());

      return this;
  }

  setFormValue(value: Goods): this{
    this.form.setValue(value);
    return this;
  } 

  deletedButtonClick(index: number): void {
    this.formArray.removeAt(index);
  }
  addedButtonClick(): void {
    this.addFormArray();
  }
  cancelButtonClick(): void {
    this.dialogRef.close();
  }
}