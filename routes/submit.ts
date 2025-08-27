import type { HttpBinSubmitRequest, HttpBinSubmitResponse } from '../types/submit.types';
import { chromium, type Page, type Browser } from 'playwright';

const HTTPBIN_FORM_URL = 'https://httpbin.org/forms/post';
const HTTPBIN_POST_PATH = '/post';
const REQUIRED_FIELDS = ['custname', 'custtel', 'custemail', 'size', 'delivery'] as const;

/**
 * Submit pizza order form to httpbin.org/forms/post via Playwright.
 * - Simulates actual browser interaction.
 * - Validates input shape before interacting with the browser.
 * - Validates httpbin response shape before returning.
 * Input: form - HttpBinSubmitRequest (all required fields must be present)
 * Ouput: returns httpbin.org POST response as JSON
 * Throws: On browser, navigation, form, or network errors.
 */

export async function submitOrder( form: HttpBinSubmitRequest): Promise<HttpBinSubmitResponse> {
  /** Validate Input Shape */
  for (const field of REQUIRED_FIELDS) {
    if (!(field in form) || !form[field as keyof HttpBinSubmitRequest]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  let browser: Browser | undefined;
  try {
    /** Navigate to the form page */
    browser = await chromium.launch();
    const page: Page = await browser.newPage();
    await page.goto(HTTPBIN_FORM_URL, { waitUntil: 'domcontentloaded' });

    /** Fill out the form */
    await page.fill('input[name="custname"]', form.custname);
    await page.fill('input[name="custtel"]', form.custtel);
    await page.fill('input[name="custemail"]', form.custemail);
    await page.check(`input[type="radio"][name="size"][value="${form.size}"]`);
    if (form.topping && form.topping.length) {
      for (const topping of form.topping) {
        await page.check(
          `input[type="checkbox"][name="topping"][value="${topping}"]`,
        );
      }
    }
    await page.fill('input[name="delivery"]', form.delivery);
    if (form.comments && form.comments.length) {
      await page.fill('textarea[name="comments"]', form.comments);
    }

    /** Submit the form */
    await Promise.all([
      page.waitForURL(`**${HTTPBIN_POST_PATH}`), // wait for the POST response page
      page.click('text=Submit order'), // click the submit button, submit is the only button and is only labeled with text
    ]);

    /** Extract the response JSON from the resulting page, validate and return it. */
    const pre = await page.locator('pre').textContent(); // The response body is presented inside a <pre> element on httpbin
    if (!pre) {
      throw new Error('No response <pre> found on POST result page.');
    }
    let json: unknown;
    try {
      json = JSON.parse(pre);
    } catch (err) {
      throw new Error(`Failed to parse JSON from httpbin response. Error: ${(err as Error).message}`);
    }
    if (!json || typeof json !== 'object') {
      throw new Error('httpbin.org returned unexpected response structure.');
    }
    return json as HttpBinSubmitResponse;
    
  } catch (err) {
    throw new Error(`Failed to submit order: ${(err as Error).message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
