import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Goods, Candidate } from './model/goods';
import { retry } from 'rxjs/operators/retry';
import { keyframes } from '@angular/animations/src/animation_metadata';
import { catchError, map } from 'rxjs/operators';
import { ApiModel } from './model/apiModel'
import { RequestOptions, Headers } from '@angular/http';

// const mockUrl = "/assets/mocks/goods.json";
const url = "https://tpeyichangapi.azurewebsites.net/api/goods/";
// const url = "http://localhost:5000/goods/";
// const url = "/api/goods/";

@Injectable()
export class GoodsService {
  constructor(private httpClient: HttpClient) { }

  find(id: string): Observable<Goods>{ return this.httpClient.get<Goods>(url + id); }

  search(keyword: string = "", pageIndex: number, pageSize: number): Observable<ApiModel<Goods>>{
    let params = new HttpParams().set("keyword", keyword).set("pageIndex", pageIndex.toString()).set("pageSize", pageSize.toString());
    
    return this.httpClient.get<ApiModel<Goods>>(url, { params } );
  }

  post(data: Goods): Observable<Goods> { return this.httpClient.post<Goods>(url, data); }
  put(data: Goods): Observable<Goods> { return this.httpClient.put<Goods>(url + data.id, data); }
  getCandidates(keyword: string): Observable<Candidate[]> { return this.httpClient.get<Goods[]>(`${url}candidates/${keyword}` ); }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
    }
}
}
