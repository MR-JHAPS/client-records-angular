import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDeleteButtonComponent } from './dynamic-delete-button.component';

describe('DynamicDeleteButtonComponent', () => {
  let component: DynamicDeleteButtonComponent;
  let fixture: ComponentFixture<DynamicDeleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDeleteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicDeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
