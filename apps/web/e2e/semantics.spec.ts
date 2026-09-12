import { expect, test } from '@playwright/test';
import { expectNoConsoleErrors, failOnConsoleErrors, newEmail, signUp } from './helpers';

/**
 * The semantics, asserted in a real browser against the real accessibility tree.
 *
 * Everything here was found by reading the screens against the same flows in
 * other products and asking what each control announces, rather than what it
 * looks like. Every one of these defects rendered perfectly: the active tab was
 * the right colour and said nothing, the sliders were on screen and had no
 * names, the craving flow advanced and moved focus nowhere. That is the class
 * of defect this file exists to hold shut — it cannot be seen in a screenshot,
 * and no unit test in a Node environment can reach it.
 *
 * `getByRole` is used deliberately in place of CSS selectors. A selector asserts
 * that an element exists; a role query asserts that it is the thing it appears
 * to be. Where those two disagree is exactly where this product used to be
 * wrong.
 */

test.describe('landmarks and headings', () => {
  test('every screen has exactly one first-level heading', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('headings'));

    // The home screen was the only screen in the product with no heading at
    // all: the day count — the largest thing on it and the reason people open
    // it — was a paragraph.
    for (const path of ['/home', '/plan', '/patterns', '/rebuild', '/coach', '/settings']) {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    }

    expectNoConsoleErrors(errors);
  });

  test('the chrome is a banner and the tab bar is a named navigation', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('landmarks'));
    await page.goto('/home');

    // The header used to live inside <main>, which meant the app had a main
    // landmark and nothing else: there was no chrome to skip past, because as
    // far as the accessibility tree was concerned there was no chrome.
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: /huvudnavigering|main navigation/i }),
    ).toBeVisible();

    expectNoConsoleErrors(errors);
  });

  test('the current tab says it is current, not only looks it', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('current'));

    await page.goto('/patterns');
    const nav = page.getByRole('navigation', { name: /huvudnavigering|main navigation/i });
    // Exactly one, and the right one. data-active painted it accent-coloured
    // and told the accessibility tree nothing, so the current tab was obvious
    // to everyone who could see the colour and invisible to everyone who
    // could not.
    await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
    await expect(nav.locator('[aria-current="page"]')).toHaveAttribute('href', '/patterns');

    await page.goto('/rebuild');
    await expect(nav.locator('[aria-current="page"]')).toHaveAttribute('href', '/rebuild');

    expectNoConsoleErrors(errors);
  });
});

test.describe('controls have names', () => {
  test('every slider on the check-in screen says what it is rating', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('sliders'));
    await page.goto('/checkin');

    // Web-first, not a bare count(). This screen is a client component, so
    // counting straight after goto() races hydration — and it lost that race
    // once on this machine. A flaky assertion is one people learn to re-run
    // instead of read.
    const sliders = page.getByRole('slider');
    await expect(sliders.first()).toBeVisible();
    await expect(sliders).toHaveCount(4);
    const count = await sliders.count();

    // Four sliders on one screen, each previously announcing "slider, 5" — five
    // of what, on a screen that asks about mood, sleep, stress and craving. The
    // <label> was there and was tied to nothing.
    for (let i = 0; i < count; i += 1) {
      const slider = sliders.nth(i);
      const name = await slider.evaluate(
        (el) => (el as HTMLInputElement).labels?.[0]?.textContent ?? el.getAttribute('aria-label') ?? '',
      );
      expect(name.trim().length, `slider ${i} has no accessible name`).toBeGreaterThan(0);
      // And the value carries its scale rather than being a naked number.
      await expect(slider).toHaveAttribute('aria-valuetext', /\d+\s*(av|of)\s*10/);
    }

    expectNoConsoleErrors(errors);
  });

  test('a call link says who it calls, not just a string of digits', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await page.goto('/kris');

    const links = page.locator('a[href^="tel:"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i += 1) {
      const name = (await links.nth(i).getAttribute('aria-label')) ?? '';
      // "Ring Giftinformationscentralen på 010 456 67 00" rather than a number
      // read out digit by digit with no indication of who answers.
      expect(name, `tel link ${i} announces only its digits`).toMatch(/^(Ring|Call)\s+\S+/);
    }

    expectNoConsoleErrors(errors);
  });
});

test.describe('the craving flow is a flow', () => {
  test('each question takes focus, can be gone back from, and is a heading', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('cravingflow'));
    await page.goto('/craving');

    // Step 1 of 4 — the flow says where you are. Four screens that each show
    // one question and no context is what makes people stop halfway.
    await expect(page.getByText(/steg 1 av 4|step 1 of 4/i)).toBeVisible();

    await page.getByRole('button', { name: /^(nej|no)$/i }).click();

    // The question is a heading, and focus moved to it. Before this the markup
    // was swapped out from under whatever had focus, focus fell back to <body>,
    // and the new question was never announced at all.
    const question = page.getByRole('heading', { level: 2, name: /känner du|feeling/i });
    await expect(question).toBeVisible();
    await expect(question).toBeFocused();
    await expect(page.getByText(/steg 2 av 4|step 2 of 4/i)).toBeVisible();

    // The answers are a named group, so they are announced as answers to this
    // question rather than as a dozen loose buttons.
    await expect(page.getByRole('group', { name: /känner du|feeling/i })).toBeVisible();

    // A mis-tap is recoverable. Tapping a chip both answers and advances, which
    // is right for one unsteady hand — but it used to make every answer final.
    await page.getByRole('button', { name: /tillbaka|back/i }).click();
    await expect(page.getByRole('heading', { level: 2, name: /omedelbar fara|immediate danger/i })).toBeFocused();

    expectNoConsoleErrors(errors);
  });

  test('the intensity slider is labelled by the question it answers', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('intensity'));
    await page.goto('/craving');

    await page.getByRole('button', { name: /^(nej|no)$/i }).click();
    await page.getByRole('group').getByRole('button').first().click();
    await page.getByRole('group').getByRole('button').first().click();

    // "slider, 7" — seven of what, on the screen whose entire job is to ask how
    // bad it is right now.
    const slider = page.getByRole('slider', { name: /starkt är suget|strong is the craving|craving/i });
    await expect(slider).toBeVisible();
    await expect(slider).toHaveAttribute('aria-valuetext', /\d+\s*(av|of)\s*10/);

    expectNoConsoleErrors(errors);
  });

  test('logging an outcome is acknowledged, either way', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('outcome'));
    await page.goto('/craving');

    await page.getByRole('button', { name: /^(nej|no)$/i }).click();
    await page.getByRole('group').getByRole('button').first().click();
    await page.getByRole('group').getByRole('button').first().click();
    await page.getByRole('button', { name: /gör vi så här|here's what we do/i }).click();

    // The confirmation copy had been written, translated into both languages,
    // and rendered nowhere: pressing the button at the end of a craving did
    // nothing visible at all.
    await page.getByRole('button', { name: /stod emot|got through it/i }).click();
    await expect(page.getByRole('status')).toContainText(/loggat|logged/i);

    expectNoConsoleErrors(errors);
  });
});

test.describe('the conversation is a conversation', () => {
  test('the coach transcript is a log, and says who is speaking', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('coachlog'));
    await page.goto('/coach');

    // A running transcript that is added to. Before this the coach's reply
    // simply appeared and nothing was said about it at all.
    //
    // Attached rather than visible: an empty transcript has no height, which is
    // correct — there is nothing in it yet.
    const log = page.getByRole('log');
    await expect(log).toBeAttached();

    // The message box is the most used input in the product and had only a
    // placeholder, which is not a name: it goes away the moment somebody types.
    const box = page.getByRole('textbox', { name: /skriv ett meddelande|write a message/i });
    await expect(box).toBeVisible();

    await box.fill('Jag har sug just nu.');
    await page.getByRole('button', { name: /skicka|send/i }).click();
    await expect(log).toBeVisible();

    // Both turns are attributed. The bubbles were told apart by colour and
    // which side of the screen they sat on, so read aloud the conversation was
    // one undifferentiated voice.
    await expect(log).toContainText(/^(Du|You):/m);
    await expect(log.getByText(/(Coach):/).first()).toBeAttached();

    expectNoConsoleErrors(errors);
  });
});

test.describe('a save that fails says so', () => {
  /**
   * The check-in screen was the one that never adopted the shared action
   * helper, and it was written in exactly the shape that helper exists to
   * replace: try/finally with no catch. The request rejected with nobody
   * listening, the button stopped spinning, and the screen went back to looking
   * precisely as it had before — with everything the person had just written
   * about their night still on it and nothing to say none of it had saved.
   */
  test('a failed check-in is reported, not swallowed', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('checkinfail'));
    await page.goto('/checkin');

    await page.route('**/v1/checkins', (route) => route.abort('failed'));
    await page.getByRole('button', { name: /^(spara|save)$/i }).click();

    // Scoped to our banner: Next's own route announcer is also a role="alert",
    // sitting empty at the top of the document between navigations.
    const banner = page.locator('.error-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute('role', 'alert');
    // And the button has not claimed success.
    await expect(page.getByRole('button', { name: /sparat|saved/i })).toHaveCount(0);

    expectNoConsoleErrors(errors, [/Failed to load resource/, /net::ERR_FAILED/, /ERR_FAILED/]);
  });

  test('taking your own data out does not look like a failure', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('export'));
    await page.goto('/settings');

    await page.getByRole('button', { name: /export|exportera/i }).first().click();

    // "Your export is ready" was rendered in the red error banner, so the one
    // moment here where somebody successfully takes their own data with them
    // looked exactly like something had gone wrong.
    const notice = page.locator('.notice-banner');
    await expect(notice).toBeVisible();
    await expect(notice).toHaveAttribute('role', 'status');
    await expect(page.locator('.error-banner')).toHaveCount(0);

    expectNoConsoleErrors(errors);
  });
});

test.describe('the other writes that were being lost', () => {
  test('a failed rebuild status is reported, not swallowed', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('rebuildfail'));
    await page.goto('/rebuild');

    await page.route('**/v1/rebuild/**', (route) => route.abort('failed'));
    await page.locator('button.chip, .card button').first().click();

    const banner = page.locator('.error-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute('role', 'alert');

    expectNoConsoleErrors(errors, [/Failed to load resource/, /net::ERR_FAILED/, /ERR_FAILED/]);
  });

  /**
   * The screen for the hour before the craving, reached by pressing "I'm
   * struggling". Its catch set the reply to null, so a failed request left the
   * place where the coach's answer should have been simply empty, with nothing
   * to say the coach had been asked at all. Silence is the one response this
   * screen must never give.
   */
  test('an unreachable coach on the struggling screen still answers', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('strugglefail'));
    await page.goto('/struggling');

    await page.route('**/v1/coach/message', (route) => route.abort('failed'));
    await page.getByRole('button', { name: /stress/i }).first().click();

    await expect(page.getByRole('status')).toBeVisible();
    // And the three cheapest things are still there, as they always were.
    await expect(page.getByRole('heading', { level: 2 }).first()).toBeVisible();

    expectNoConsoleErrors(errors, [/Failed to load resource/, /net::ERR_FAILED/, /ERR_FAILED/]);
  });
});

test.describe('a screen that cannot load says so', () => {
  /**
   * The worst of this class. The relapse questions came from the API, the
   * failure was swallowed, and the screen was gated on having them — so a
   * request that never came back left somebody who had just relapsed looking
   * at the word "Loading…" indefinitely. No error, no retry, and no way
   * forward: the safety questions and the route to the emergency numbers were
   * both inside markup that never rendered.
   *
   * The endpoint was a pure function of locale over constants already in the
   * bundle, so it is gone. This screen now works with the API unreachable.
   */
  test('the relapse screen works with the API down', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('relapseoffline'));

    await page.route('**/v1/**', (route) => route.abort('failed'));
    await page.goto('/relapse');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // The safety gate, which is the whole reason this screen opens on it.
    await expect(
      page.getByRole('heading', { name: /är du säker|are you safe/i }),
    ).toBeVisible();
    // And the way to the emergency numbers.
    await expect(page.locator('a[href="/craving"]')).toBeVisible();

    expectNoConsoleErrors(errors, [/Failed to load resource/, /net::ERR_FAILED/, /ERR_FAILED/]);
  });

  test('an empty toolbox says whether it failed or is simply empty', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('toolboxfail'));

    await page.route('**/v1/toolbox', (route) => route.abort('failed'));
    await page.goto('/toolbox');

    // This screen is the list of things that help. Emptying it on a failed
    // request tells somebody who came looking for one that they have none.
    const banner = page.locator('.error-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toHaveAttribute('role', 'alert');

    expectNoConsoleErrors(errors, [/Failed to load resource/, /net::ERR_FAILED/, /ERR_FAILED/]);
  });

  test('a failed patterns load is not shown as having no patterns', async ({ page }) => {
    const errors = failOnConsoleErrors(page);
    await signUp(page, newEmail('patternsfail'));

    await page.route('**/v1/dashboard', (route) => route.abort('failed'));
    await page.goto('/patterns');

    await expect(page.locator('.error-banner')).toBeVisible();

    expectNoConsoleErrors(errors, [/Failed to load resource/, /net::ERR_FAILED/, /ERR_FAILED/]);
  });
});
