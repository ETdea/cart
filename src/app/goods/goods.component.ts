import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, PageEvent } from '@angular/material';
import { GoodsDialog } from './goods.dialog';
import { GoodsService } from '../service/goods.service';
import { Goods } from '../service/model/goods';
import { retry } from 'rxjs/operator/retry';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { concat } from 'rxjs/observable/concat';
import { ApiModel } from '../service/model/apiModel';
import { count } from 'rxjs/operator/count';
import { getLocaleDateFormat } from '@angular/common/src/i18n/locale_data_api';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private matDialog: MatDialog, private goodsService: GoodsService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  readonly displayedColumns = ['title', 'nhidrug'];
  readonly pageSizeOptions = [5, 10, 25, 100];
  readonly defaultPageSize = this.pageSizeOptions[2];

  dialog: MatDialogRef<GoodsDialog>;
  searchedInputValue: string;

  dataSource = new MatTableDataSource<Goods>();
  isSpinnerVisible = false;
  totalCount = 0;

  ngOnInit() {
    this.paginator.page.subscribe(() => this.searchedButtonClick(this.paginator.pageIndex));
    this.paginator.pageSize = this.defaultPageSize;
    this.tableInit();
  }

  openDialog(data: Goods = null): this { this.dialog = this.matDialog.open(GoodsDialog, { data: data }); return this; }
  showSpinner(): this { this.isSpinnerVisible = true; return this; }
  hideSpinner(): this { this.isSpinnerVisible = false; return this; }
  updateTable(data: Goods[]): this { this.dataSource.data = data; return this; }
  setTotalCount(value: number):this { this.totalCount = value; return this;}

  tableInit() {
    this.searchedButtonClick();
    return this;
  }

  searchedButtonClick(pageIndex: number = 0): void {
    this.showSpinner();
    this.goodsService.search(this.searchedInputValue, this.paginator.pageIndex, this.paginator.pageSize)
    .subscribe(result => this.updateTable(result.items).setTotalCount(result.totalCount).hideSpinner());
  }

  addedButtonClick(): void {
    this.openDialog();
    this.dialog.afterClosed().subscribe(dialogData => {
      this.goodsService.post(dialogData).subscribe(result => {
        this.searchedButtonClick();
      });
    });
  }

  tableRowClick(id): void {
    this.goodsService.find(id).subscribe(result => {
      this.openDialog(result);

      this.dialog.afterClosed().subscribe(result => {
        
        if (result == null) return;
        
        this.goodsService.put(result).subscribe(ok => {
          this.searchedButtonClick();
        })
      })
    });
  }
}