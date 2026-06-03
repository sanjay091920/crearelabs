export const metadata = { title: 'Privacy Policy', description: 'How Crearelabs collects, uses, and protects your personal information.', alternates: { canonical: 'https://crearelabs.in/privacy-policy' } };
export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="1 March 2024" sections={[
    { h: 'Information We Collect', p: "We collect information you provide directly to us, such as when you contact us through our website, submit a form, or communicate with us via email or phone. This includes your name, email address, phone number, business name, and any other information you choose to provide.\n\nWe also collect certain information automatically when you visit our website, including your IP address, browser type, and use of our website through cookies and similar tracking technologies." },
    { h: 'How We Use Your Information', p: "We use the information we collect to respond to your inquiries and provide our services; send you marketing communications (with your consent); improve our website and services; and comply with legal obligations.\n\nWe do not sell your personal information to third parties." },
    { h: 'Cookies', p: "Our website uses cookies to enhance your experience. You can control cookie settings through your browser. We use Google Analytics to understand how visitors interact with our website. This data is aggregated and anonymised. See our Cookie Policy for details." },
    { h: 'Data Retention', p: "We retain your personal information for as long as necessary to fulfil the purposes for which it was collected. Typically, client data is retained for 7 years in accordance with Indian tax law." },
    { h: 'Your Rights', p: "Under applicable data protection laws, you have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at ahirwarsanjay0901@gmail.com." },
    { h: 'Contact Us', p: "Crearelabs · Noida, Uttar Pradesh, India · ahirwarsanjay0901@gmail.com · +91 8448807923" },
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
