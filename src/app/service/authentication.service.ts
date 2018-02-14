import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { Login, UserInfo, ChangePassword } from './model/login';

const StorageKey = "currentUser";
// const url = "https://tpeyichangapi.azurewebsites.net/api/account/login";
const url = "/api/account/";

@Injectable()
export class AuthenticationService {
    constructor(private httpClient: HttpClient, private config: AppConfig) { }

    get user(): UserInfo { return JSON.parse(localStorage.getItem(StorageKey)); }
    getHeader = (): HttpHeaders => new HttpHeaders({ 'Authorization': 'Bearer ' + this.user.token });
    logout = (): void => localStorage.removeItem(StorageKey);

    login = (data: Login) => this.httpClient.post<UserInfo>(url + "login", data)
        .map(result => { localStorage.setItem(StorageKey, JSON.stringify(result)); });

    changePassword = (data: ChangePassword) => this.httpClient.post(url + "ChangePassword", data, this.options);
    
    private get options() { return { headers: this.getHeader()}; }
}