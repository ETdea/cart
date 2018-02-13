import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../service/model/user';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user.dialog.html',
  styleUrls: ['./user.dialog.css']
})
export class UserDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserDialog>,
    @Inject(MAT_DIALOG_DATA) private inputData: User) {
  }

  readonly isCreatedMode = this.inputData == null;

  generateFormGroup = () => this.formBuilder.group({
    id: [""],
    userName: ["", Validators.required],
    password: [""],
    isDisabled: [false],
  });

  form = this.generateFormGroup();

  get outputData(): User { return this.form.value; }

  ngOnInit() {
    if (!this.isCreatedMode) this.setFormValue(this.inputData);
  }

  setFormValue(value: User): this { this.form.setValue(value); return this; } 

  cancelButtonClick(): void {
    this.dialogRef.close();
  }
}
