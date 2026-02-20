// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { MailIcon, LockIcon, UserIcon, PhoneIcon, EyeIcon, CheckIcon, BookIcon } from "../components/Icons";

function Field({ label, type="text", icon, placeholder, value, onChange, toggle, showToggle, onToggle }) {
  return (
    <div style={{ marginBottom:"15px" }}>
      <label style={{ display:"block", fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase",
        color:"rgba(230,210,170,0.5)", marginBottom:"7px", fontFamily:"var(--font-body)" }}>
        {label}
      </label>
      <div style={{ position:"relative" }}>
        <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)",
          color:"rgba(200,169,110,0.4)", display:"flex", pointerEvents:"none" }}>{icon}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
          className="input-base"
          style={{ padding:"11px 14px 11px 40px", paddingRight:toggle?"42px":"14px" }} />
        {toggle && (
          <button type="button" onClick={onToggle}
            style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)",
              background:"none", border:"none", cursor:"pointer", color:"rgba(200,169,110,0.4)",
              display:"flex", padding:"2px" }}>
            <EyeIcon size={15} open={showToggle}/>
          </button>
        )}
      </div>
    </div>
  );
}

function StrengthBar({ password }) {
  const checks = [
    { label:"8+ chars",  pass:password.length >= 8 },
    { label:"Uppercase", pass:/[A-Z]/.test(password) },
    { label:"Number",    pass:/[0-9]/.test(password) },
    { label:"Symbol",    pass:/[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter(c=>c.pass).length;
  const cols  = ["#e87c72","#e8a842","#8cc87a","#5cb85c"];
  if (!password) return null;
  return (
    <div style={{ marginBottom:"14px", marginTop:"-4px" }}>
      <div style={{ display:"flex", gap:"3px", marginBottom:"6px" }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ flex:1, height:"3px", borderRadius:"2px",
            background:i<score?cols[score-1]:"rgba(200,169,110,0.1)", transition:"background 0.25s" }} />
        ))}
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"5px 12px" }}>
        {checks.map((c,i) => (
          <span key={i} style={{ fontSize:"11px", display:"flex", alignItems:"center", gap:"3px",
            color:c.pass?"#8cc87a":"rgba(240,230,208,0.28)", transition:"color 0.2s" }}>
            <CheckIcon size={11}/> {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast     = useToast();

  const [page, setPage]         = useState("login");
  const [animOut, setAnimOut]   = useState(false);
  const [mounted, setMounted]   = useState(false);

  const [loginEmail, setLoginEmail]     = useState("");
  const [loginPass, setLoginPass]       = useState("");
  const [showLP, setShowLP]             = useState(false);
  const [role, setRole]                 = useState("member");
  const [remember, setRemember]         = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError]     = useState("");

  const [sName, setSName]     = useState("");
  const [sEmail, setSEmail]   = useState("");
  const [sPhone, setSPhone]   = useState("");
  const [sPass, setSPass]     = useState("");
  const [sCon, setSCon]       = useState("");
  const [showSP, setShowSP]   = useState(false);
  const [showCon, setShowCon] = useState(false);
  const [sRole, setSRole]     = useState("member");
  const [agree, setAgree]     = useState(false);
  const [signLoading, setSignLoading] = useState(false);
  const [signError, setSignError]     = useState("");

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const switchPage = (to) => {
    if (page === to || animOut) return;
    setAnimOut(true);
    setLoginError(""); setSignError("");
    setTimeout(() => { setPage(to); setAnimOut(false); }, 300);
  };

 const handleLogin = (e) => {
  e.preventDefault();
  setLoginError("");

  if (!loginEmail || !loginPass) {
    setLoginError("Please fill in all fields.");
    return;
  }

  // FAKE LOGIN SUCCESS
  const fakeUser = {
    name: "Demo User",
    role: role,
  };

  login("fake-token", fakeUser); // store fake login
  toast.success(`Welcome back, ${fakeUser.name}!`);

  const routes = {
    admin: "/admin",
    librarian: "/librarian",
    member: "/dashboard",
  };

  navigate(routes[role] || "/dashboard");
};


const handleSignup = (e) => {
  e.preventDefault();
  setSignError("");

  if (!sName || !sEmail || !sPass || !sCon) {
    setSignError("Please fill all required fields.");
    return;
  }

  if (sPass !== sCon) {
    setSignError("Passwords do not match.");
    return;
  }

  toast.success("Account created successfully! (UI Mode)");

  // Switch to login page
  switchPage("login");
};


  return (
    <>
      <style>{`
        .auth-form-wrap { opacity:${animOut?0:1}; transform:translateY(${animOut?"8px":"0"}); transition:opacity 0.25s,transform 0.25s; }
      `}</style>

      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        background:"var(--bg)", padding:"20px", position:"relative", overflow:"hidden" }}
        className="grid-bg">

        {/* BG radials */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:`radial-gradient(ellipse 70% 50% at 20% 50%,rgba(140,90,20,0.14) 0%,transparent 60%),
                      radial-gradient(ellipse 60% 60% at 80% 40%,rgba(180,130,40,0.09) 0%,transparent 55%)` }} />

        {/* Floating books */}
        {[{t:"5%",l:"3%",r:"-20deg",s:60,d:"0s"},{t:"72%",l:"2%",r:"25deg",s:38,d:"1.8s"},
          {t:"12%",r:"4%",l:undefined,rot:"18deg",s:58,d:"1s"},{t:"78%",r:"3%",l:undefined,rot:"-12deg",s:44,d:"2.2s"}].map((b,i)=>(
          <div key={i} style={{ position:"absolute", opacity:0.05, color:"var(--gold)",
            top:b.t, left:b.l, right:b.r,
            animation:`floatBook 6s ease-in-out ${b.d} infinite`,
            "--r": b.r || b.rot }}>
            <svg width={b.s} height={b.s} viewBox="0 0 24 24" fill="currentColor"
              style={{ transform:`rotate(var(--r))` }}>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
        ))}

        <style>{`@keyframes floatBook{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-10px) rotate(var(--r,0deg))}}`}</style>

        {/* Main card */}
        <div style={{ width:"100%", maxWidth:"920px", display:"flex", borderRadius:"18px", overflow:"hidden",
          border:"1px solid var(--gold-border)", boxShadow:"var(--shadow-lg)",
          opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)",
          transition:"opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}>

          {/* ── LEFT ── */}
          <div style={{ flex:1, background:"linear-gradient(145deg,#1a1206,#0f0b04)",
            padding:"48px 42px", display:"flex", flexDirection:"column", justifyContent:"space-between",
            borderRight:"1px solid var(--gold-border)", position:"relative" }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",
              background:"linear-gradient(90deg,transparent,var(--gold),transparent)", opacity:0.35 }} />

            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"11px", marginBottom:"44px" }}>
                <span style={{ color:"var(--gold)", filter:"drop-shadow(0 0 10px rgba(200,169,110,0.5))" }}><BookIcon size={24}/></span>
                <div>
                  <div style={{ fontFamily:"var(--font-display)", fontSize:"15px", letterSpacing:"0.28em", textTransform:"uppercase", color:"var(--gold)" }}>Digital</div>
                  <div style={{ fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(200,169,110,0.35)" }}>Library Management</div>
                </div>
              </div>

              <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(30px,4vw,50px)", fontWeight:300, color:"var(--text)", lineHeight:1.08, marginBottom:"16px" }}>
                {page==="login"
                  ? <><span style={{display:"block"}}>Welcome</span><span style={{display:"block",fontStyle:"italic",color:"var(--gold)"}}>back.</span></>
                  : <><span style={{display:"block"}}>Join the</span><span style={{display:"block",fontStyle:"italic",color:"var(--gold)"}}>library.</span></>}
              </h1>

              <p style={{ fontSize:"13px", color:"var(--text-dim)", lineHeight:1.8, marginBottom:"38px", maxWidth:"280px" }}>
                {page==="login"
                  ? "Sign in to manage books, track your checkouts and explore your reading journey."
                  : "Create your account and unlock access to thousands of books and library resources."}
              </p>

              <div style={{ display:"flex", borderTop:"1px solid var(--gold-border)", paddingTop:"24px", gap:0 }}>
                {[["12,400+","Books"],["3,200","Members"],["98%","Available"]].map((s,i)=>(
                  <div key={i} style={{ flex:1, paddingRight:i<2?"18px":0, borderRight:i<2?"1px solid var(--gold-border)":0, paddingLeft:i>0?"18px":0 }}>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--gold)" }}>{s[0]}</div>
                    <div style={{ fontSize:"10px", letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--text-dim)", marginTop:"2px" }}>{s[1]}</div>
                  </div>
                ))}
              </div>
            </div>

            <blockquote style={{ marginTop:"36px", paddingTop:"20px", borderTop:"1px solid rgba(200,169,110,0.07)" }}>
              <p style={{ fontFamily:"var(--font-display)", fontSize:"13px", fontStyle:"italic", color:"rgba(240,230,208,0.22)", lineHeight:1.7 }}>
                "A library is not a luxury but one of the necessities of life."
              </p>
              <cite style={{ fontSize:"11px", color:"rgba(200,169,110,0.28)", marginTop:"5px", display:"block", letterSpacing:"0.08em" }}>— Henry Ward Beecher</cite>
            </blockquote>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ width:"410px", flexShrink:0, background:"rgba(16,12,4,0.97)",
            backdropFilter:"blur(16px)", padding:"40px 36px",
            display:"flex", flexDirection:"column", justifyContent:"center" }}>

            {/* Tab switcher */}
            <div style={{ display:"flex", background:"rgba(200,169,110,0.05)", border:"1px solid var(--gold-border)",
              borderRadius:"10px", padding:"3px", marginBottom:"26px", gap:"2px" }}>
              {[["login","Sign In"],["signup","Sign Up"]].map(([v,l]) => (
                <button key={v} onClick={() => switchPage(v)}
                  style={{ flex:1, padding:"9px", border:"none", borderRadius:"7px", cursor:"pointer",
                    fontFamily:"var(--font-body)", fontSize:"13px", fontWeight:page===v?600:400,
                    background:page===v?"rgba(200,169,110,0.16)":"transparent",
                    color:page===v?"var(--gold)":"var(--text-dim)", outline:"none", transition:"all 0.18s" }}>
                  {l}
                </button>
              ))}
            </div>

            <div className="auth-form-wrap">

              {/* LOGIN */}
              {page === "login" && (
                <form onSubmit={handleLogin}>
                  <p style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--text)", marginBottom:"3px", fontWeight:300 }}>Sign In</p>
                  <p style={{ fontSize:"12px", color:"var(--text-dim)", marginBottom:"20px" }}>Enter your credentials to continue</p>

                  <div style={{ display:"flex", gap:"5px", marginBottom:"18px" }}>
                    {["member","librarian","admin"].map(r => (
                      <button key={r} type="button" onClick={() => setRole(r)}
                        style={{ flex:1, padding:"7px 0", border:`1px solid ${role===r?"rgba(200,169,110,0.4)":"rgba(200,169,110,0.1)"}`,
                          borderRadius:"7px", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:"11px",
                          textTransform:"capitalize", letterSpacing:"0.06em", outline:"none", transition:"all 0.15s",
                          background:role===r?"rgba(200,169,110,0.12)":"transparent",
                          color:role===r?"var(--gold)":"var(--text-dim)" }}>
                        {r}
                      </button>
                    ))}
                  </div>

                  <Field label="Email" type="email" icon={<MailIcon size={15}/>} placeholder="you@email.com"
                    value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} />
                  <Field label="Password" type={showLP?"text":"password"} icon={<LockIcon size={15}/>} placeholder="••••••••"
                    value={loginPass} onChange={e=>setLoginPass(e.target.value)}
                    toggle showToggle={showLP} onToggle={()=>setShowLP(!showLP)} />

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px", marginTop:"-3px" }}>
                    <label style={{ display:"flex", alignItems:"center", gap:"6px", cursor:"pointer", fontSize:"12px", color:"var(--text-muted)", userSelect:"none" }}>
                      <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}
                        style={{ accentColor:"var(--gold)", width:"13px", height:"13px", cursor:"pointer" }} />
                      Remember me
                    </label>
                    <a href="#" style={{ fontSize:"12px", color:"rgba(200,169,110,0.5)", textDecoration:"none",
                      transition:"color 0.2s" }}
                      onMouseEnter={e=>e.target.style.color="var(--gold)"}
                      onMouseLeave={e=>e.target.style.color="rgba(200,169,110,0.5)"}>
                      Forgot password?
                    </a>
                  </div>

                  {loginError && <div style={{ background:"rgba(220,80,60,0.08)", border:"1px solid rgba(220,80,60,0.2)", borderRadius:"8px", padding:"10px 12px", marginBottom:"14px", fontSize:"12px", color:"var(--red)" }}>⚠ {loginError}</div>}

                  <button type="submit" className="btn btn-primary" disabled={loginLoading}
                    style={{ width:"100%", padding:"13px", letterSpacing:"0.18em", textTransform:"uppercase", fontSize:"12px", fontWeight:600, marginBottom:"16px" }}>
                    {loginLoading
                      ? <span style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <span style={{ width:"13px", height:"13px", border:"2px solid rgba(26,18,8,0.3)", borderTopColor:"#1a1208", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />
                          Signing in…
                        </span>
                      : "Sign In"}
                  </button>

                  <p style={{ textAlign:"center", fontSize:"12px", color:"var(--text-dim)" }}>
                    New here?{" "}
                    <span onClick={()=>switchPage("signup")} style={{ color:"var(--gold)", cursor:"pointer", fontWeight:600, transition:"opacity 0.2s" }}
                      onMouseEnter={e=>e.target.style.opacity="0.75"} onMouseLeave={e=>e.target.style.opacity="1"}>
                      Create account
                    </span>
                  </p>
                </form>
              )}

              {/* SIGNUP */}
              {page === "signup" && (
                <form onSubmit={handleSignup}>
                  <p style={{ fontFamily:"var(--font-display)", fontSize:"20px", color:"var(--text)", marginBottom:"3px", fontWeight:300 }}>Create Account</p>
                  <p style={{ fontSize:"12px", color:"var(--text-dim)", marginBottom:"20px" }}>Fill in the details below</p>

                  <div style={{ display:"flex", gap:"5px", marginBottom:"16px" }}>
                    {["member","librarian"].map(r => (
                      <button key={r} type="button" onClick={() => setSRole(r)}
                        style={{ flex:1, padding:"7px 0", border:`1px solid ${sRole===r?"rgba(200,169,110,0.4)":"rgba(200,169,110,0.1)"}`,
                          borderRadius:"7px", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:"11px",
                          textTransform:"capitalize", letterSpacing:"0.06em", outline:"none", transition:"all 0.15s",
                          background:sRole===r?"rgba(200,169,110,0.12)":"transparent",
                          color:sRole===r?"var(--gold)":"var(--text-dim)" }}>
                        {r}
                      </button>
                    ))}
                  </div>

                  <Field label="Full Name" icon={<UserIcon size={15}/>} placeholder="John Doe" value={sName} onChange={e=>setSName(e.target.value)} />
                  <Field label="Email" type="email" icon={<MailIcon size={15}/>} placeholder="you@email.com" value={sEmail} onChange={e=>setSEmail(e.target.value)} />
                  <Field label="Phone (optional)" icon={<PhoneIcon size={15}/>} placeholder="+91 98765 43210" value={sPhone} onChange={e=>setSPhone(e.target.value)} />
                  <Field label="Password" type={showSP?"text":"password"} icon={<LockIcon size={15}/>} placeholder="Create a strong password"
                    value={sPass} onChange={e=>setSPass(e.target.value)} toggle showToggle={showSP} onToggle={()=>setShowSP(!showSP)} />
                  <StrengthBar password={sPass} />
                  <Field label="Confirm Password" type={showCon?"text":"password"} icon={<LockIcon size={15}/>} placeholder="Re-enter password"
                    value={sCon} onChange={e=>setSCon(e.target.value)} toggle showToggle={showCon} onToggle={()=>setShowCon(!showCon)} />

                  <label style={{ display:"flex", alignItems:"flex-start", gap:"7px", cursor:"pointer",
                    fontSize:"12px", color:"var(--text-dim)", marginBottom:"16px", userSelect:"none", lineHeight:1.5 }}>
                    <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}
                      style={{ accentColor:"var(--gold)", width:"13px", height:"13px", cursor:"pointer", flexShrink:0, marginTop:"2px" }} />
                    I agree to the{" "}
                    <a href="#" style={{ color:"rgba(200,169,110,0.65)", textDecoration:"none", marginLeft:"3px" }}>Terms</a>
                    {" "}&{" "}
                    <a href="#" style={{ color:"rgba(200,169,110,0.65)", textDecoration:"none" }}>Privacy Policy</a>
                  </label>

                  {signError && <div style={{ background:"rgba(220,80,60,0.08)", border:"1px solid rgba(220,80,60,0.2)", borderRadius:"8px", padding:"10px 12px", marginBottom:"12px", fontSize:"12px", color:"var(--red)" }}>⚠ {signError}</div>}

                  <button type="submit" className="btn btn-primary" disabled={signLoading}
                    style={{ width:"100%", padding:"13px", letterSpacing:"0.18em", textTransform:"uppercase", fontSize:"12px", fontWeight:600, marginBottom:"16px" }}>
                    {signLoading
                      ? <span style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <span style={{ width:"13px", height:"13px", border:"2px solid rgba(26,18,8,0.3)", borderTopColor:"#1a1208", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }} />
                          Creating…
                        </span>
                      : "Create Account"}
                  </button>

                  <p style={{ textAlign:"center", fontSize:"12px", color:"var(--text-dim)" }}>
                    Already a member?{" "}
                    <span onClick={()=>switchPage("login")} style={{ color:"var(--gold)", cursor:"pointer", fontWeight:600 }}>Sign in</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
