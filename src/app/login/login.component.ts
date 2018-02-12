import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Login } from '../service/model/login';

// import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    form = this.formBuilder.group({
        userName: ["", Validators.required],
        password: ["", Validators.required]
    });

    isLoading = false;


    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        // private alertService: AlertService
    ) { }



    buttonClick() {
        this.isLoading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                let snackBarRef = this.snackBar.open("帳號或密碼錯誤", "", { duration: 3000 });
                let data = new Login();
                data.userName = this.form.value.userName;
                this.form.reset(data);
                this.isLoading = false;
            });
    }

    ngOnInit() {



        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
}