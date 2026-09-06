"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ firstname:"", lastname:"" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setResult(null);
    try {
      const r = await fetch("/api/search", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
      });
      const data = await r.json();
      setResult({status:r.status, data});
    } catch {
      setResult({status:500, data:{error:"Request failed"}});
    } finally { setLoading(false); }
  }

  return (
    <main style={{maxWidth:760,margin:"70px auto",padding:24}}>
      <div style={{background:"#fff",borderRadius:20,padding:32,boxShadow:"0 10px 35px rgba(0,0,0,.08)"}}>
        <h1 style={{marginTop:0}}>API Search Demo</h1>
        <p style={{color:"#667085"}}>A deployable Next.js frame with the API key kept on the server.</p>
        <form onSubmit={submit} style={{display:"grid",gap:16}}>
          <input required placeholder="First name" value={form.firstname}
            onChange={e=>setForm({...form,firstname:e.target.value})}
            style={input}/>
          <input required placeholder="Last name" value={form.lastname}
            onChange={e=>setForm({...form,lastname:e.target.value})}
            style={input}/>
          <button disabled={loading} style={button}>{loading?"Searching…":"Search API"}</button>
        </form>
        {result && <pre style={{marginTop:24,background:"#101828",color:"#fff",padding:18,borderRadius:12,overflow:"auto"}}>
          {JSON.stringify(result,null,2)}
        </pre>}
        <p style={{fontSize:12,color:"#98A2B3",marginBottom:0}}>
          Do not enter SSNs or other highly sensitive personal data into this demo unless the provider,
          your legal basis, and your security controls specifically authorize that use.
        </p>
      </div>
    </main>
  );
}
const input={padding:"14px 16px",border:"1px solid #d0d5dd",borderRadius:10,fontSize:16};
const button={padding:"14px 16px",border:0,borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer"};
