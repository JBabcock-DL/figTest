import { chromium } from "playwright"

const page = await chromium.launch({ headless: true }).then((b) => b.newPage())
await page.setViewportSize({ width: 375, height: 812 })
await page.goto("http://localhost:3000/properties/300-river-place", { waitUntil: "networkidle" })

const offenders = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth
  const out = []
  for (const el of document.querySelectorAll("*")) {
    const r = el.getBoundingClientRect()
    if (r.right > vw + 1 || r.left < -1) {
      const s = getComputedStyle(el)
      out.push({
        tag: el.tagName,
        id: el.id,
        className: String(el.className).slice(0, 120),
        right: Math.round(r.right),
        width: Math.round(r.width),
        overflow: s.overflow,
      })
    }
  }
  return out.sort((a, b) => b.right - a.right).slice(0, 15)
})

console.log(JSON.stringify(offenders, null, 2))
await page.close()
process.exit(0)
