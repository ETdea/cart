import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { Login } from './model/login';
import { User } from './model/user';

const StorageKey = "currentUser";

@Injectable()
export class AuthenticationService {
    constructor(private httpClient: HttpClient, private config: AppConfig) { }
    
    private getUser = (): User => JSON.parse(localStorage.getItem(StorageKey));
    getUserName = (): string => this.getUser.name;
    getHeader = (): HttpHeaders => new HttpHeaders({ 'Authorization': 'Bearer ' + this.getUser().token });
    logout = (): void => localStorage.removeItem(StorageKey);

    login(userName: string, password: string) {


        // return this.httpClient.post(this.config.apiUrl + '/users/authenticate', { username: userName, password: password })
        //     .map((response: Response) => {
        //         let user = response.json();
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //         }
        //     });
        return this.httpClient.get("/assets/mocks/goods.json").map(() => {
            let user = new User();
            user.name = "testUser";
            user.token = "I am token";

            localStorage.setItem(StorageKey, JSON.stringify(user));
        }
        );
    }
}