import { LtMvpWebappPage } from './app.po';

describe('lt-mvp-webapp App', function() {
  let page: LtMvpWebappPage;

  beforeEach(() => {
    page = new LtMvpWebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
