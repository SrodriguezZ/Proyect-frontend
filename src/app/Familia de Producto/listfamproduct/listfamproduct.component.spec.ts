import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfamproductComponent } from './listfamproduct.component';

describe('ListfamproductComponent', () => {
  let component: ListfamproductComponent;
  let fixture: ComponentFixture<ListfamproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListfamproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListfamproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
