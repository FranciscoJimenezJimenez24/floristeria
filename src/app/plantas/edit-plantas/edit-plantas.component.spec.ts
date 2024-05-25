import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlantasComponent } from './edit-plantas.component';

describe('EditPlantasComponent', () => {
  let component: EditPlantasComponent;
  let fixture: ComponentFixture<EditPlantasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPlantasComponent]
    });
    fixture = TestBed.createComponent(EditPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
