import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatPaginator, MatDialogRef, MatTableDataSource } from '@angular/material';
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

  readonly displayedColumns = ['name', 'disabled'];
  readonly pageSizeOptions = [5, 10, 25, 100];
  readonly defaultPageSize = this.pageSizeOptions[2];

  dialog: MatDialogRef<UserDialog>;
  searchedInputValue: string;
  
  dataSource = new MatTableDataSource<User>();
  isSpinnerVisible = false;
  totalCount = 0;

  ngOnInit() {
    this.paginator.page.subscribe(() => this.searchedButtonClick(this.paginator.pageIndex));
    this.paginator.pageSize = this.defaultPageSize;
    this.tableInit();
  }

  openDialog(data: User = null): this { this.dialog = this.matDialog.open(UserDialog, { data: data }); return this; }
  showSpinner(): this { this.isSpinnerVisible = true; return this; }
  hideSpinner(): this { this.isSpinnerVisible = false; return this; }
  updateTable(data: User[]): this { this.dataSource.data = data; return this; }
  setTotalCount(value: number):this { this.totalCount = value; return this;}

  tableInit() {
    this.searchedButtonClick();
    return this;
  }

  addedButtonClick(){
    this.openDialog();
    this.dialog.afterClosed().subscribe(dialogData => {
      this.userService.post(dialogData).subscribe(result => {
        this.searchedButtonClick();
      });
    });
  }

  searchedButtonClick(pageIndex: number = 0): void {
    this.showSpinner();
    this.userService.search(this.searchedInputValue, this.paginator.pageIndex, this.paginator.pageSize)
    .subscribe(result => this.updateTable(result.items).setTotalCount(result.totalCount).hideSpinner());
  }

  tableRowClick(id): void {
    this.userService.find(id).subscribe(result => {
      this.openDialog(result);

      this.dialog.afterClosed().subscribe(result => {
        
        if (result == null) return;
        
        this.userService.put(result).subscribe(ok => {
          this.searchedButtonClick();
        })
      })
    });
  }
}
