import { expect, type Locator, type Page } from "@playwright/test";

export class AppointmentPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly facility: Locator;
  readonly readmission: Locator;
  readonly medicare: Locator;
  readonly medicaid: Locator;
  readonly none: Locator;
  readonly visitDate: Locator;
  readonly comment: Locator;
  readonly bookBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator("h2");

    this.facility = page.locator("#combo_facility");
    this.readmission = page.locator("#chk_hospotal_readmission");

    this.medicare = page.locator("#radio_program_medicare");
    this.medicaid = page.locator("#radio_program_medicaid");
    this.none = page.locator("#radio_program_none");

    this.visitDate = page.locator("#txt_visit_date");
    this.comment = page.locator("#txt_comment");
    this.bookBtn = page.locator("#btn-book-appointment");
  }

  async assertOnPage() {
    await expect(this.page).toHaveURL(/#appointment/);
    await expect(this.heading).toHaveText("Make Appointment");
  }

  async selectFacility(
    value:
      | "Tokyo CURA Healthcare Center"
      | "Hongkong CURA Healthcare Center"
      | "Seoul CURA Healthcare Center",
  ) {
    await this.facility.selectOption({ value });
    await expect(this.facility).toHaveValue(value);
  }

  async setReadmission(on: boolean) {
    if (on) await this.readmission.check();
    else await this.readmission.uncheck();
    await expect(this.readmission).toHaveJSProperty("checked", on);
  }

  async selectProgram(program: "Medicare" | "Medicaid" | "None") {
    const map = {
      Medicare: this.medicare,
      Medicaid: this.medicaid,
      None: this.none,
    } as const;

    await map[program].check();
    await expect(map[program]).toBeChecked();
  }

  async setVisitDateByPickingAnyDay() {
    // Open the datepicker
    await this.visitDate.click();

    // Pick a valid day in the current month:
    // - exclude old/new (days from prev/next month)
    // - exclude disabled
    const day = this.page
      .locator(".datepicker-days td.day:not(.old):not(.new):not(.disabled)")
      .first();

    await expect(day).toBeVisible();
    await day.click();

    // Ensure date got set
    await expect(this.visitDate).not.toHaveValue("");

    // Click comment to close calendar + commit value (important on this site)
    await this.comment.click();
  }

  async setComment(text: string) {
    await this.comment.click(); // click to close calendar popup
    await this.comment.fill(text); // type comment
    await expect(this.comment).toHaveValue(text);
  }

  async assertBookButtonReady() {
    await expect(this.bookBtn).toBeVisible();
    await expect(this.bookBtn).toBeEnabled();
  }

  async bookAppointment() {
    await this.bookBtn.click();
  }
}
