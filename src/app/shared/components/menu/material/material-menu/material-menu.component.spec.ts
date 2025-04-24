import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMenuComponent } from './material-menu.component';

describe('MaterialMenuComponent', () => {
  let component: MaterialMenuComponent;
  let fixture: ComponentFixture<MaterialMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialMenuComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
