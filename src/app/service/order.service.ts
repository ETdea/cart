import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from './model/order'
import { ApiModel } from './model/apiModel'

const url = "https://tpeyichangapi.azurewebsites.net/api/orders/";
// const url = "http://localhost:5000/Orders/";
// const url = "/api/Orders/";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  Get(): Observable<ApiModel<Order>> { return this.httpClient.get<ApiModel<Order>>(url)}
  post(data): Observable<Order> { return this.httpClient.post<Order>(url, data);}
}
