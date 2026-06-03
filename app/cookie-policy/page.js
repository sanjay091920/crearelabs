export const metadata = { title: 'Cookie Policy', description: 'How Crearelabs uses cookies and similar tracking technologies.', alternates: { canonical: 'https://crearelabs.in/cookie-policy' } };
export default function CookiePage() {
  return <LegalPage title="Cookie Policy" updated="1 March 2024" sections={[
    { h: 'What Are Cookies', p: "Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and to provide information to website owners." },
    { h: 'How We Use Cookies', p: "We use cookies to: remember your preferences; understand how you use our website (Google Analytics); improve your experience; and ensure our website functions correctly.\n\nWe do not use cookies to serve advertising or to track you across third-party websites." },
    { h: 'Types of Cookies We Use', p: "Essential cookies: required for the website to function.\n\nAnalytics cookies: Google Analytics cookies that help us understand visitor behaviour. These are anonymised.\n\nPreference cookies: remember your choices such as cookie consent." },
    { h: 'Managing Cookies', p: "You can control and delete cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.\n\nTo opt out of Google Analytics, install the Google Analytics Opt-out Browser Add-on." },
    { h: 'Contact', p: "If you have questions about our use of cookies, contact us at ahirwarsanjay0901@gmail.com." },
  ]} />;
}
function LegalPage({ title, updated, sections }) {
  return (
    <>
      <div className="page-hero"><div className="container"><div className="label">Legal</div><h1 className="h1" style={{marginBottom:12}}>{title}</h1><p style={{fontSize:13,color:'var(--mu)'}}>Last updated: {updated}</p></div></div>
      <section className="section"><div className="container"><div className="legal-content">{sections.map((s,i)=><div key={i} className="legal-section"><h2>{s.h}</h2>{s.p.split('\n\n').map((p,j)=><p key={j}>{p}</p>)}</div>)}</div></div></section>
    </>
  );
}
