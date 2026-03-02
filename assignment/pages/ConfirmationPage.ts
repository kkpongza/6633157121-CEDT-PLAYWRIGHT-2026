import { expect, type Locator, type Page } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h2');
  }

  async assertConfirmed() {
    await expect(this.heading).toHaveText('Appointment Confirmation');
  }
}