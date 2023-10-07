import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAdminComponent } from './sales-admin.component';

describe('SalesAdminComponent', () => {
  let component: SalesAdminComponent;
  let fixture: ComponentFixture<SalesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesAdminComponent]
    });
    fixture = TestBed.createComponent(SalesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
