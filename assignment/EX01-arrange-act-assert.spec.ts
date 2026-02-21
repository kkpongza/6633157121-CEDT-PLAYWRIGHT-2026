import { test, expect } from "@playwright/test";

test.describe("EX01 - Arrange Act Assert Login Tests", () => {
  const url = "https://katalon-demo-cura.herokuapp.com/profile.php#login";

  test("Verify login pass with valid user (John Doe)", async ({ page }) => {
    // Arrange
    await page.goto(url);
    const usernameInput = page.locator("#txt-username");
    const passwordInput = page.locator("#txt-password");
    const loginButton = page.locator("#btn-login");

    const validUsername = "John Doe";
    const validPassword = "ThisIsNotAPassword";

    // Act
    await usernameInput.fill(validUsername);
    await passwordInput.fill(validPassword);
    await loginButton.click();

    // Assert
    await expect(page).toHaveURL(/.*#appointment/);
    await expect(page.locator("h2")).toHaveText("Make Appointment");
  });

  test("Verify login fail with invalid password", async ({ page }) => {
    // Arrange
    await page.goto(url);
    const usernameInput = page.locator("#txt-username");
    const passwordInput = page.locator("#txt-password");
    const loginButton = page.locator("#btn-login");
    const errorMessage = page.locator(".text-danger");

    const validUsername = "John Doe";
    const invalidPassword = "WrongPassword123";

    // Act
    await usernameInput.fill(validUsername);
    await passwordInput.fill(invalidPassword);
    await loginButton.click();

    // Assert
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Login failed! Please ensure");
  });

  test("Verify login fail with invalid username", async ({ page }) => {
    // Arrange
    await page.goto(url);
    const usernameInput = page.locator("#txt-username");
    const passwordInput = page.locator("#txt-password");
    const loginButton = page.locator("#btn-login");
    const errorMessage = page.locator(".text-danger");

    const invalidUsername = "InvalidUser";
    const validPassword = "ThisIsNotAPassword";

    // Act
    await usernameInput.fill(invalidUsername);
    await passwordInput.fill(validPassword);
    await loginButton.click();

    // Assert
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText("Login failed! Please ensure");
  });
});
