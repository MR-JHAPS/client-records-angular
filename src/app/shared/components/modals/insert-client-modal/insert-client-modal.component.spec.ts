import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertClientModalComponent } from './insert-client-modal.component';

describe('InsertClientModalComponent', () => {
  let component: InsertClientModalComponent;
  let fixture: ComponentFixture<InsertClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertClientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
