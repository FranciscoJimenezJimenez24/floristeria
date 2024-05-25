import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRamosComponent } from './edit-ramos.component';

describe('EditRamosComponent', () => {
  let component: EditRamosComponent;
  let fixture: ComponentFixture<EditRamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRamosComponent]
    });
    fixture = TestBed.createComponent(EditRamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
