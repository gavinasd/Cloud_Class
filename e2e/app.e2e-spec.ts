import { ClouldClassPage } from './app.po';

describe('clould-class App', function() {
  let page: ClouldClassPage;

  beforeEach(() => {
    page = new ClouldClassPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
