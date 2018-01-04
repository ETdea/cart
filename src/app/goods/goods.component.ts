import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef } from '@angular/material';
import { Goods, GoodsDialog } from './goods';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private matDialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dialog: MatDialogRef<GoodsDialog>;
  searchedInputValue: string;
  isSpinnerVisible = false;
  displayedColumns = ['title', 'nhidrug'];

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
    GoodsService.getNew().subscribe(result => { this.updateTable(result).hideSpinner() });
    return this;
  }

  searchedButtonClick(): void {
    this.showSpinner();

    GoodsService.search(this.searchedInputValue).subscribe(result => {
      this.dataSource.data = result;
      this.hideSpinner();
    });
  }

  addedButtonClick():void {
    this.openDialog();
    this.dialog.afterClosed().subscribe(dialogData => {
      GoodsService.post(dialogData).subscribe(result => {
      });
    });
  }

  tableRowClick(id): void {
    GoodsService.find(id).subscribe(result => {
      this.openDialog(result);

      this.dialog.afterClosed().subscribe(result => {
        GoodsService.put(result).subscribe(ok => {
        })
      })
    });
  }
}

export class GoodsService {
  static getAll(): Observable<Goods[]> {
    return Observable.of(require('../mock/goods.json')).delay(1000);
  }

  static search(keyword): Observable<Goods[]> {
    return this.getAll().map(m => m.slice(6, 10));
  }

  static getNew(): Observable<Goods[]> {
    return this.getAll().map(m => m.slice(0, 50));
  }

  static find(id: string): Observable<Goods> {
    return this.getAll().map(m => m.find(f => f.id === id));
  }

  static post(Goods): Observable<any> {
    return this.getAll().map(m => m.slice(0, 1));
  }

  static put(Goods): Observable<any> {
    return this.getAll().map(m => m.slice(0, 1));
  }
}

