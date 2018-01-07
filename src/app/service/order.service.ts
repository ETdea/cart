import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const url = "/assets/mocks/goods.json";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  post(data) {

  }
}
