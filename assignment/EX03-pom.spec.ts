import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { AppointmentPage } from "./pages/AppointmentPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";

test.describe("EX03 - Make Appointment Success (POM)", () => {
  const username = "John Doe";
  const password = "ThisIsNotAPassword";

  test("Make appointment successfully", async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);
    const confirmationPage = new ConfirmationPage(page);

    // Act: login
    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.assertLoggedIn();

    // Act: fill appointment form
    await appointmentPage.assertOnPage();

    await appointmentPage.selectFacility("Tokyo CURA Healthcare Center");
    await appointmentPage.setReadmission(true);
    await appointmentPage.selectProgram("Medicare");

    await appointmentPage.setVisitDateByPickingAnyDay();
    await appointmentPage.setComment("Make appointment via POM test");
    await appointmentPage.assertBookButtonReady();

    // Act: submit
    await appointmentPage.bookAppointment();

    // Assert: confirmation page
    await confirmationPage.assertConfirmed();
  });
});
