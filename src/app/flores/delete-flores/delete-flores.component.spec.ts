import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFloresComponent } from './delete-flores.component';

describe('DeleteFloresComponent', () => {
  let component: DeleteFloresComponent;
  let fixture: ComponentFixture<DeleteFloresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteFloresComponent]
    });
    fixture = TestBed.createComponent(DeleteFloresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
