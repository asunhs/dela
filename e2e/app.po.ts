import { browser, element, by } from 'protractor';

export class DelaPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dela-root h1')).getText();
  }
}
