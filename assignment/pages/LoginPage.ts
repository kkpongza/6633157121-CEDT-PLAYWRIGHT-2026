import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('#txt-username');
    this.password = page.locator('#txt-password');
    this.loginBtn = page.locator('#btn-login');
  }

  async goto() {
    // uses baseURL from config + absolute path
    await this.page.goto('/profile.php#login');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/#appointment/);
  }
}