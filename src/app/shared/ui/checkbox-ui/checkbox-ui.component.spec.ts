import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxUiComponent } from './checkbox-ui.component';

describe('CheckboxUiComponent', () => {
  let component: CheckboxUiComponent;
  let fixture: ComponentFixture<CheckboxUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
