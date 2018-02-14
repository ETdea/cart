import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ChangePassword } from '../service/model/login';
import { ChangePasswordDialog } from './change-password/change-password.dailog';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private authenticationService: AuthenticationService) { }

  user = this.authenticationService.user;
  dialog: MatDialogRef<ChangePasswordDialog>;

  openDialog(data: ChangePassword = null): this { this.dialog = this.matDialog.open(ChangePasswordDialog, { data: data }); return this; }
  

  ngOnInit() {
  }

  logoutButtonClick() {
    this.authenticationService.logout();
    this.router.navigateByUrl("/login");
  }

  changePasswordButtonClick() {
    this.openDialog();
    this.dialog.afterClosed().subscribe(dialogData => {
      this.authenticationService.changePassword(dialogData).subscribe();
    });
  }

  onClick(url: string) {
    this.router.navigateByUrl(url);
  }
}
