import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvChartContainerComponent } from './tv-chart-container.component';

describe('TvChartContainerComponent', () => {
  let component: TvChartContainerComponent;
  let fixture: ComponentFixture<TvChartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TvChartContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvChartContainerComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
