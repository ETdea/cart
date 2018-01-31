import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// const url = "https://tpeyichangapi.azurewebsites.net/goods/";
const url = "http://localhost:55556/orders/";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  post(data): Observable<any>{
    let result = this.httpClient.post<any>(url, data);
    return result;
  }
}
