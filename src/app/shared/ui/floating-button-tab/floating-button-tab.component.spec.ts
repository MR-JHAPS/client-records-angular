import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingButtonTabComponent } from './floating-button-tab.component';

describe('FloatingButtonTabComponent', () => {
  let component: FloatingButtonTabComponent;
  let fixture: ComponentFixture<FloatingButtonTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingButtonTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingButtonTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
