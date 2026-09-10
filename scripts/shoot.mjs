/**
 * Visual QA harness. Screenshots the running dev server in both themes at
 * several viewports so design review happens against real rendered output
 * rather than assumptions about the CSS.
 *
 * Usage: node scripts/shoot.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = "shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();

for (const theme of ["light", "dark"]) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      colorScheme: theme,
      reducedMotion: "no-preference",
    });
    const page = await ctx.newPage();

    const errors = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(String(e)));

    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.evaluate((t) => {
      localStorage.setItem("dossier-theme", t);
      document.documentElement.setAttribute("data-theme", t);
    }, theme);
    await page.waitForTimeout(2200);

    await page.screenshot({ path: `${OUT}/${theme}-${vp.name}-hero.png` });

    if (vp.name === "desktop") {
      await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.15));
      await page.waitForTimeout(1600);
      await page.screenshot({ path: `${OUT}/${theme}-work.png` });

      await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
      await page.waitForTimeout(1600);
      await page.screenshot({ path: `${OUT}/${theme}-lower.png` });

      await page.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight),
      );
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${OUT}/${theme}-contact.png` });
    }

    if (errors.length) {
      console.log(`[${theme}/${vp.name}] console errors:`);
      for (const e of errors.slice(0, 6)) console.log("   ", e);
    } else {
      console.log(`[${theme}/${vp.name}] clean`);
    }

    await ctx.close();
  }
}

await browser.close();
console.log(`\nScreenshots written to ${OUT}/`);
