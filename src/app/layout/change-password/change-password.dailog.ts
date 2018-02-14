import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChangePassword } from '../../service/model/login';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.dailog.html',
  styleUrls: ['./change-password.dailog.css']
})
export class ChangePasswordDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialog>,
    @Inject(MAT_DIALOG_DATA) private inputData: ChangePassword) {
  }

  generateFormGroup = () => this.formBuilder.group({
    currentPassword: ["", Validators.required],
    newPassword: ["", Validators.required]
  });

  form = this.generateFormGroup();

  get outputData(): ChangePassword { return this.form.value; }

  ngOnInit() {  }
  
  cancelButtonClick(): void {
    this.dialogRef.close();
  }

}
