import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogAddressComponent } from './user-dialog-address.component';

describe('UserDialogAddressComponent', () => {
  let component: UserDialogAddressComponent;
  let fixture: ComponentFixture<UserDialogAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDialogAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
