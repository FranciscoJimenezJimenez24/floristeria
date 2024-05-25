import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlantasComponent } from './delete-plantas.component';

describe('DeletePlantasComponent', () => {
  let component: DeletePlantasComponent;
  let fixture: ComponentFixture<DeletePlantasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePlantasComponent]
    });
    fixture = TestBed.createComponent(DeletePlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
