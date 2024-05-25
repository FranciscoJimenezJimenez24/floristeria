import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFloresComponent } from './add-flores.component';

describe('AddFloresComponent', () => {
  let component: AddFloresComponent;
  let fixture: ComponentFixture<AddFloresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFloresComponent]
    });
    fixture = TestBed.createComponent(AddFloresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
