import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRamosComponent } from './add-ramos.component';

describe('AddRamosComponent', () => {
  let component: AddRamosComponent;
  let fixture: ComponentFixture<AddRamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRamosComponent]
    });
    fixture = TestBed.createComponent(AddRamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
