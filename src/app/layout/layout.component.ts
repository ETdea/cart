import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  buttonClick() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/login");
  }

  onClick(url: string){
    this.router.navigateByUrl(url);
  }
}
