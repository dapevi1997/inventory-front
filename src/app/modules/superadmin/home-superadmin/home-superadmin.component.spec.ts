import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuperadminComponent } from './home-superadmin.component';

describe('HomeSuperadminComponent', () => {
  let component: HomeSuperadminComponent;
  let fixture: ComponentFixture<HomeSuperadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSuperadminComponent]
    });
    fixture = TestBed.createComponent(HomeSuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
