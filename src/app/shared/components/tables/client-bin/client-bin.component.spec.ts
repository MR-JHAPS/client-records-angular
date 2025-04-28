import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBinComponent } from './client-bin.component';

describe('ClientBinComponent', () => {
  let component: ClientBinComponent;
  let fixture: ComponentFixture<ClientBinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientBinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
