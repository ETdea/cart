import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialog } from './user.dialog';

describe('UserDialogComponent', () => {
  let component: UserDialog;
  let fixture: ComponentFixture<UserDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
