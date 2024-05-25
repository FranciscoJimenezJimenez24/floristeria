import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamosComponent } from './ramos.component';

describe('RamosComponent', () => {
  let component: RamosComponent;
  let fixture: ComponentFixture<RamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RamosComponent]
    });
    fixture = TestBed.createComponent(RamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
