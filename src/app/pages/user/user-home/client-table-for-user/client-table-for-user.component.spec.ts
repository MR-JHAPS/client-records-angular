import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTableForUserComponent } from './client-table-for-user.component';

describe('ClientTableForUserComponent', () => {
  let component: ClientTableForUserComponent;
  let fixture: ComponentFixture<ClientTableForUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTableForUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientTableForUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
