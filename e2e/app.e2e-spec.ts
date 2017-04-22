import { LtMvpWebappNg4Page } from './app.po';

describe('lt-mvp-webapp App', () => {
  let page: LtMvpWebappNg4Page;

  beforeEach(() => {
    page = new LtMvpWebappNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
