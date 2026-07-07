export type PageEntry = {
  id: string
  file: string
  title: string
}

// "global" holds shared nav/footer/header content applied to every page.
export const PAGES_MANIFEST: PageEntry[] = [
  { id: 'global', file: '(shared)', title: 'Global (Header, Nav, Footer)' },
  { id: 'index', file: 'index.html', title: 'Home' },
  { id: 'aboutus', file: 'aboutus.html', title: 'About Us' },
  { id: 'careers', file: 'careers.html', title: 'Careers' },
  { id: 'contact-us', file: 'contact-us.html', title: 'Contact Us' },
  { id: 'team', file: 'team.html', title: 'Team' },
  { id: 'overview', file: 'overview.html', title: 'Overview' },
  { id: 'pinnacle', file: 'pinnacle.html', title: 'Pinnacle' },
  { id: 'industries', file: 'industries.html', title: 'Industries' },
  { id: 'industry-banking', file: 'industry-banking.html', title: 'Industry - Banking' },
  { id: 'industry-communications', file: 'industry-communications.html', title: 'Industry - Communications' },
  { id: 'industry-education', file: 'industry-education.html', title: 'Industry - Education' },
  { id: 'industry-energy', file: 'industry-energy.html', title: 'Industry - Energy' },
  { id: 'industry-healthcare', file: 'industry-healthcare.html', title: 'Industry - Healthcare' },
  { id: 'industry-public-services', file: 'industry-public-services.html', title: 'Industry - Public Services' },
  { id: 'Esahakara', file: 'Esahakara.html', title: 'E-Sahakara' },
  { id: 'esahakara-application', file: 'esahakara-application.html', title: 'E-Sahakara Application' },
  { id: 'esahakara-customer-app', file: 'esahakara-customer-app.html', title: 'E-Sahakara Customer App' },
  { id: 'esahakara-pigmy-agent-app', file: 'esahakara-pigmy-agent-app.html', title: 'E-Sahakara Pigmy Agent App' },
  { id: 'echits', file: 'echits.html', title: 'E-Chits' },
  { id: 'evyavahaar', file: 'evyavahaar.html', title: 'E-Vyavahaar' },
  { id: 'ribill', file: 'ribill.html', title: 'RI Bill' },
  { id: 'Internship', file: 'Internship.html', title: 'Internship' },
  { id: 'privacy', file: 'privacy.html', title: 'Privacy Policy' },
  { id: 'refund-policy', file: 'refund-policy.html', title: 'Refund Policy' },
  { id: 'terms-and-conditions', file: 'terms-and-conditions.html', title: 'Terms & Conditions' },
]

export function getPageEntry(id: string): PageEntry | undefined {
  return PAGES_MANIFEST.find((p) => p.id === id)
}
