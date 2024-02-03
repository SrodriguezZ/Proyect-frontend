import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamproductosComponent } from './famproductos.component';

describe('FamproductosComponent', () => {
  let component: FamproductosComponent;
  let fixture: ComponentFixture<FamproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FamproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FamproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
