import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerIconsComponent } from './marker-icons.component';

describe('MarkerIconsComponent', () => {
  let component: MarkerIconsComponent;
  let fixture: ComponentFixture<MarkerIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [MarkerIconsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
