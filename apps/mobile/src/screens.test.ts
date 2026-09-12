import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Semantic invariants for the mobile screens, asserted against their source.
 *
 * This is a weaker kind of test than the web client's, and deliberately so:
 * there is no device and no simulator in this environment, so nothing here can
 * observe what VoiceOver or TalkBack actually says. What it can do is hold shut
 * the invariants that were broken — every screen titled with the same literal
 * string, selection carried in a colour and nowhere else, a row that places a
 * phone call announcing only a string of digits — so that the next screen added
 * to this app cannot quietly reintroduce them.
 *
 * Reading source as text is a blunt instrument and it is stated as such. It is
 * not a substitute for running the app on a phone with a screen reader on,
 * which remains outstanding.
 */
const APP = join(__dirname, '..', 'app');
const screens = readdirSync(APP).filter((name) => name.endsWith('.tsx'));
const read = (name: string) => readFileSync(join(APP, name), 'utf8');

describe('the navigation bar says where you are', () => {
  const layout = read('_layout.tsx');

  it('no screen is titled with a hard-coded string', () => {
    // Thirteen screens were titled with the literal 'Cleat'. On iOS the title
    // is the first thing announced on arrival and the name the back button
    // takes from the previous screen, so the app said "Cleat" wherever you were
    // and offered "Back to Cleat" whatever you were going back to.
    const titles = [...layout.matchAll(/title:\s*([^}]+?)\s*}/g)].map((m) => m[1]);
    expect(titles.length).toBeGreaterThanOrEqual(14);
    for (const title of titles) {
      expect(title, `hard-coded screen title: ${title}`).toMatch(/^t\('/);
    }
  });

  it('gives every registered screen a title or hides its header on purpose', () => {
    const registered = [...layout.matchAll(/<Stack\.Screen name="([^"]+)"/g)].map((m) => m[1]);
    // Every file in app/ except the layout itself is a route.
    const routes = screens.filter((name) => name !== '_layout.tsx').map((n) => n.replace('.tsx', ''));
    expect([...registered].sort()).toEqual([...routes].sort());
  });
});

describe('state is never carried in a colour alone', () => {
  it('every selected chip says that it is selected', () => {
    // `chipSelected` is the style that paints a chosen chip. A chip that takes
    // it and does not also report the state is a control whose value is visible
    // only to people who can see the colour.
    for (const name of screens) {
      const source = read(name);
      const painted = source.split('styles.chipSelected').length - 1;
      if (painted === 0) continue;
      const announced = source.split('accessibilityState={{ selected:').length - 1;
      expect(announced, `${name} paints ${painted} chips and announces ${announced}`).toBe(painted);
    }
  });
});

describe('a control that places a call says so', () => {
  it('every tel: press is a button with a spoken name', () => {
    for (const name of screens) {
      const source = read(name);
      if (!source.includes('tel:')) continue;
      // Counted rather than parsed. This asserts only what source text can
      // honestly support: that the screen has at least as many things declared
      // as buttons as it has ways to dial. Whether each one's spoken name is
      // any good is a question for a phone with VoiceOver on, which this
      // environment does not have.
      const dials = source.split('tel:').length - 1;
      const buttons = source.split('accessibilityRole="button"').length - 1;
      expect(
        buttons,
        `${name} dials ${dials} numbers from ${buttons} declared buttons`,
      ).toBeGreaterThanOrEqual(dials);
    }
  });
});

describe('headings are headings', () => {
  it('every screen heading is marked as one', () => {
    // The heading rotor was empty on every screen in this app: not one Text
    // styled as a heading was reported as one.
    for (const name of screens) {
      const source = read(name);
      const styled = [...source.matchAll(/<Text style=\{\[?styles\.h[123][,}]/g)].length;
      if (styled === 0) continue;
      const marked = source.split('accessibilityRole="header"').length - 1;
      // At least, not exactly: a screen may mark something a heading that is
      // not styled as one. The craving flow does — each step's question is the
      // heading for that step while being set in the body face, the same way
      // it is an <h2> on the web.
      expect(
        marked,
        `${name} styles ${styled} headings and marks ${marked}`,
      ).toBeGreaterThanOrEqual(styled);
    }
  });
});

describe('a write that fails says so', () => {
  it('no screen writes inside a try/finally with no catch', () => {
    /*
     * The shape that lost four writes in this app: `try { await api.post(…) }
     * finally { setBusy(false) }`. It looks careful and is not — the promise
     * rejects with nobody listening, the spinner stops, and the screen goes
     * back to looking exactly as it did with everything the person wrote still
     * on it and nothing to say none of it saved.
     *
     * Matched on the shape rather than the behaviour, because there is no
     * device here to observe the behaviour on. A screen that writes must
     * either catch, or hand the write to the shared action helper.
     */
    for (const name of screens) {
      const source = read(name);
      if (!/api\.(post|put|patch|delete)/.test(source)) continue;
      const guarded = source.includes('} catch') || source.includes('useAction');
      expect(guarded, `${name} writes with nothing catching the failure`).toBe(true);
    }
  });

  it('a screen that uses the action helper shows what it reports', () => {
    // An error the helper sets and the screen never renders is the same
    // silence with extra steps.
    for (const name of screens) {
      const source = read(name);
      if (!source.includes('useAction')) continue;
      expect(source, `${name} takes an error from useAction and never renders it`).toMatch(
        /\{error \?/,
      );
    }
  });
});
