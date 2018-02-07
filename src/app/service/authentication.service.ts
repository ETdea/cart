import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { Login } from './model';

@Injectable()
export class AuthenticationService {
    constructor(private httpClient: HttpClient, private config: AppConfig) { }

    login(userName: string, password: string) {


        // return this.httpClient.post(this.config.apiUrl + '/users/authenticate', { username: userName, password: password })
        //     .map((response: Response) => {
        //         let user = response.json();
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //         }
        //     });
        return this.httpClient.get("/assets/mocks/goods.json").map( () =>
            {
                localStorage.setItem('currentUser', "testset");
            }
        );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}