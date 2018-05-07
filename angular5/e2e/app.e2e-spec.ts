import { AppPage } from './app.po';

describe('charting-library-angular5 App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('TradingView Charting Library and Angular 5 Integration Example');
  });
});
