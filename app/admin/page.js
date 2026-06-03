'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const C = {
  dk:'#09090F',dk2:'#111119',dk3:'#1A1A26',
  or:'#FF6B35',te:'#2EC4B6',mu:'#8888A4',tx:'#EEEEF8',
  bd:'rgba(255,255,255,.07)',bd2:'rgba(255,255,255,.13)',
};
const inp = { width:'100%', background:C.dk3, border:`1px solid ${C.bd}`, borderRadius:8, padding:'9px 13px', color:C.tx, fontSize:13, outline:'none', boxSizing:'border-box', fontFamily:'system-ui,sans-serif' };
const btnS = (bg=C.or,c='#fff',p='9px 18px') => ({ background:bg, color:c, border:'none', borderRadius:8, padding:p, fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'system-ui,sans-serif', whiteSpace:'nowrap' });
const card = { background:C.dk2, border:`1px solid ${C.bd}`, borderRadius:14, padding:22, marginBottom:14 };
const lbl = { display:'block', fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:C.mu, marginBottom:6 };
const Field = ({label,children}) => <div style={{marginBottom:14}}><label style={lbl}>{label}</label>{children}</div>;

const TABS = [
  {id:'dashboard',  icon:'📊', label:'Dashboard'},
  {id:'blog',       icon:'📝', label:'Blog Posts'},
  {id:'jobs',       icon:'💼', label:'Job Listings'},
  {id:'brand',      icon:'🏷️', label:'Brand Settings'},
  {id:'faqs',       icon:'❓', label:'FAQs'},
  {id:'testimonials',icon:'⭐',label:'Testimonials'},
  {id:'leads',      icon:'📬', label:'Leads'},
  {id:'settings',   icon:'⚙️', label:'Setup Guide'},
];
const CATS  = ['Restaurant & F&B','Product Brands','E-Commerce','SEO','Performance Ads','Business'];
const DEPTS = ['Marketing','SEO','Engineering','Design','Operations','Sales'];
const ICONS = ['🍽️','📦','🛒','⚡','🔍','📣','⭐','📍','💼','🏥','🎯','📊'];
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

function Toast({msg,type,onDone}) {
  useEffect(()=>{const t=setTimeout(onDone,4000);return()=>clearTimeout(t);},[onDone]);
  const ok = type==='ok';
  return <div style={{position:'fixed',bottom:24,right:24,zIndex:9999,background:ok?'rgba(46,196,182,.12)':'rgba(255,85,85,.12)',border:`1px solid ${ok?'#2EC4B6':'#ff7777'}`,color:ok?'#2EC4B6':'#ff7777',borderRadius:12,padding:'14px 22px',fontSize:13,fontWeight:600,maxWidth:420,boxShadow:'0 8px 32px rgba(0,0,0,.5)'}}>{msg}</div>;
}

function Modal({title,onClose,children}) {
  return (
    <div style={{position:'fixed',inset:0,zIndex:500,background:'rgba(0,0,0,.8)',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'32px 16px',overflowY:'auto'}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{background:C.dk2,border:`1px solid ${C.bd}`,borderRadius:16,width:'100%',maxWidth:640,padding:28,maxHeight:'85vh',overflowY:'auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <h3 style={{fontFamily:'Georgia,serif',fontSize:18,margin:0,color:C.tx}}>{title}</h3>
          <button onClick={onClose} style={{...btnS(C.dk3,C.mu,'6px 12px'),border:`1px solid ${C.bd}`}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab,     setTab]     = useState('dashboard');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(null);
  const [modal,   setModal]   = useState(null);
  const showToast = useCallback((msg,type='ok') => setToast({msg,type}), []);

  useEffect(() => {
    fetch('/api/admin/content').then(r=>r.json()).then(d=>{
      if(d.error) showToast(`⚠️ ${d.hint||d.error}`, 'err');
      else setContent(d);
      setLoading(false);
    }).catch(()=>{showToast('Failed to connect to GitHub.','err');setLoading(false);});
  }, []);

  const save = useCallback(async (section, data, message) => {
    setSaving(true);
    try {
      const r = await fetch('/api/admin/content', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({section,data,message}) });
      const d = await r.json();
      if(!r.ok) throw new Error(d.error);
      setContent(prev=>({...prev,[section]:data}));
      showToast(d.message,'ok');
    } catch(err) { showToast(`❌ ${err.message}`,'err'); }
    finally { setSaving(false); setModal(null); }
  }, [showToast]);

  const logout = async () => { await fetch('/api/admin/auth',{method:'DELETE'}); router.push('/admin/login'); };

  if(loading) return (
    <div style={{minHeight:'100vh',background:C.dk,display:'flex',alignItems:'center',justifyContent:'center',color:C.or,fontSize:15,fontFamily:'system-ui,sans-serif',gap:12}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <span style={{animation:'spin 1s linear infinite',display:'inline-block'}}>⊙</span> Loading content from GitHub…
    </div>
  );

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:C.dk,minHeight:'100vh',color:C.tx,display:'flex',flexDirection:'column'}}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{border-color:#FF6B35!important;outline:none}
        button:active{transform:scale(.97)}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#09090F}::-webkit-scrollbar-thumb{background:#FF6B35;border-radius:2px}
      `}</style>
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={()=>setToast(null)}/>}
      {modal}

      {/* Topbar */}
      <div style={{background:C.dk2,borderBottom:`1px solid ${C.bd}`,padding:'0 20px',display:'flex',alignItems:'center',justifyContent:'space-between',height:54,position:'sticky',top:0,zIndex:100,flexShrink:0}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,background:'linear-gradient(135deg,#FF6B35,#FF3D00)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif',fontWeight:700,fontSize:16,color:'#fff'}}>C</div>
          <span style={{fontFamily:'Georgia,serif',fontSize:17}}>Crearelabs Admin</span>
          <span style={{background:'rgba(255,107,53,.15)',color:C.or,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,letterSpacing:'.06em'}}>CMS</span>
          {saving && <span style={{fontSize:14,color:C.or,animation:'spin 1s linear infinite',display:'inline-block'}}>⊙</span>}
        </div>
        <div style={{display:'flex',gap:8}}>
          <a href="/" target="_blank" style={{...btnS(C.dk3,C.mu,'7px 14px'),border:`1px solid ${C.bd}`,textDecoration:'none',fontSize:12}}>View site ↗</a>
          <button onClick={logout} style={{...btnS(C.dk3,C.mu,'7px 14px'),border:`1px solid ${C.bd}`,fontSize:12}}>Logout</button>
        </div>
      </div>

      <div style={{display:'flex',flex:1,minHeight:0}}>
        {/* Sidebar */}
        <div style={{width:188,background:C.dk2,borderRight:`1px solid ${C.bd}`,padding:'12px 8px',flexShrink:0,overflowY:'auto'}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{width:'100%',textAlign:'left',padding:'9px 12px',borderRadius:8,fontSize:12.5,fontWeight:500,marginBottom:3,color:tab===t.id?C.or:C.mu,background:tab===t.id?'rgba(255,107,53,.1)':'none',border:tab===t.id?`1px solid rgba(255,107,53,.2)`:'1px solid transparent',cursor:'pointer',fontFamily:'system-ui,sans-serif',display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:14}}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Main */}
        <div style={{flex:1,padding:24,overflowY:'auto'}}>

          {/* DASHBOARD */}
          {tab==='dashboard' && content && (
            <div>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:'0 0 20px'}}>Dashboard</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
                {[{l:'Blog Posts',v:content.blog_posts?.length||0,c:C.or},{l:'Job Listings',v:content.jobs?.length||0,c:C.te},{l:'FAQs',v:content.faqs?.length||0,c:'#9B5DE5'},{l:'Testimonials',v:content.testimonials?.length||0,c:'#00BBF9'}].map((s,i)=>(
                  <div key={i} style={{background:C.dk2,border:`1px solid ${C.bd}`,borderRadius:12,padding:'18px 20px'}}>
                    <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:C.mu,marginBottom:8}}>{s.l}</div>
                    <div style={{fontFamily:'Georgia,serif',fontSize:36,color:s.c,lineHeight:1}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={card}>
                <div style={{fontWeight:700,marginBottom:12,fontSize:14}}>How saving works</div>
                {['Edit content in any tab (Blog, Jobs, FAQs, Brand, Testimonials)','Click the Save button — takes 1–2 seconds','GitHub repo is updated automatically','Vercel detects the change and rebuilds in ~60 seconds','Your live website is updated!'].map((s,i)=>(
                  <div key={i} style={{display:'flex',gap:10,marginBottom:10,fontSize:13}}>
                    <span style={{background:'rgba(255,107,53,.15)',color:C.or,width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</span>
                    <span style={{color:C.mu}}>{s}</span>
                  </div>
                ))}
              </div>
              <div style={{...card,background:'rgba(255,107,53,.05)',border:'1px solid rgba(255,107,53,.2)'}}>
                <strong style={{color:C.or}}>⚠️ One-time setup needed</strong>
                <p style={{fontSize:13,color:C.mu,margin:'8px 0 0',lineHeight:1.7}}>Add <code style={{background:C.dk3,padding:'2px 6px',borderRadius:4,color:C.tx}}>GITHUB_TOKEN</code> to Vercel env vars (see Setup Guide tab). Without it, saving won't work. Setup takes 3 minutes.</p>
                <button onClick={()=>setTab('settings')} style={{...btnS(C.or,'#fff','8px 16px'),marginTop:12,fontSize:12}}>Go to Setup Guide →</button>
              </div>
            </div>
          )}

          {/* BLOG */}
          {tab==='blog' && content && <BlogSec content={content} save={save} saving={saving} setModal={setModal}/>}

          {/* JOBS */}
          {tab==='jobs' && content && <JobsSec content={content} save={save} saving={saving} setModal={setModal}/>}

          {/* BRAND */}
          {tab==='brand' && content && <BrandSec content={content} save={save} saving={saving}/>}

          {/* FAQS */}
          {tab==='faqs' && content && <FAQSec content={content} save={save} saving={saving} setModal={setModal}/>}

          {/* TESTIMONIALS */}
          {tab==='testimonials' && content && <TestSec content={content} save={save} saving={saving} setModal={setModal}/>}

          {/* LEADS */}
          {tab==='leads' && (
            <div>
              <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:'0 0 16px'}}>Contact Leads</h2>
              <div style={{background:'rgba(46,196,182,.08)',border:'1px solid rgba(46,196,182,.2)',borderRadius:12,padding:'16px 20px',fontSize:13}}>
                <strong style={{color:C.te}}>📬 All leads go directly to Gmail</strong>
                <p style={{color:C.mu,margin:'8px 0 0',lineHeight:1.75}}>Every contact form submission instantly emails <strong style={{color:C.tx}}>ahirwarsanjay0901@gmail.com</strong> with full lead details, business name, phone, and a one-click reply button. Check Gmail for all submissions.</p>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {tab==='settings' && <SetupGuide/>}

        </div>
      </div>
    </div>
  );
}

/* ── BLOG ── */
function BlogSec({content,save,saving,setModal}) {
  const posts = content.blog_posts||[];
  const blank = {slug:'',title:'',excerpt:'',content:'',category:'Restaurant & F&B',date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),readTime:'5 min read',icon:'🍽️',featured:false};
  const open = (p,i) => setModal(<BlogModal initial={p} idx={i} onClose={()=>setModal(null)} onSave={(u,idx)=>{
    const n = idx===-1?[...posts,u]:posts.map((x,j)=>j===idx?u:x);
    save('blog_posts',n,`${idx===-1?'Add':'Edit'} blog: ${u.title}`);
  }}/>);
  const del = i => { if(!confirm('Delete this post?'))return; save('blog_posts',posts.filter((_,j)=>j!==i),'Delete blog post'); };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,gap:10,flexWrap:'wrap'}}>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:0}}>Blog Posts <span style={{color:C.mu,fontSize:14,fontWeight:400}}>({posts.length})</span></h2>
        <button onClick={()=>open(blank,-1)} style={btnS(C.or)}>+ New Post</button>
      </div>
      {posts.map((p,i)=>(
        <div key={i} style={card}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{display:'flex',gap:8,marginBottom:8,flexWrap:'wrap',alignItems:'center'}}>
                <span style={{fontSize:10,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:C.or}}>{p.category}</span>
                {p.featured&&<span style={{background:'rgba(255,107,53,.15)',color:C.or,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20}}>FEATURED</span>}
                <span style={{background:'rgba(46,196,182,.1)',color:C.te,fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,border:'1px solid rgba(46,196,182,.2)'}}>● LIVE</span>
              </div>
              <div style={{fontFamily:'Georgia,serif',fontSize:16,marginBottom:5}}>{p.title}</div>
              <div style={{fontSize:13,color:C.mu,marginBottom:6}}>{p.excerpt}</div>
              <div style={{fontSize:11,color:C.mu}}>📅 {p.date} · ⏱ {p.readTime} · 🔗 /blog/{p.slug}</div>
            </div>
            <div style={{display:'flex',gap:8,flexShrink:0,alignItems:'flex-start',flexWrap:'wrap'}}>
              <a href={`/blog/${p.slug}`} target="_blank" style={{...btnS(C.dk3,C.mu,'7px 12px'),border:`1px solid ${C.bd}`,textDecoration:'none',fontSize:12}}>View ↗</a>
              <button onClick={()=>open(p,i)} style={{...btnS(C.or,'#fff','7px 14px'),fontSize:12}}>Edit</button>
              <button onClick={()=>del(i)} style={{...btnS('rgba(255,85,85,.12)','#ff7777','7px 12px'),border:'1px solid rgba(255,85,85,.2)',fontSize:12}}>Delete</button>
            </div>
          </div>
        </div>
      ))}
      {posts.length===0&&<div style={{textAlign:'center',padding:'48px 0',color:C.mu}}>No posts yet. Click "+ New Post" to add one.</div>}
    </div>
  );
}

function BlogModal({initial,idx,onClose,onSave}) {
  const [p,setP] = useState({...initial});
  const s = (k,v) => setP(x=>({...x,[k]:v}));
  return (
    <Modal title={idx===-1?'New Blog Post':'Edit Blog Post'} onClose={onClose}>
      <Field label="Title *"><input style={inp} value={p.title} onChange={e=>{s('title',e.target.value);if(!initial.slug)s('slug',slugify(e.target.value));}}/></Field>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <Field label="Slug (URL path)"><input style={inp} value={p.slug} onChange={e=>s('slug',slugify(e.target.value))}/></Field>
        <Field label="Category">
          <select style={{...inp}} value={p.category} onChange={e=>s('category',e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select>
        </Field>
      </div>
      <Field label="Excerpt (shown in listing)"><textarea style={{...inp,minHeight:70,resize:'vertical'}} value={p.excerpt} onChange={e=>s('excerpt',e.target.value)}/></Field>
      <Field label="Full content (use **text** for bold/headings)"><textarea style={{...inp,minHeight:220,resize:'vertical',fontFamily:'monospace',fontSize:12,lineHeight:1.6}} value={p.content} onChange={e=>s('content',e.target.value)}/></Field>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 80px',gap:12}}>
        <Field label="Date"><input style={inp} value={p.date} onChange={e=>s('date',e.target.value)} placeholder="15 Mar 2024"/></Field>
        <Field label="Read time"><input style={inp} value={p.readTime} onChange={e=>s('readTime',e.target.value)} placeholder="5 min read"/></Field>
        <Field label="Icon"><input style={inp} value={p.icon} onChange={e=>s('icon',e.target.value)}/></Field>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:20}}>
        <input type="checkbox" id="ft" checked={!!p.featured} onChange={e=>s('featured',e.target.checked)} style={{width:15,height:15,accentColor:C.or}}/>
        <label htmlFor="ft" style={{fontSize:13,color:C.tx,cursor:'pointer'}}>Featured post (highlighted at top of blog page)</label>
      </div>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
        <button onClick={onClose} style={{...btnS(C.dk3,C.mu),border:`1px solid ${C.bd}`}}>Cancel</button>
        <button onClick={()=>onSave(p,idx)} style={btnS(C.or)} disabled={!p.title||!p.slug}>{idx===-1?'✓ Publish Post':'✓ Save Changes'}</button>
      </div>
    </Modal>
  );
}

/* ── JOBS ── */
function JobsSec({content,save,saving,setModal}) {
  const jobs = content.jobs||[];
  const blank = {slug:'',title:'',department:'Marketing',location:'Noida (Hybrid)',type:'Full-time',experience:'1–3 years',salary:'₹4–8 LPA',active:true,desc:'',responsibilities:[''],requirements:['']};
  const open = (j,i) => setModal(<JobModal initial={j} idx={i} onClose={()=>setModal(null)} onSave={(u,idx)=>{
    const n = idx===-1?[...jobs,u]:jobs.map((x,k)=>k===idx?u:x);
    save('jobs',n,`${idx===-1?'Add':'Edit'} job: ${u.title}`);
  }}/>);
  const toggle = i => { const n=jobs.map((j,k)=>k===i?{...j,active:!j.active}:j); save('jobs',n,`Toggle: ${jobs[i].title}`); };
  const del = i => { if(!confirm('Delete this job?'))return; save('jobs',jobs.filter((_,k)=>k!==i),'Delete job'); };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,gap:10,flexWrap:'wrap'}}>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:0}}>Job Listings <span style={{color:C.mu,fontSize:14,fontWeight:400}}>({jobs.filter(j=>j.active).length} active)</span></h2>
        <button onClick={()=>open(blank,-1)} style={btnS(C.or)}>+ New Job</button>
      </div>
      {jobs.map((j,i)=>(
        <div key={i} style={{...card,opacity:j.active?1:.55}}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <div>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:C.or,marginBottom:5}}>{j.department}</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:16,marginBottom:8}}>{j.title}</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {[`📍 ${j.location}`,`⏱ ${j.type}`,`💼 ${j.experience}`,`💰 ${j.salary}`].map((t,k)=>(
                  <span key={k} style={{fontSize:11,color:C.mu,background:C.dk3,border:`1px solid ${C.bd}`,borderRadius:20,padding:'3px 10px'}}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{display:'flex',gap:8,flexShrink:0,flexWrap:'wrap',alignItems:'flex-start'}}>
              <span style={{background:j.active?'rgba(46,196,182,.1)':'rgba(255,255,255,.04)',color:j.active?C.te:C.mu,fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:20,border:`1px solid ${j.active?'rgba(46,196,182,.2)':C.bd}`}}>{j.active?'● Hiring':'Paused'}</span>
              <button onClick={()=>toggle(i)} style={{...btnS(C.dk3,C.mu,'6px 12px'),border:`1px solid ${C.bd}`,fontSize:11}}>{j.active?'Pause':'Activate'}</button>
              <a href={`/careers/${j.slug}`} target="_blank" style={{...btnS(C.dk3,C.mu,'6px 12px'),border:`1px solid ${C.bd}`,textDecoration:'none',fontSize:11}}>View ↗</a>
              <button onClick={()=>open(j,i)} style={{...btnS(C.or,'#fff','6px 12px'),fontSize:11}}>Edit</button>
              <button onClick={()=>del(i)} style={{...btnS('rgba(255,85,85,.12)','#ff7777','6px 10px'),border:'1px solid rgba(255,85,85,.2)',fontSize:11}}>Del</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function JobModal({initial,idx,onClose,onSave}) {
  const [j,setJ] = useState({...initial,responsibilities:[...(initial.responsibilities||[''])],requirements:[...(initial.requirements||[''])]});
  const s = (k,v) => setJ(x=>({...x,[k]:v}));
  const setArr = (k,i,v) => setJ(x=>({...x,[k]:x[k].map((a,b)=>b===i?v:a)}));
  const addArr = k => setJ(x=>({...x,[k]:[...x[k],'']}));
  const delArr = (k,i) => setJ(x=>({...x,[k]:x[k].filter((_,b)=>b!==i)}));
  return (
    <Modal title={idx===-1?'New Job Listing':'Edit Job Listing'} onClose={onClose}>
      <Field label="Job title *"><input style={inp} value={j.title} onChange={e=>{s('title',e.target.value);if(!initial.slug)s('slug',slugify(e.target.value));}}/></Field>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <Field label="Department">
          <select style={{...inp}} value={j.department} onChange={e=>s('department',e.target.value)}>{DEPTS.map(d=><option key={d}>{d}</option>)}</select>
        </Field>
        <Field label="URL slug"><input style={inp} value={j.slug} onChange={e=>s('slug',slugify(e.target.value))}/></Field>
        <Field label="Location"><input style={inp} value={j.location} onChange={e=>s('location',e.target.value)}/></Field>
        <Field label="Type"><input style={inp} value={j.type} onChange={e=>s('type',e.target.value)}/></Field>
        <Field label="Experience"><input style={inp} value={j.experience} onChange={e=>s('experience',e.target.value)}/></Field>
        <Field label="Salary"><input style={inp} value={j.salary} onChange={e=>s('salary',e.target.value)}/></Field>
      </div>
      <Field label="Job description"><textarea style={{...inp,minHeight:80,resize:'vertical'}} value={j.desc} onChange={e=>s('desc',e.target.value)}/></Field>
      <Field label="Responsibilities">
        {j.responsibilities.map((r,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:8}}>
            <input style={{...inp,flex:1}} value={r} onChange={e=>setArr('responsibilities',i,e.target.value)} placeholder={`Responsibility ${i+1}`}/>
            {j.responsibilities.length>1&&<button onClick={()=>delArr('responsibilities',i)} style={{...btnS('rgba(255,85,85,.1)','#ff7777','7px 11px'),fontSize:16}}>−</button>}
          </div>
        ))}
        <button onClick={()=>addArr('responsibilities')} style={{...btnS(C.dk3,C.mu,'7px 14px'),border:`1px solid ${C.bd}`,fontSize:12}}>+ Add responsibility</button>
      </Field>
      <Field label="Requirements">
        {j.requirements.map((r,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:8}}>
            <input style={{...inp,flex:1}} value={r} onChange={e=>setArr('requirements',i,e.target.value)} placeholder={`Requirement ${i+1}`}/>
            {j.requirements.length>1&&<button onClick={()=>delArr('requirements',i)} style={{...btnS('rgba(255,85,85,.1)','#ff7777','7px 11px'),fontSize:16}}>−</button>}
          </div>
        ))}
        <button onClick={()=>addArr('requirements')} style={{...btnS(C.dk3,C.mu,'7px 14px'),border:`1px solid ${C.bd}`,fontSize:12}}>+ Add requirement</button>
      </Field>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:8}}>
        <button onClick={onClose} style={{...btnS(C.dk3,C.mu),border:`1px solid ${C.bd}`}}>Cancel</button>
        <button onClick={()=>onSave({...j,responsibilities:j.responsibilities.filter(Boolean),requirements:j.requirements.filter(Boolean)},idx)} style={btnS(C.or)} disabled={!j.title||!j.slug}>{idx===-1?'✓ Post Job':'✓ Save Changes'}</button>
      </div>
    </Modal>
  );
}

/* ── BRAND ── */
function BrandSec({content,save,saving}) {
  const [b,setB] = useState({...content.brand});
  const [st,setSt] = useState(content.stats.map(s=>({...s})));
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,gap:10}}>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:0}}>Brand Settings</h2>
        <button onClick={()=>{save('brand',b,'Update brand');save('stats',st,'Update stats');}} style={btnS(C.or)} disabled={saving}>{saving?'Saving…':'✓ Save All'}</button>
      </div>
      <div style={card}>
        <div style={{fontWeight:700,marginBottom:16,fontSize:14}}>Contact & brand info</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          {[['Business name','name'],['Tagline','tagline'],['Phone (+91...)','phone'],['WhatsApp (digits only)','whatsapp'],['Email','email'],['Address','address'],['Instagram URL','instagram'],['LinkedIn URL','linkedin']].map(([label,key])=>(
            <Field key={key} label={label}><input style={inp} value={b[key]||''} onChange={e=>setB(x=>({...x,[key]:e.target.value}))}/></Field>
          ))}
        </div>
      </div>
      <div style={card}>
        <div style={{fontWeight:700,marginBottom:16,fontSize:14}}>Homepage stats</div>
        {st.map((s,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'100px 1fr 1fr',gap:12,marginBottom:10}}>
            <Field label={`Value ${i+1}`}><input style={inp} value={s.value} onChange={e=>setSt(x=>x.map((a,j)=>j===i?{...a,value:e.target.value}:a))}/></Field>
            <Field label="Label"><input style={inp} value={s.label} onChange={e=>setSt(x=>x.map((a,j)=>j===i?{...a,label:e.target.value}:a))}/></Field>
            <Field label="Sub-label"><input style={inp} value={s.sub} onChange={e=>setSt(x=>x.map((a,j)=>j===i?{...a,sub:e.target.value}:a))}/></Field>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FAQS ── */
function FAQSec({content,save,saving,setModal}) {
  const faqs = content.faqs||[];
  const open = (f,i) => setModal(<FAQModal initial={f} idx={i} onClose={()=>setModal(null)} onSave={(u,idx)=>{
    const n = idx===-1?[...faqs,u]:faqs.map((x,j)=>j===idx?u:x);
    save('faqs',n,`${idx===-1?'Add':'Edit'} FAQ`);
  }}/>);
  const del = i => { if(!confirm('Delete FAQ?'))return; save('faqs',faqs.filter((_,j)=>j!==i),'Delete FAQ'); };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,gap:10}}>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:0}}>FAQs <span style={{color:C.mu,fontSize:14,fontWeight:400}}>({faqs.length})</span></h2>
        <button onClick={()=>open({q:'',a:''},-1)} style={btnS(C.or)}>+ New FAQ</button>
      </div>
      {faqs.map((f,i)=>(
        <div key={i} style={card}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:600,marginBottom:6,fontSize:14}}>Q: {f.q}</div>
              <div style={{fontSize:13,color:C.mu,lineHeight:1.65}}>A: {f.a}</div>
            </div>
            <div style={{display:'flex',gap:8,flexShrink:0}}>
              <button onClick={()=>open(f,i)} style={{...btnS(C.or,'#fff','6px 12px'),fontSize:12}}>Edit</button>
              <button onClick={()=>del(i)} style={{...btnS('rgba(255,85,85,.12)','#ff7777','6px 10px'),border:'1px solid rgba(255,85,85,.2)',fontSize:12}}>Del</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function FAQModal({initial,idx,onClose,onSave}) {
  const [f,setF] = useState({...initial});
  return (
    <Modal title={idx===-1?'New FAQ':'Edit FAQ'} onClose={onClose}>
      <Field label="Question *"><input style={inp} value={f.q} onChange={e=>setF(x=>({...x,q:e.target.value}))}/></Field>
      <Field label="Answer *"><textarea style={{...inp,minHeight:130,resize:'vertical'}} value={f.a} onChange={e=>setF(x=>({...x,a:e.target.value}))}/></Field>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
        <button onClick={onClose} style={{...btnS(C.dk3,C.mu),border:`1px solid ${C.bd}`}}>Cancel</button>
        <button onClick={()=>onSave(f,idx)} style={btnS(C.or)} disabled={!f.q||!f.a}>✓ Save FAQ</button>
      </div>
    </Modal>
  );
}

/* ── TESTIMONIALS ── */
function TestSec({content,save,saving,setModal}) {
  const ts = content.testimonials||[];
  const open = (t,i) => setModal(<TestModal initial={t} idx={i} onClose={()=>setModal(null)} onSave={(u,idx)=>{
    const n = idx===-1?[...ts,u]:ts.map((x,j)=>j===idx?u:x);
    save('testimonials',n,`${idx===-1?'Add':'Edit'} testimonial`);
  }}/>);
  const del = i => { if(!confirm('Delete?'))return; save('testimonials',ts.filter((_,j)=>j!==i),'Delete testimonial'); };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,gap:10}}>
        <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:0}}>Testimonials <span style={{color:C.mu,fontSize:14,fontWeight:400}}>({ts.length})</span></h2>
        <button onClick={()=>open({name:'',role:'',icon:'⭐',quote:''},-1)} style={btnS(C.or)}>+ New Testimonial</button>
      </div>
      {ts.map((t,i)=>(
        <div key={i} style={card}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <span style={{fontSize:24}}>{t.icon}</span>
                <div><div style={{fontWeight:600,fontSize:14}}>{t.name}</div><div style={{fontSize:12,color:C.mu}}>{t.role}</div></div>
              </div>
              <div style={{fontSize:13,color:C.mu,fontStyle:'italic',lineHeight:1.65}}>"{t.quote}"</div>
            </div>
            <div style={{display:'flex',gap:8,flexShrink:0}}>
              <button onClick={()=>open(t,i)} style={{...btnS(C.or,'#fff','6px 12px'),fontSize:12}}>Edit</button>
              <button onClick={()=>del(i)} style={{...btnS('rgba(255,85,85,.12)','#ff7777','6px 10px'),border:'1px solid rgba(255,85,85,.2)',fontSize:12}}>Del</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
function TestModal({initial,idx,onClose,onSave}) {
  const [t,setT] = useState({...initial});
  const s = (k,v) => setT(x=>({...x,[k]:v}));
  return (
    <Modal title={idx===-1?'New Testimonial':'Edit Testimonial'} onClose={onClose}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <Field label="Name *"><input style={inp} value={t.name} onChange={e=>s('name',e.target.value)}/></Field>
        <Field label="Role / Company"><input style={inp} value={t.role} onChange={e=>s('role',e.target.value)} placeholder="Owner, Business Name"/></Field>
      </div>
      <Field label="Industry icon">
        <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:8}}>
          {ICONS.map(ic=><button key={ic} onClick={()=>s('icon',ic)} style={{padding:'5px 10px',borderRadius:8,border:`1px solid ${t.icon===ic?C.or:C.bd}`,background:t.icon===ic?'rgba(255,107,53,.15)':C.dk3,fontSize:18,cursor:'pointer'}}>{ic}</button>)}
        </div>
      </Field>
      <Field label="Quote *"><textarea style={{...inp,minHeight:110,resize:'vertical'}} value={t.quote} onChange={e=>s('quote',e.target.value)}/></Field>
      <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
        <button onClick={onClose} style={{...btnS(C.dk3,C.mu),border:`1px solid ${C.bd}`}}>Cancel</button>
        <button onClick={()=>onSave(t,idx)} style={btnS(C.or)} disabled={!t.name||!t.quote}>✓ Save</button>
      </div>
    </Modal>
  );
}

/* ── SETUP GUIDE ── */
function SetupGuide() {
  return (
    <div>
      <h2 style={{fontFamily:'Georgia,serif',fontSize:22,margin:'0 0 20px'}}>Setup Guide — Enable Saving</h2>
      <div style={{...card,background:'rgba(255,107,53,.05)',border:'1px solid rgba(255,107,53,.2)',marginBottom:20}}>
        <strong style={{color:C.or,fontSize:15}}>Add GITHUB_TOKEN to make saving work (3 min)</strong>
        <p style={{fontSize:13,color:C.mu,margin:'10px 0 16px',lineHeight:1.75}}>When you click Save in the admin panel, it updates your <code style={{background:C.dk3,padding:'2px 5px',borderRadius:4,color:C.tx}}>lib/content.json</code> file on GitHub which triggers an automatic Vercel redeploy. Your live site updates in ~60 seconds with no manual work needed.</p>
        {[
          'Go to github.com → click your profile picture (top right) → Settings',
          'In the left sidebar scroll to the very bottom → Developer settings',
          'Personal access tokens → Tokens (classic) → Generate new token (classic)',
          'Name it "Crearelabs Admin" → check the "repo" checkbox → scroll down → Generate token',
          'Copy the token shown (starts with ghp_... ) — you won\'t see it again',
          'Go to vercel.com → your crearelabs project → Settings → Environment Variables',
          'Click "Add" → Name: GITHUB_TOKEN → Value: paste your token → Save',
          'Go to Deployments → click the 3 dots → Redeploy',
          'Wait 60 seconds → come back to admin → try saving something!',
        ].map((step,i)=>(
          <div key={i} style={{display:'flex',gap:10,marginBottom:12,fontSize:13}}>
            <span style={{background:'rgba(255,107,53,.15)',color:C.or,width:24,height:24,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,flexShrink:0}}>{i+1}</span>
            <span style={{color:C.mu,lineHeight:1.6}}>{step}</span>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{fontWeight:700,marginBottom:14,fontSize:14}}>All environment variables in Vercel</div>
        {[
          {k:'GITHUB_TOKEN',      v:'ghp_your_token_here',            req:true, d:'Enables saving from admin dashboard'},
          {k:'ADMIN_PASSWORD',    v:'your_strong_password',           req:true, d:'Admin login password'},
          {k:'ADMIN_SECRET',      v:'any_32_char_string',             req:true, d:'Session signing secret'},
          {k:'GMAIL_USER',        v:'ahirwarsanjay0901@gmail.com',   req:true, d:'Gmail address for sending emails'},
          {k:'GMAIL_APP_PASSWORD',v:'xxxx xxxx xxxx xxxx',           req:true, d:'16-char Gmail App Password'},
          {k:'ADMIN_EMAIL',       v:'ahirwarsanjay0901@gmail.com',   req:true, d:'Where contact leads are emailed'},
          {k:'NEXT_PUBLIC_SITE_URL',v:'https://crearelabs.in',       req:true, d:'Your live domain'},
          {k:'GITHUB_OWNER',      v:'sanjay091920',                  req:false,d:'Auto-detected, optional override'},
          {k:'GITHUB_REPO',       v:'crearelabs',                    req:false,d:'Auto-detected, optional override'},
        ].map((e,i)=>(
          <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr auto auto',gap:12,borderBottom:`1px solid ${C.bd}`,padding:'10px 0',fontSize:12,alignItems:'center'}}>
            <code style={{color:e.req?C.or:C.mu}}>{e.k}</code>
            <code style={{color:C.mu}}>{e.v}</code>
            <span style={{background:e.req?'rgba(255,107,53,.1)':'rgba(255,255,255,.04)',color:e.req?C.or:C.mu,padding:'2px 8px',borderRadius:20,fontSize:10,fontWeight:700,whiteSpace:'nowrap'}}>{e.req?'Required':'Optional'}</span>
            <span style={{color:C.mu}}>{e.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
