import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Goods, Candidate } from './model/goods';
import { retry } from 'rxjs/operators/retry';
import { HttpParams } from '@angular/common/http/src/params';
import { keyframes } from '@angular/animations/src/animation_metadata';
import { catchError, map } from 'rxjs/operators';

const mockUrl = "/assets/mocks/goods.json";
// const url = "https://tpeyichangapi.azurewebsites.net/goods/";
// const url = "http://localhost:5000/goods/";
const url = "/api/goods/";

@Injectable()
export class GoodsService {

  constructor(private httpClient: HttpClient) { }

  // get(): Observable<Goods[]> {
  //   let result = this.httpClient.get<Goods[]>(url);

  //   return result;
  // }
  get(): Observable<HttpResponse<Goods[]>> {
    let result = this.httpClient
    .get<any>(mockUrl, { observe: 'response' })
    .pipe(
      map(data => data.body)
    )
    ;
    
    return result;
  }

  find(id: string): Observable<Goods>{
    let result = this.httpClient.get<Goods>(url + id);

    return result;
  }

  search(keyword: string): Observable<Goods[]>{
    return this.httpClient.get<Goods[]>(url + "?keyword=" + keyword);
  }

  post(data: Goods): Observable<Goods>{
    let result = this.httpClient.post<Goods>(url, data);
    return result;
  }

  put(data: Goods): Observable<Goods>{
    let result = this.httpClient.put<Goods>(url + data.id, data);

    return result;
  }

  getCandidates(keyword: string): Observable<Candidate[]> {
    let result = this.httpClient.get<Goods[]>(url + "candidates/" + keyword );

    return result;
  }
}
