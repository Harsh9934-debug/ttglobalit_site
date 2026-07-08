// One-off helper: tags the shared nav/footer in the given files with the
// canonical global.* data-cms keys, matching by exact trimmed text content.
// Only touches <nav>...</nav> and <footer>...</footer>; leaves everything
// else byte-identical (cheerio only rewrites the specific elements touched
// via replaceWith/attr, htmlparser2 round-trips untouched markup as-is).
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error('Usage: node tag-global-remaining.mjs <file1.html> <file2.html> ...')
  process.exit(1)
}

// key -> exact trimmed text to match (leaf p/span/a elements only)
const TEXT_MAP = [
  ['global.nav.whatWeDo.label', 'What We do'],
  ['global.nav.overview.title', 'Overview'],
  ['global.nav.overview.subtitle', 'What we offer'],
  ['global.nav.industries.title', 'Industries'],
  ['global.nav.industries.subtitle', 'Sectors we serve'],
  ['global.nav.esahakara.label', 'Esahakara'],
  ['global.nav.esahakaraApp.title', 'Esahakara Application'],
  ['global.nav.esahakaraApp.subtitle', 'Core banking solution'],
  ['global.nav.esahakaraPigmy.title', 'Esahakara Pigmy Agent App'],
  ['global.nav.esahakaraPigmy.subtitle', 'Agent mobile application'],
  ['global.nav.esahakaraCustomer.title', 'Esahakara Customer App'],
  ['global.nav.esahakaraCustomer.subtitle', 'Customer mobile application'],
  ['global.nav.products.label', 'Products'],
  ['global.nav.evyavahaar.title', 'EVYAVAHAAR'],
  ['global.nav.evyavahaar.subtitle', 'GST Billing'],
  ['global.nav.echits.title', 'ECHITS'],
  ['global.nav.echits.subtitle', 'Chit Fund Management'],
  ['global.nav.ribill.title', 'RIBILL'],
  ['global.nav.ribill.subtitle', 'Retail Billing & POS'],
  ['global.nav.pinnacle.title', 'PINNACLE & META'],
  ['global.nav.pinnacle.subtitle', 'Telecom & Digital Services'],
  ['global.nav.aboutUs.label', 'About Us'],
  ['global.nav.internship.label', 'Internship'],
  ['global.nav.more.label', 'More'],
  ['global.nav.contactUs.title', 'Contact Us'],
  ['global.nav.contactUs.subtitle', 'Get in touch with us'],
  ['global.nav.teamLeads.title', 'Team leads'],
  ['global.nav.teamLeads.subtitle', 'Meet our leadership'],
  ['global.nav.privacyPolicy.title', 'Privacy Policy'],
  ['global.nav.privacyPolicy.subtitle', 'How we handle data'],
  ['global.footer.brandName', 'TT GLOBAL IT'],
  [
    'global.footer.brandBlurb',
    'Optimizing the digital presence of brands, fueled by a drive to provide exceptional solutions and cutting-edge software products.',
  ],
  ['global.footer.office1.label', 'Corporate'],
  ['global.footer.office2.label', 'Head Office'],
  ['global.footer.office3.label', 'Branch'],
  ['global.footer.copyright', '© 2019-2026 TRANSCRIPT TECHNOLOGY GLOBAL INFOTECH PRIVATE LIMITED'],
]

// Bare text nodes next to icons that need wrapping in a span.
const TEXT_NODE_MAP = [
  ['global.nav.contactCta.label', 'Contact Us'], // top-right nav link (own <a>, no children)
  ['global.footer.phone', '+91 807-3804-799 | +91 8660402580'],
  ['global.footer.email', 'ttglobalinfotech7@gmail.com'],
  ['global.footer.office1.address', '#166 &167, 5th Cross, Hebbal, Bengaluru 560024'],
  ['global.footer.office2.address', '35 Mayasandra, Turuvekere, Tumkur 572221'],
  ['global.footer.office3.address', '291/A KIADB, Hebbal Industrial Area, Mysuru 570016'],
]

async function processFile(file) {
  const full = path.join(PUBLIC_DIR, file)
  const html = await readFile(full, 'utf8')
  const $ = cheerio.load(html, { decodeEntities: false })

  const scope = $('nav, footer')
  let tagCount = 0

  // logo
  scope
    .find('img[src="assets/logo.png"]')
    .each((_, el) => {
      $(el).attr('data-cms', 'global.nav.logoSrc')
      $(el).attr('data-cms-field', 'src')
      tagCount++
    })

  // leaf text elements (p, span, h3) whose OWN trimmed text (not descendants) matches
  for (const [key, text] of TEXT_MAP) {
    scope.find('p, span, h3, a').each((_, el) => {
      const $el = $(el)
      if ($el.children().length > 0) return // only leaf-ish elements
      if ($el.attr('data-cms')) return // already tagged
      if ($el.text().trim() === text) {
        $el.attr('data-cms', key)
        tagCount++
      }
    })
  }

  // bare text nodes sitting next to icons/other elements
  for (const [key, text] of TEXT_NODE_MAP) {
    scope.find('p, a').each((_, el) => {
      const $el = $(el)
      $el.contents().each((__, node) => {
        if (node.type === 'text' && $(node).text().trim() === text) {
          $(node).replaceWith(`<span data-cms="${key}">${text}</span>`)
          tagCount++
        }
      })
    })
  }

  // body data-page-id + hydrate script
  const pageId = path.basename(file, '.html')
  if (!$('body').attr('data-page-id')) {
    $('body').attr('data-page-id', pageId)
  }
  if ($('script[src="cms-hydrate.js"]').length === 0) {
    $('body').append('\n<script src="cms-hydrate.js" defer></script>\n')
  }

  await writeFile(full, $.html(), 'utf8')
  console.log(`${file}: tagged ${tagCount} global nav/footer elements`)
}

for (const file of files) {
  await processFile(file)
}
