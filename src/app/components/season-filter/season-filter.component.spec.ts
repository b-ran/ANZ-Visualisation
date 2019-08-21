import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonFilterComponent } from './season-filter.component';

describe('SeasonFilterComponent', () => {
  let component: SeasonFilterComponent;
  let fixture: ComponentFixture<SeasonFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
