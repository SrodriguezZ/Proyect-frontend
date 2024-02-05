import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroproductosComponent } from './cuadroproductos.component';

describe('CuadroproductosComponent', () => {
  let component: CuadroproductosComponent;
  let fixture: ComponentFixture<CuadroproductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuadroproductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuadroproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
