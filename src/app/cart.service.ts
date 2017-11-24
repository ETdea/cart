import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { keyframes } from '@angular/animations/src/animation_metadata';
import { retry } from 'rxjs/operators/retry';
import { DEPRECATED_PLURAL_FN } from '@angular/common/src/i18n/localization';

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

  取商品分類<T>():Observable<T> {
    const functionName = "取商品分類";
    const url = "api/productCategories";

    let data = this.http.get(url).pipe(
      tap(res => this.log(functionName)),
      catchError(this.handleError(functionName))
    );

    return data as Observable<T>;
  }

  商品搜尋<T>(keyword: string, categoryId: string):Observable<T>  {
    const functionName = "商品搜尋";
    const url = "api/products";

    let data = this.http.get(url).pipe(
      tap(res => this.log(functionName)),
      catchError(this.handleError(functionName))
    );

    return data as Observable<T>;
  }

  商品查詢() {

  }

  加入購物車<T>(id: string): Observable<T> {
    const functionName = "加入購物車";
    const url = "api/cart";
    const body = {id: id}

    let data = this.http.post(url, body).pipe(
      tap(res => this.log(functionName)),
      catchError(this.handleError(functionName))
    );

    return data as Observable<T>;
  }

  取購物車<T>():Observable<T> {
    const functionName = "取購物車";
    const url = "api/cart";
    
    let data = this.http.get(url).pipe(
      tap(res => this.log(functionName)),
      catchError(this.handleError(functionName))
    );

    return data as Observable<T>;
  }

  清除購物車() {
  }

  送出訂單() {
  }

  訂單查詢() {
    
  }

  private log(message: string){
    console.log(message);
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export class CartStorage{
  static key = "CARTSTORAGE";

  static setItem<T>(data: T) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  static getItem<T>() : T {
    return JSON.parse(localStorage[this.key]) as T;
  }

  static remove(){
    localStorage.removeItem(this.key);
  }

  static hasData = () => CartStorage.getItem() !== "undefined";
}