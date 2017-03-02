import { DelaPage } from './app.po';

describe('dela App', () => {
  let page: DelaPage;

  beforeEach(() => {
    page = new DelaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dela works!');
  });
});
