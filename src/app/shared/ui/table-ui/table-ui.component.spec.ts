import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUIComponent } from './table-ui.component';

describe('TableUIComponent', () => {
  let component: TableUIComponent;
  let fixture: ComponentFixture<TableUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
