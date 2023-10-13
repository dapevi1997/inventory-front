import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSuperadminComponent } from './navbar-superadmin.component';

describe('NavbarSuperadminComponent', () => {
  let component: NavbarSuperadminComponent;
  let fixture: ComponentFixture<NavbarSuperadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSuperadminComponent]
    });
    fixture = TestBed.createComponent(NavbarSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
