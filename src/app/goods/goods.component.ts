import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import { GoodsDialog } from './goods';
import { GoodsService } from '../service/goods.service';
import { Goods } from '../service/model/goods';
import { retry } from 'rxjs/operator/retry';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private matDialog: MatDialog, private goodsService: GoodsService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  readonly displayedColumns = ['title', 'nhidrug'];

  dialog: MatDialogRef<GoodsDialog>;
  searchedInputValue: string;
  isSpinnerVisible = false;

  dataSource = new MatTableDataSource<Goods>();

  ngOnInit() {
    this.tableInit();
  }

  openDialog(data: Goods = null): this { this.dialog = this.matDialog.open(GoodsDialog, { data: data }); return this; }
  showSpinner(): this { this.isSpinnerVisible = true; return this; }
  hideSpinner(): this { this.isSpinnerVisible = false; return this; }
  updateTable(data: Goods[]): this { this.dataSource.data = data; return this; }

  tableInit() {
    this.dataSource.paginator = this.paginator;
    this.showSpinner();
    this.goodsService.get().subscribe(result => { this.updateTable(result).hideSpinner() });
    return this;
  }

  searchedButtonClick(): void {
    this.showSpinner();

    this.goodsService.search(this.searchedInputValue).subscribe(result => {
      this.dataSource.data = result;
      this.hideSpinner();
    });
  }

  addedButtonClick(): void {
    this.openDialog();
    this.dialog.afterClosed().subscribe(dialogData => {
      this.goodsService.post(dialogData).subscribe(result => {
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