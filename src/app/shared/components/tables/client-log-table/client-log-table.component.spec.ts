import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLogTableComponent } from './client-log-table.component';

describe('ClientLogTableComponent', () => {
  let component: ClientLogTableComponent;
  let fixture: ComponentFixture<ClientLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLogTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
