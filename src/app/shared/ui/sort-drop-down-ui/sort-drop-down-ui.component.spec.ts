import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDropDownUiComponent } from './sort-drop-down-ui.component';

describe('SortDropDownUiComponent', () => {
  let component: SortDropDownUiComponent;
  let fixture: ComponentFixture<SortDropDownUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortDropDownUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortDropDownUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
