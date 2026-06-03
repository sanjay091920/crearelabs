'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/admin/auth', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ password }) });
      const data = await res.json();
      if (res.ok && data.ok) { router.push('/admin'); router.refresh(); }
      else setError('Incorrect password. Try again.');
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const s = { fontFamily:"system-ui,sans-serif" };
  return (
    <div style={{ ...s, minHeight:'100vh', background:'#09090F', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#111119', border:'1px solid rgba(255,255,255,.07)', borderRadius:20, padding:'38px 30px', width:'100%', maxWidth:360, textAlign:'center' }}>
        <div style={{ width:52, height:52, background:'linear-gradient(135deg,#FF6B35,#FF3D00)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Georgia,serif', fontSize:24, color:'#fff', margin:'0 auto 16px', fontWeight:700 }}>C</div>
        <h1 style={{ fontFamily:'Georgia,serif', fontSize:22, color:'#EEEEF8', margin:'0 0 8px' }}>Welcome back</h1>
        <p style={{ fontSize:13, color:'#8888A4', margin:'0 0 24px' }}>Enter your admin password to continue</p>
        <form onSubmit={handleSubmit}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Admin password" required autoFocus
            style={{ width:'100%', background:'#1A1A26', border:`1px solid ${error?'rgba(255,85,85,.4)':'rgba(255,255,255,.07)'}`, borderRadius:8, padding:'11px 14px', color:'#EEEEF8', fontSize:14, outline:'none', boxSizing:'border-box', textAlign:'center', marginBottom:error?8:14 }}/>
          {error && <div style={{ color:'#ff5555', fontSize:12, marginBottom:14 }}>{error}</div>}
          <button type="submit" disabled={loading||!password}
            style={{ width:'100%', background:'#FF6B35', color:'#fff', border:'none', borderRadius:8, padding:12, fontWeight:700, fontSize:15, cursor:loading?'wait':'pointer', opacity:(!password||loading)?.6:1, fontFamily:'system-ui,sans-serif' }}>
            {loading ? 'Verifying…' : 'Access Admin Panel →'}
          </button>
        </form>
        <p style={{ fontSize:11, color:'#555', marginTop:20 }}>Set password via <code style={{ background:'rgba(255,255,255,.05)', padding:'1px 5px', borderRadius:3, color:'#888' }}>ADMIN_PASSWORD</code> env var in Vercel.</p>
      </div>
    </div>
  );
}
