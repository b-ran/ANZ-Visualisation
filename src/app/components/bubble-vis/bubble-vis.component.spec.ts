import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleVisComponent } from './bubble-vis.component';

describe('BubbleVisComponent', () => {
  let component: BubbleVisComponent;
  let fixture: ComponentFixture<BubbleVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
