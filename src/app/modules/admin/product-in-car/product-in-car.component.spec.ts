import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInCarComponent } from './product-in-car.component';

describe('ProductInCarComponent', () => {
  let component: ProductInCarComponent;
  let fixture: ComponentFixture<ProductInCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInCarComponent]
    });
    fixture = TestBed.createComponent(ProductInCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
