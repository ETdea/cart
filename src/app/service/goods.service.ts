import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Goods, Candidate } from './model/goods';
import { retry } from 'rxjs/operators/retry';

const url = "/assets/mocks/goods.json";

@Injectable()
export class GoodsService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Goods[]> {
    let result = this.httpClient.get<Goods[]>(url);

    return result;
  }

  find(id: string): Observable<Goods>{
    return this.get().map(array => array.find(goods => goods.id === id));
  }

  search(keyword: string): Observable<Goods[]>{
    return this.get().map(array => array.filter(goods => goods.title.includes(keyword)));
  }

  post(data: Goods): Observable<Goods>{
    return this.find("12");
  }

  put(data: Goods): Observable<Goods>{
    return this.find("12");
  }

  getCandidates(keyword: string): Observable<Candidate[]> {
    keyword = keyword == "" ? "@#$@$@#$" : keyword;

    let result = this.get().map(array =>
                          array.map(goods =>
                            new Candidate(goods.id, goods.title)).filter(candidate =>
                              candidate.title.includes(keyword)));

    return result;
  }
}
