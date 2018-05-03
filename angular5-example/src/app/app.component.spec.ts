import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TvChartContainerComponent } from './tv-chart-container/tv-chart-container.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TvChartContainerComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'TradingView Charting Library and Angular 5 Integration Example'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TradingView Charting Library and Angular 5 Integration Example');
  }));
});
