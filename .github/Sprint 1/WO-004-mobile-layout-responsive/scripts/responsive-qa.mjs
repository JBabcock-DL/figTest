/**
 * WO-004 Step 13 — responsive QA (layout only).
 * Run: node .github/Sprint\ 1/WO-004-mobile-layout-responsive/scripts/responsive-qa.mjs
 * Requires dev or prod server at BASE_URL (default http://localhost:3000).
 */
import { chromium } from "playwright"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const PATH = "/properties/300-river-place"

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1024, height: 900 },
  { name: "wide", width: 1440, height: 900 },
]

const failures = []

function fail(msg) {
  failures.push(msg)
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(`${BASE_URL}${PATH}`, { waitUntil: "networkidle", timeout: 30000 })
  } catch (e) {
    console.error(`Could not load ${BASE_URL}${PATH}:`, e.message)
    process.exit(2)
  }

  for (const vp of VIEWPORTS) {
    await page.setViewportSize({ width: vp.width, height: vp.height })
    await page.waitForTimeout(400)

    const overflow = await page.evaluate(() => {
      const el = document.documentElement
      return el.scrollWidth > el.clientWidth + 1
    })
    if (overflow) fail(`[${vp.name}] horizontal page overflow`)

    const inlineNav = await page.locator("nav.fixed .hidden.lg\\:flex").isVisible()
    const menuBtn = await page.getByRole("button", { name: /open menu|close menu/i }).isVisible()

    if (vp.width >= 1024) {
      if (!inlineNav) fail(`[${vp.name}] expected inline nav at lg+`)
      if (menuBtn) fail(`[${vp.name}] hamburger should be hidden at lg+`)
    } else {
      if (inlineNav) fail(`[${vp.name}] inline nav should be hidden below lg`)
      if (!menuBtn) fail(`[${vp.name}] hamburger should be visible below lg`)
    }

    const headerSignIn = await page.locator("nav.fixed").getByRole("link", { name: /sign in/i }).count()
    const menuSignIn = await page.locator("#mobile-nav-menu").getByRole("link", { name: /sign in/i }).count()
    if (headerSignIn > 0) fail(`[${vp.name}] Sign in link in header nav`)
    if (menuSignIn > 0) fail(`[${vp.name}] Sign in link in mobile menu`)

    const footerSignIn = await page.locator("footer").getByRole("link", { name: /sign in/i }).count()
    const footerCreate = await page.locator("footer").getByRole("link", { name: /create account/i }).count()
    if (footerSignIn === 0 || footerCreate === 0) {
      fail(`[${vp.name}] footer missing Sign in or Create account`)
    }

    const exploreRow = page.locator("section").filter({ has: page.getByRole("heading", { name: "Explore More" }) }).locator("> div > div").nth(1)
    const exploreClasses = await exploreRow.getAttribute("class")
    if (vp.width < 1024) {
      if (!exploreClasses?.includes("overflow-x-auto")) {
        fail(`[${vp.name}] Explore More should scroll horizontally below lg`)
      }
    } else if (!exploreClasses?.includes("flex-wrap")) {
      fail(`[${vp.name}] Explore More row should use flex-wrap at lg+`)
    }

    if (vp.width < 1024) {
      await page.getByRole("button", { name: "Open menu" }).click()
      await page.waitForTimeout(300)
      const menu = page.locator("#mobile-nav-menu")
      if (!(await menu.isVisible())) fail(`[${vp.name}] menu did not open`)

      const box = await menu.boundingBox()
      if (!box) fail(`[${vp.name}] menu has no bounding box`)
      else if (vp.width <= 767) {
        if (box.width < vp.width - 2 || box.height < vp.height - 2) {
          fail(`[${vp.name}] mobile menu should be full viewport (got ${box.width}x${box.height})`)
        }
      } else {
        if (box.width < 350 || box.width > 370) {
          fail(`[${vp.name}] tablet drawer width expected ~360px (got ${Math.round(box.width)})`)
        }
      }

      await page.keyboard.press("Escape")
      await page.waitForTimeout(300)
      if (await menu.isVisible()) fail(`[${vp.name}] menu did not close on Escape`)

      await page.getByRole("button", { name: "Open menu" }).click()
      await page.waitForTimeout(200)
      await page.keyboard.press("Tab")
      const focusedInMenu = await page.evaluate(() => {
        const menu = document.getElementById("mobile-nav-menu")
        return menu?.contains(document.activeElement) ?? false
      })
      if (!focusedInMenu) fail(`[${vp.name}] Tab did not move focus into menu`)
      await page.keyboard.press("Escape")
      await page.waitForTimeout(200)
      if (await menu.isVisible()) fail(`[${vp.name}] menu did not close on second Escape after keyboard test`)
    }
  }

  await browser.close()

  if (failures.length) {
    console.error("WO-004 Step 13 QA FAILED:\n" + failures.map((f) => `  - ${f}`).join("\n"))
    process.exit(1)
  }
  console.log("WO-004 Step 13 QA passed at 375, 768, 1024, 1440.")
}

main()
