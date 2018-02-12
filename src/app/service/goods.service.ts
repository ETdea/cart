import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Goods, Candidate } from './model/goods';
import { retry } from 'rxjs/operators/retry';
import { keyframes } from '@angular/animations/src/animation_metadata';
import { catchError, map } from 'rxjs/operators';
import { ApiModel } from './model/apiModel'
import { AuthenticationService } from './authentication.service';

// const mockUrl = "/assets/mocks/goods.json";
const url = "https://tpeyichangapi.azurewebsites.net/api/goods/";
// const url = "http://localhost:5000/goods/";
// const url = "/api/goods/";

@Injectable()
export class GoodsService {
  constructor(public httpClient: HttpClient,
    public authenticationService: AuthenticationService) { }

  find = (id: string): Observable<Goods> => this.httpClient.get<Goods>(url + id, this.getOptions()); 
  post = (data: Goods): Observable<Goods> => this.httpClient.post<Goods>(url, data, this.getOptions());
  put = (data: Goods): Observable<Goods> => this.httpClient.put<Goods>(url + data.id, data, this.getOptions());
  getCandidates = (keyword: string): Observable<Candidate[]> =>
    this.httpClient.get<Goods[]>(`${url}candidates/${keyword}`, this.getOptions());
  search = (keyword: string = "", pageIndex: number, pageSize: number): Observable<ApiModel<Goods>> => 
    this.httpClient.get<ApiModel<Goods>>(url, this.getSearchOptions(keyword, pageIndex, pageSize));

  private getAuthHeader = () => this.authenticationService.getHeader();
  private getOptions() { return { headers: this.getAuthHeader()}; }
  private getSearchOptions(keyword: string = "", pageIndex: number, pageSize: number)
  {
    return {
      params: new HttpParams().set("keyword", keyword).set("pageIndex", pageIndex.toString()).set("pageSize", pageSize.toString()),
      headers: this.getAuthHeader()
    };
  }
}
