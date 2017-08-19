import { OnlineGroceryPage } from './app.po';

describe('online-grocery App', () => {
  let page: OnlineGroceryPage;

  beforeEach(() => {
    page = new OnlineGroceryPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
