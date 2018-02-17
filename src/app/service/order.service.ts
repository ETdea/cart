import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Order } from './model/order'
import { ApiModel } from './model/apiModel'
import { AuthenticationService } from './authentication.service';

// const url = "https://tpeyichangapi.azurewebsites.net/api/orders/";
// const url = "http://localhost:5000/Orders/";
const url = "/api/Orders/";

@Injectable()
export class OrderService {

  constructor(public httpClient: HttpClient,
            public authenticationService: AuthenticationService) { }

  Get = (): Observable<ApiModel<Order>> => this.httpClient.get<ApiModel<Order>>(url, this.getOptions());
  post = (data): Observable<Order> => this.httpClient.post<Order>(url, data, this.getOptions());

  private getAuthHeader = () => this.authenticationService.getHeader();
  private getOptions() { return { headers: this.getAuthHeader()}; }
}
