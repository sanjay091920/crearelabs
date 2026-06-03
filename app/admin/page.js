'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRAND, SERVICES, INDUSTRIES, STATS, BLOG_POSTS, JOBS } from '@/lib/data';

/* ── Styles ─────────────────────────────────────────────────── */
const S = {
  dk: '#09090F', dk2: '#111119', dk3: '#1A1A26', dk4: '#22222F',
  or: '#FF6B35', te: '#2EC4B6', tx: '#EEEEF8', mu: '#8888A4',
  bd: 'rgba(255,255,255,.07)', bd2: 'rgba(255,255,255,.13)',
};
const card = { background: S.dk2, border: `1px solid ${S.bd}`, borderRadius: 14, padding: 22, marginBottom: 14 };
const label = { display:'block', fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:S.mu, marginBottom:6 };
const input = { width:'100%', background:S.dk3, border:`1px solid ${S.bd}`, borderRadius:8, padding:'9px 13px', color:S.tx, fontSize:13, outline:'none', boxSizing:'border-box' };
const btn   = (bg='#FF6B35',c='#fff') => ({ background:bg, color:c, border:'none', borderRadius:8, padding:'9px 18px', fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'system-ui,sans-serif' });
const pill  = (active) => ({ padding:'5px 12px', borderRadius:20, fontSize:12, fontWeight:600, border:`1px solid ${active?S.or:S.bd}`, background:active?'rgba(255,107,53,.1)':'transparent', color:active?S.or:S.mu, cursor:'pointer', whiteSpace:'nowrap' });

/* ── Sidebar tabs ────────────────────────────────────────────── */
const TABS = [
  { id:'dashboard', label:'📊 Dashboard' },
  { id:'leads',     label:'📬 Leads' },
  { id:'blog',      label:'📝 Blog Posts' },
  { id:'careers',   label:'💼 Job Listings' },
  { id:'settings',  label:'⚙️ Settings' },
];

export default function AdminDashboard({ leads = [], applications = [] }) {
  const [tab, setTab]   = useState('dashboard');
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  return (
    <div style={{ fontFamily:'system-ui,sans-serif', background:S.dk, minHeight:'100vh', color:S.tx, display:'flex', flexDirection:'column' }}>
      {/* Top bar */}
      <div style={{ background:S.dk2, borderBottom:`1px solid ${S.bd}`, padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between', height:52, position:'sticky', top:0, zIndex:50, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, background:'linear-gradient(135deg,#FF6B35,#FF3D00)', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Georgia,serif', fontWeight:700, fontSize:15, color:'#fff' }}>C</div>
          <span style={{ fontFamily:'Georgia,serif', fontSize:16 }}>Crearelabs Admin</span>
          <span style={{ background:'rgba(255,107,53,.15)', color:S.or, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20, letterSpacing:'.06em' }}>PANEL</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <a href="/" target="_blank" style={{ fontSize:12, color:S.mu, textDecoration:'none' }}>View site ↗</a>
          <button onClick={logout} style={{ ...btn(S.dk3, S.mu), border:`1px solid ${S.bd}` }}>Logout</button>
        </div>
      </div>

      <div style={{ display:'flex', flex:1, minHeight:0 }}>
        {/* Sidebar */}
        <div style={{ width:200, background:S.dk2, borderRight:`1px solid ${S.bd}`, padding:'14px 10px', flexShrink:0, overflowY:'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ width:'100%', textAlign:'left', padding:'9px 12px', borderRadius:8, fontSize:12.5, fontWeight:500, marginBottom:3, color: tab===t.id ? S.or : S.mu, background: tab===t.id ? 'rgba(255,107,53,.1)' : 'none', border: tab===t.id ? `1px solid rgba(255,107,53,.2)` : '1px solid transparent', cursor:'pointer', fontFamily:'system-ui,sans-serif', display:'block' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:24, overflowY:'auto' }}>

          {/* ── DASHBOARD ──────────────────────────────── */}
          {tab === 'dashboard' && (
            <div>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, marginBottom:20 }}>Dashboard</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total Leads', val: leads.length || '0', color: S.or },
                  { label:'Applications', val: applications.length || '0', color: S.te },
                  { label:'Blog Posts', val: BLOG_POSTS.length, color: '#9B5DE5' },
                  { label:'Open Jobs', val: JOBS.filter(j=>j.active !== false).length, color: '#00BBF9' },
                ].map((s,i) => (
                  <div key={i} style={{ background:S.dk2, border:`1px solid ${S.bd}`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:S.mu, marginBottom:8 }}>{s.label}</div>
                    <div style={{ fontFamily:'Georgia,serif', fontSize:32, color:s.color, lineHeight:1 }}>{s.val}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div style={card}>
                  <div style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Quick actions</div>
                  {[
                    { label:'View all leads', action: () => setTab('leads') },
                    { label:'View job applications', action: () => setTab('careers') },
                    { label:'Manage blog posts', action: () => setTab('blog') },
                    { label:'Site settings', action: () => setTab('settings') },
                  ].map((a,i) => (
                    <button key={i} onClick={a.action} style={{ display:'block', width:'100%', textAlign:'left', padding:'9px 12px', background:S.dk3, border:`1px solid ${S.bd}`, borderRadius:8, color:S.tx, fontSize:13, cursor:'pointer', marginBottom:8, fontFamily:'system-ui,sans-serif' }}>
                      {a.label} →
                    </button>
                  ))}
                </div>
                <div style={card}>
                  <div style={{ fontWeight:700, marginBottom:14, fontSize:14 }}>Site info</div>
                  {[
                    { label:'Email', val: BRAND.email },
                    { label:'Phone', val: BRAND.phone },
                    { label:'Location', val: BRAND.address },
                    { label:'WhatsApp', val: `+${BRAND.whatsapp}` },
                  ].map((info,i) => (
                    <div key={i} style={{ borderBottom:`1px solid ${S.bd}`, padding:'8px 0', display:'flex', gap:10, fontSize:13 }}>
                      <span style={{ color:S.mu, width:70, flexShrink:0 }}>{info.label}</span>
                      <span style={{ color:S.tx }}>{info.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── LEADS ──────────────────────────────────── */}
          {tab === 'leads' && (
            <div>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, marginBottom:8 }}>Contact Leads</h2>
              <p style={{ fontSize:13, color:S.mu, marginBottom:20 }}>
                All leads are also emailed to <strong style={{ color:S.tx }}>{BRAND.email}</strong> instantly when submitted.
              </p>
              <div style={{ background:'rgba(46,196,182,.08)', border:'1px solid rgba(46,196,182,.2)', borderRadius:12, padding:'14px 18px', marginBottom:20, fontSize:13 }}>
                <strong style={{ color:S.te }}>💡 To see leads here in real-time:</strong> Connect Supabase (free) and leads will appear in this table. For now, check your Gmail inbox — every submission arrives there immediately with full details.
              </div>
              {leads.length > 0 ? (
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                  <thead>
                    <tr style={{ borderBottom:`1px solid ${S.bd}` }}>
                      {['Name','Email','Phone','Business','Industry','Message','Date'].map(h => (
                        <th key={h} style={{ textAlign:'left', padding:'10px 12px', fontSize:10, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:S.mu }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead,i) => (
                      <tr key={i} style={{ borderBottom:`1px solid ${S.bd}` }}>
                        <td style={{ padding:'11px 12px' }}>{lead.name}</td>
                        <td style={{ padding:'11px 12px', color:S.or }}><a href={`mailto:${lead.email}`} style={{ color:S.or }}>{lead.email}</a></td>
                        <td style={{ padding:'11px 12px', color:S.mu }}>{lead.phone||'—'}</td>
                        <td style={{ padding:'11px 12px', color:S.mu }}>{lead.business||'—'}</td>
                        <td style={{ padding:'11px 12px', color:S.mu }}>{lead.industry||'—'}</td>
                        <td style={{ padding:'11px 12px', color:S.mu, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{lead.message}</td>
                        <td style={{ padding:'11px 12px', color:S.mu }}>{lead.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ textAlign:'center', padding:'48px 0', color:S.mu }}>
                  <div style={{ fontSize:40, marginBottom:14 }}>📬</div>
                  <div style={{ fontWeight:600, marginBottom:8 }}>No leads stored yet</div>
                  <div style={{ fontSize:13 }}>Leads go directly to your Gmail. Check <strong style={{ color:S.tx }}>{BRAND.email}</strong> for all submissions.</div>
                </div>
              )}
            </div>
          )}

          {/* ── BLOG ───────────────────────────────────── */}
          {tab === 'blog' && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:10 }}>
                <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, margin:0 }}>Blog Posts</h2>
                <div style={{ fontSize:13, color:S.mu }}>Edit posts in <code style={{ background:S.dk3, padding:'2px 6px', borderRadius:4, color:S.tx }}>lib/data.js</code> → push to GitHub → auto-deploys</div>
              </div>
              <div style={{ background:'rgba(255,107,53,.06)', border:'1px solid rgba(255,107,53,.15)', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize:13, color:S.mu }}>
                To add/edit blog posts: open <code style={{ color:S.or }}>lib/data.js</code> in your code editor → edit the <code style={{ color:S.or }}>BLOG_POSTS</code> array → push to GitHub → Vercel auto-deploys.
              </div>
              {BLOG_POSTS.map((post,i) => (
                <div key={i} style={card}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap' }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:S.or, marginBottom:6 }}>{post.category}</div>
                      <div style={{ fontWeight:600, fontSize:15, marginBottom:6 }}>{post.title}</div>
                      <div style={{ fontSize:13, color:S.mu }}>{post.excerpt}</div>
                    </div>
                    <div style={{ display:'flex', gap:8, flexShrink:0, flexWrap:'wrap' }}>
                      <span style={{ background:'rgba(46,196,182,.1)', color:S.te, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20, border:'1px solid rgba(46,196,182,.2)' }}>● LIVE</span>
                      <a href={`/blog/${post.slug}`} target="_blank" style={{ ...btn(S.dk3, S.mu), border:`1px solid ${S.bd}`, textDecoration:'none', display:'inline-block' }}>View →</a>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:14, marginTop:12, fontSize:12, color:S.mu }}>
                    <span>📅 {post.date}</span>
                    <span>⏱ {post.readTime}</span>
                    <span>🔗 /blog/{post.slug}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CAREERS ────────────────────────────────── */}
          {tab === 'careers' && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:10 }}>
                <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, margin:0 }}>Job Listings</h2>
                <div style={{ fontSize:13, color:S.mu }}>Edit in <code style={{ background:S.dk3, padding:'2px 6px', borderRadius:4, color:S.tx }}>lib/data.js</code></div>
              </div>
              <div style={{ background:'rgba(255,107,53,.06)', border:'1px solid rgba(255,107,53,.15)', borderRadius:12, padding:'12px 16px', marginBottom:20, fontSize:13, color:S.mu }}>
                Job applications are emailed to <strong style={{ color:S.tx }}>{BRAND.email}</strong> with all applicant details. To add/remove jobs, edit the <code style={{ color:S.or }}>JOBS</code> array in <code style={{ color:S.or }}>lib/data.js</code>.
              </div>
              {JOBS.map((job,i) => (
                <div key={i} style={card}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap' }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:S.or, marginBottom:5 }}>{job.department}</div>
                      <div style={{ fontWeight:600, fontSize:15, marginBottom:8 }}>{job.title}</div>
                      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                        {[`📍 ${job.location}`,`⏱ ${job.type}`,`💼 ${job.experience}`,`💰 ${job.salary}`].map((t,j) => (
                          <span key={j} style={{ fontSize:12, color:S.mu, background:S.dk3, border:`1px solid ${S.bd}`, borderRadius:20, padding:'3px 12px' }}>{t}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <span style={{ background:'rgba(46,196,182,.1)', color:S.te, fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20, border:'1px solid rgba(46,196,182,.2)', whiteSpace:'nowrap' }}>● Hiring</span>
                      <a href={`/careers/${job.slug}`} target="_blank" style={{ ...btn(S.dk3, S.mu), border:`1px solid ${S.bd}`, textDecoration:'none', display:'inline-block' }}>View →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── SETTINGS ───────────────────────────────── */}
          {tab === 'settings' && (
            <div>
              <h2 style={{ fontFamily:'Georgia,serif', fontSize:22, marginBottom:8 }}>Settings</h2>
              <p style={{ fontSize:13, color:S.mu, marginBottom:24 }}>Edit <code style={{ background:S.dk3, padding:'2px 6px', borderRadius:4, color:S.tx }}>lib/data.js</code> to update brand info, then push to GitHub.</p>

              <div style={card}>
                <div style={{ fontWeight:700, marginBottom:16, fontSize:14 }}>Current brand info</div>
                {Object.entries(BRAND).map(([k,v]) => (
                  <div key={k} style={{ borderBottom:`1px solid ${S.bd}`, padding:'10px 0', display:'grid', gridTemplateColumns:'140px 1fr', gap:12, fontSize:13 }}>
                    <span style={{ color:S.mu, fontWeight:600 }}>{k}</span>
                    <span style={{ color:S.tx }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={card}>
                <div style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>Vercel env variables</div>
                <p style={{ fontSize:13, color:S.mu, marginBottom:14 }}>Go to <strong style={{ color:S.tx }}>Vercel → Settings → Environment Variables</strong> to update these:</p>
                {[
                  { key:'GMAIL_USER', val:'ahirwarsanjay0901@gmail.com', desc:'Gmail sender' },
                  { key:'GMAIL_APP_PASSWORD', val:'••••••••••••••••', desc:'Gmail App Password' },
                  { key:'ADMIN_EMAIL', val:'ahirwarsanjay0901@gmail.com', desc:'Where leads go' },
                  { key:'ADMIN_PASSWORD', val:'your_admin_password', desc:'This dashboard password' },
                  { key:'ADMIN_SECRET', val:'your_32_char_secret', desc:'Session token secret' },
                  { key:'NEXT_PUBLIC_SITE_URL', val:'https://crearelabs.in', desc:'Site URL' },
                ].map((env,i) => (
                  <div key={i} style={{ borderBottom:`1px solid ${S.bd}`, padding:'10px 0', display:'grid', gridTemplateColumns:'1fr 1fr auto', gap:12, fontSize:12, alignItems:'center' }}>
                    <code style={{ color:S.or }}>{env.key}</code>
                    <code style={{ color:S.mu }}>{env.val}</code>
                    <span style={{ color:S.mu, fontSize:11 }}>{env.desc}</span>
                  </div>
                ))}
              </div>

              <div style={card}>
                <div style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>How to update website content</div>
                {[
                  { step:'1', title:'Open lib/data.js', desc:'This file is the single source of truth for all site content — brand, services, industries, blog posts, jobs, FAQs, stats, testimonials.' },
                  { step:'2', title:'Edit what you need', desc:'Change phone, email, tagline, add a blog post, add a job, update a testimonial, edit FAQs.' },
                  { step:'3', title:'Push to GitHub', desc:'Open CMD in the crearelabs folder → run: git add . → git commit -m "update content" → git push' },
                  { step:'4', title:'Auto-deploy', desc:'Vercel detects the push and redeploys in ~60 seconds. Your site updates automatically.' },
                ].map((s,i) => (
                  <div key={i} style={{ display:'flex', gap:14, marginBottom:16 }}>
                    <div style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,107,53,.15)', color:S.or, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>{s.step}</div>
                    <div>
                      <div style={{ fontWeight:600, marginBottom:4, fontSize:13 }}>{s.title}</div>
                      <div style={{ fontSize:12, color:S.mu, lineHeight:1.6 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
