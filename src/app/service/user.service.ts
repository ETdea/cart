import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './model/user';
import { retry } from 'rxjs/operators/retry';
import { keyframes } from '@angular/animations/src/animation_metadata';
import { catchError, map } from 'rxjs/operators';
import { ApiModel } from './model/apiModel'
import { AuthenticationService } from './authentication.service';

// const url = "https://tpeyichangapi.azurewebsites.net/api/users/";
const url = "/api/users/";

@Injectable()
export class UserService {
  constructor(public httpClient: HttpClient,
    public authenticationService: AuthenticationService) { }

  find = (id: string): Observable<User> => this.httpClient.get<User>(url + id, this.getOptions()); 
  post = (data: User): Observable<User> => this.httpClient.post<User>(url, data, this.getOptions());
  put = (data: User): Observable<User> => this.httpClient.put<User>(url + data.id, data, this.getOptions());
  search = (keyword: string = "", pageIndex: number, pageSize: number): Observable<ApiModel<User>> => 
    this.httpClient.get<ApiModel<User>>(url, this.getSearchOptions(keyword, pageIndex, pageSize));

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
