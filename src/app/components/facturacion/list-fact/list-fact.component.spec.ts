import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFactComponent } from './list-fact.component';

describe('ListFactComponent', () => {
  let component: ListFactComponent;
  let fixture: ComponentFixture<ListFactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
