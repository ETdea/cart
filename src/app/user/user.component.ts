import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatPaginator, MatDialogRef } from '@angular/material';
import { User } from '../service/model/user';
import { UserDialog } from './user.dialog';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private matDialog: MatDialog, private userService: UserService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialog: MatDialogRef<UserDialog>;
  searchedInputValue: string;
  
  isSpinnerVisible = false;

  ngOnInit() {
  }
  openDialog(data: User = null): this { this.dialog = this.matDialog.open(UserDialog, { data: data }); return this; }
  showSpinner(): this { this.isSpinnerVisible = true; return this; }

  addedButtonClick(){
    this.openDialog();
    this.dialog.afterClosed().subscribe(dialogData => {
      this.userService.post(dialogData).subscribe(result => {
        // this.searchedButtonClick();
      });
    });
  }

  // searchedButtonClick(pageIndex: number = 0): void {
  //   this.showSpinner();
  //   this.userService.search(this.searchedInputValue, this.paginator.pageIndex, this.paginator.pageSize)
  //   .subscribe(result => this.updateTable(result.items).setTotalCount(result.totalCount).hideSpinner());
  // }
}
