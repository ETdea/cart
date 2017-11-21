import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class CartService {

  constructor(
    private http: HttpClient,
    public jsonp: Jsonp) {
  }

  取搜尋建議(keyword: string): Observable<Response> {
    const query = encodeURI(keyword);
    
    let data = this.http.get('api/suggestions') as Observable<Response> 
    return data;
  }

  取商品分類() {
    let data = this.http.get('api/productCategories') as Observable<Response>;

    return data;     
  }

  商品搜尋(keyword: string) {
    let data = this.http.get('api/products') as Observable<Response>;

    return data;   
  }

  商品查詢(){

  }

  加入購物車() {
  }

  取購物車清單() {
  }

  送出訂單(){

  }

  訂單查詢(){

  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}