import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsDialog } from './goods.dialog';

describe('AddedGoodsDialogComponent', () => {
  let component: GoodsDialog;
  let fixture: ComponentFixture<GoodsDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
