export const metadata = { title: 'Terms of Service', description: 'Terms and conditions for using Crearelabs services.', alternates: { canonical: 'https://crearelabs.in/terms-of-service' } };
export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="1 March 2024" sections={[
    { h: 'Acceptance of Terms', p: "By accessing and using the Crearelabs website and services, you accept and agree to be bound by these Terms of Service and our Privacy Policy." },
    { h: 'Services', p: "Crearelabs provides digital marketing, technology development, and brand management services to businesses. The specific services, deliverables, timelines, and fees for each engagement are set out in a separate Statement of Work or Service Agreement signed by both parties." },
    { h: 'Payment Terms', p: "Retainer fees are due on the 1st of each month. All invoices are payable within 15 days. Late payments attract interest at 2% per month. GST is applicable on all services at the prevailing rate." },
    { h: 'Intellectual Property', p: "Work product created by Crearelabs for clients becomes the property of the client upon full payment. Crearelabs retains the right to use anonymised case studies and portfolio items for marketing purposes unless otherwise agreed in writing." },
    { h: 'Confidentiality', p: "Both parties agree to keep confidential any proprietary or sensitive information shared during the engagement. This obligation survives termination for a period of 3 years." },
    { h: 'Limitation of Liability', p: "Crearelabs' liability to any client is limited to the fees paid in the preceding 3 months. We are not liable for indirect, consequential, or special damages. Marketing results are subject to market conditions and cannot be guaranteed." },
    { h: 'Termination', p: "Either party may terminate a retainer agreement with 30 days' written notice. Project agreements may be terminated by Crearelabs for non-payment." },
    { h: 'Governing Law', p: "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Gautam Buddha Nagar, Uttar Pradesh." },
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
