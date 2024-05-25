import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRamosComponent } from './delete-ramos.component';

describe('DeleteRamosComponent', () => {
  let component: DeleteRamosComponent;
  let fixture: ComponentFixture<DeleteRamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRamosComponent]
    });
    fixture = TestBed.createComponent(DeleteRamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
