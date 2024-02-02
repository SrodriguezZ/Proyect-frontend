import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthregisterComponent } from './authregister.component';

describe('AuthregisterComponent', () => {
  let component: AuthregisterComponent;
  let fixture: ComponentFixture<AuthregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
