import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloresComponent } from './flores.component';

describe('FloresComponent', () => {
  let component: FloresComponent;
  let fixture: ComponentFixture<FloresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloresComponent]
    });
    fixture = TestBed.createComponent(FloresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
