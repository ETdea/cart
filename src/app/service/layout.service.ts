import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { transformMenu } from '@angular/material/menu/typings/menu-animations';

@Injectable()
export class LayoutService {
  private isMatch = (value: string) : Observable<boolean> => this.BreakpointObserver.observe(value).map(match => match.matches);

  isHandset$ = this.isMatch(Breakpoints.Handset);
  isTablet$ = this.isMatch(Breakpoints.Tablet);
  isWeb$ = this.isMatch(Breakpoints.Web);
  isHandsetPortrait$ = this.isMatch(Breakpoints.HandsetPortrait);
  isTabletPortrait$ = this.isMatch(Breakpoints.TabletPortrait);
  isWebPortrait$ = this.isMatch(Breakpoints.WebPortrait);
  isHandsetLandscape$ = this.isMatch(Breakpoints.HandsetLandscape);
  isTabletLandscape$ = this.isMatch(Breakpoints.TabletLandscape);
  isWebLandscape$ = this.isMatch(Breakpoints.WebLandscape);

  constructor(public BreakpointObserver: BreakpointObserver) { }

}