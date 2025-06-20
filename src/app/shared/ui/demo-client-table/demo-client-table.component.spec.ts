import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoClientTableComponent } from './demo-client-table.component';

describe('DemoClientTableComponent', () => {
  let component: DemoClientTableComponent;
  let fixture: ComponentFixture<DemoClientTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoClientTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoClientTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
