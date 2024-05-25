import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFloresComponent } from './edit-flores.component';

describe('EditFloresComponent', () => {
  let component: EditFloresComponent;
  let fixture: ComponentFixture<EditFloresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFloresComponent]
    });
    fixture = TestBed.createComponent(EditFloresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
