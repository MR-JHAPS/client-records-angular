import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionUiComponent } from './accordion-ui.component';

describe('AccordionUiComponent', () => {
  let component: AccordionUiComponent;
  let fixture: ComponentFixture<AccordionUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
