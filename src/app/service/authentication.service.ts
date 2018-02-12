import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { Login, UserInfo } from './model/login';

const StorageKey = "currentUser";
// const url = "https://tpeyichangapi.azurewebsites.net/api/account/login";
const url = "/api/account/login/";

@Injectable()
export class AuthenticationService {
    constructor(private httpClient: HttpClient, private config: AppConfig) { }

    getUser = (): UserInfo => JSON.parse(localStorage.getItem(StorageKey));
    // getUserName = (): string => this.getUser().name;
    // getIsAdmin = (): boolean => this.getUser().isAdmin;
    getHeader = (): HttpHeaders => new HttpHeaders({ 'Authorization': 'Bearer ' + this.getUser().token });
    logout = (): void => localStorage.removeItem(StorageKey);

    login = (data: Login) => this.httpClient.post<UserInfo>(url, data)
        .map(result => { localStorage.setItem(StorageKey, JSON.stringify(result)); });
}