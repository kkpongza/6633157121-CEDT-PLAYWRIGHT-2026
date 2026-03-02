import { test, expect } from '@playwright/test';

test.describe('EX02 - Assertions (using fixtures)', () => {
  const loginUrl = 'https://katalon-demo-cura.herokuapp.com/profile.php#login';
  const username = 'John Doe';
  const password = 'ThisIsNotAPassword';

  test.beforeEach(async ({ page }) => {
    // Arrange: go to login and sign in
    await page.goto(loginUrl);
    await page.getByLabel('Username').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert we are on Make Appointment page
    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  });

  test('Verify that make appointment page display “Make Appointment” in h2.', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Make Appointment');
    await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
  });

  test('Verify that can select all facility combo boxes', async ({ page }) => {
    const facility = page.getByLabel('Facility');

    await expect(facility).toBeVisible();
    await expect(facility).toBeEnabled();

    await facility.selectOption('Tokyo CURA Healthcare Center');
    await expect(facility).toHaveValue('Tokyo CURA Healthcare Center');

    await facility.selectOption('Hongkong CURA Healthcare Center');
    await expect(facility).toHaveValue('Hongkong CURA Healthcare Center');

    await facility.selectOption('Seoul CURA Healthcare Center');
    await expect(facility).toHaveValue('Seoul CURA Healthcare Center');
  });

  test('Verify that can select apply for hospital readmission checkbox', async ({ page }) => {
    const readmission = page.getByRole('checkbox', { name: 'Apply for hospital readmission' });

    await expect(readmission).toBeVisible();
    await expect(readmission).toBeEnabled();

    await readmission.check();
    await expect(readmission).toBeChecked();

    // optional: verify toggle works
    await readmission.uncheck();
    await expect(readmission).not.toBeChecked();

    await readmission.check();
    await expect(readmission).toBeChecked();
  });

  test('Verify that can select health care program radio button', async ({ page }) => {
    const medicare = page.getByRole('radio', { name: 'Medicare' });
    const medicaid = page.getByRole('radio', { name: 'Medicaid' });
    const none = page.getByRole('radio', { name: 'None' });

    await expect(medicare).toBeVisible();
    await expect(medicaid).toBeVisible();
    await expect(none).toBeVisible();

    await medicare.check();
    await expect(medicare).toBeChecked();

    await medicaid.check();
    await expect(medicaid).toBeChecked();

    await none.check();
    await expect(none).toBeChecked();
  });

  test('Verify that can input current date on Visit Date', async ({ page }) => {
    const visitDate = page.getByRole('textbox', { name: 'Visit Date (Required)' });

    // Use a deterministic "today" format (MM/DD/YYYY) that CURA accepts when typing
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = String(now.getFullYear());
    const today = `${mm}/${dd}/${yyyy}`;

    await expect(visitDate).toBeVisible();
    await expect(visitDate).toBeEnabled();

    // Clear then fill to avoid leftover value
    await visitDate.fill('');
    await visitDate.fill(today);

    await expect(visitDate).toHaveValue(today);
  });

  test('Verify that can input comment', async ({ page }) => {
    const comment = page.getByRole('textbox', { name: 'Comment' });
    const text = 'asdasdasd';

    await expect(comment).toBeVisible();
    await expect(comment).toBeEnabled();

    await comment.fill(text);
    await expect(comment).toHaveValue(text);
  });

  test('Verify that book appointment button is displayed and enabled.', async ({ page }) => {
    const bookBtn = page.getByRole('button', { name: 'Book Appointment' });

    await expect(bookBtn).toBeVisible();
    await expect(bookBtn).toBeEnabled();
  });
});

