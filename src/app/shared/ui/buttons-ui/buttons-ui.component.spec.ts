import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsUiComponent } from './buttons-ui.component';

describe('ButtonsUiComponent', () => {
  let component: ButtonsUiComponent;
  let fixture: ComponentFixture<ButtonsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
