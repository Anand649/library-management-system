// src/pages/MemberDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { BookIcon, ClockIcon, CheckIcon, HeartIcon, StarIcon, ArrowReturnIcon, RefreshIcon } from "../components/Icons";

function StatCard({ label, value, sub, color, icon: Icon, delay }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const n = parseInt(value);
    if (isNaN(n)) return;
    let c = 0; const step = Math.ceil(n/28);
    const t = setInterval(() => { c = Math.min(c+step,n); setCount(c); if(c>=n)clearInterval(t); }, 45);
    return ()=>clearInterval(t);
  }, [value]);

  return (
    <div className="card anim-fade-up" style={{ animationDelay:delay, cursor:"default", position:"relative", overflow:"hidden",
      transition:"transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,0.4)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px", background:`linear-gradient(90deg,transparent,${color},transparent)`, opacity:0.6 }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:"10px" }}>{label}</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:"38px", color, lineHeight:1, marginBottom:"5px", fontWeight:300 }}>
            {isNaN(parseInt(value)) ? value : count}
          </div>
          <div style={{ fontSize:"12px", color:"var(--text-dim)" }}>{sub}</div>
        </div>
        <div style={{ color, opacity:0.25, marginTop:"2px" }}><Icon size={32}/></div>
      </div>
      <div style={{ position:"absolute",bottom:"-12px",right:"-12px",width:"60px",height:"60px",borderRadius:"50%",background:color,opacity:0.05 }} />
    </div>
  );
}

const BORROWED = [
  { id:1, title:"The Great Gatsby",   author:"F. Scott Fitzgerald", cover:"#6B3A2A", dueDate:"Feb 20, 2026", daysLeft:4,  progress:65, rating:4 },
  { id:2, title:"Atomic Habits",       author:"James Clear",          cover:"#2A4A3E", dueDate:"Feb 25, 2026", daysLeft:12, progress:30, rating:5 },
  { id:3, title:"Dune",               author:"Frank Herbert",         cover:"#1A3A5C", dueDate:"Mar 1, 2026",  daysLeft:16, progress:80, rating:5 },
];
const WISHLIST = [
  { id:4, title:"1984",           author:"George Orwell",    cover:"#3A1A1A", available:true  },
  { id:5, title:"Sapiens",        author:"Yuval N. Harari",  cover:"#1A3A1A", available:false },
  { id:6, title:"The Alchemist",  author:"Paulo Coelho",     cover:"#3A2A1A", available:true  },
];
const ACTIVITY = [
  { id:1, type:"borrow",  text:"Borrowed The Great Gatsby",         date:"Feb 6" },
  { id:2, type:"return",  text:"Returned To Kill a Mockingbird",    date:"Feb 1" },
  { id:3, type:"renew",   text:"Renewed Atomic Habits",             date:"Jan 28" },
  { id:4, type:"wish",    text:"Saved 1984 to wishlist",            date:"Jan 22" },
  { id:5, type:"return",  text:"Returned The Hobbit",               date:"Jan 15" },
];

export default function MemberDashboard() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => {
    const h = new Date().getHours();
    if (h>=12&&h<17) setGreeting("Good afternoon");
    else if (h>=17) setGreeting("Good evening");
  }, []);

  const actColor = { borrow:"var(--gold)", return:"var(--green)", renew:"var(--blue)", wish:"#d46a8a" };
  const actIcon  = { borrow:<BookIcon size={13}/>, return:<CheckIcon size={13}/>, renew:<RefreshIcon size={13}/>, wish:<HeartIcon size={13}/> };

  return (
    <div className="anim-fade-in">
      {/* Greeting */}
      <div style={{ marginBottom:"28px" }}>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"28px", fontWeight:300, color:"var(--text)" }}>
          {greeting},{" "}
          <span style={{ color:"var(--gold)", fontStyle:"italic" }}>{user?.name?.split(" ")[0] || "Reader"}</span> 👋
        </h2>
        <p style={{ color:"var(--text-dim)", fontSize:"13px", marginTop:"4px" }}>
          Here's your reading activity at a glance.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:"16px", marginBottom:"28px" }}>
        <StatCard label="Books Borrowed" value="3"  sub="Currently active"   color="var(--gold)"  icon={BookIcon}        delay="0.05s" />
        <StatCard label="Due This Week"  value="1"  sub="Return by Feb 20"   color="var(--red)"   icon={ClockIcon}       delay="0.1s" />
        <StatCard label="Books Read"     value="28" sub="Total this year"     color="var(--green)" icon={CheckIcon}       delay="0.15s" />
        <StatCard label="Wishlist"       value="3"  sub="Books saved"         color="var(--blue)"  icon={HeartIcon}       delay="0.2s" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:"20px", marginBottom:"20px" }}>
        {/* Borrowed books */}
        <div className="card anim-fade-up" style={{ animationDelay:"0.25s" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Currently Borrowed</div>
              <div className="section-sub">3 books active</div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {BORROWED.map(b => {
              const urgent = b.daysLeft <= 5;
              return (
                <div key={b.id} style={{ display:"flex", gap:"14px", alignItems:"flex-start",
                  padding:"14px", background:"rgba(200,169,110,0.03)", border:`1px solid ${urgent?"rgba(232,122,90,0.2)":"rgba(200,169,110,0.08)"}`,
                  borderRadius:"10px", transition:"background 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(200,169,110,0.06)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(200,169,110,0.03)"}>
                  {/* Cover */}
                  <div style={{ width:"50px", height:"68px", borderRadius:"5px", background:b.cover, flexShrink:0,
                    boxShadow:"3px 3px 10px rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                    <div style={{ position:"absolute",left:0,top:0,bottom:0,width:"5px",background:"rgba(0,0,0,0.25)",borderRadius:"5px 0 0 5px" }} />
                    <span style={{ color:"rgba(255,255,255,0.18)", marginLeft:"5px" }}><BookIcon size={16}/></span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px", marginBottom:"6px" }}>
                      <div>
                        <div style={{ fontSize:"14px", color:"var(--text)", fontWeight:"500", marginBottom:"1px" }}>{b.title}</div>
                        <div style={{ fontSize:"12px", color:"var(--text-dim)" }}>{b.author}</div>
                      </div>
                      <span className={urgent?"badge badge-red":"badge badge-green"}>{b.daysLeft}d left</span>
                    </div>
                    {/* Progress */}
                    <div style={{ marginBottom:"8px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                        <span style={{ fontSize:"11px", color:"var(--text-dim)" }}>Progress</span>
                        <span style={{ fontSize:"11px", color:"rgba(200,169,110,0.6)" }}>{b.progress}%</span>
                      </div>
                      <div style={{ height:"3px", background:"rgba(200,169,110,0.1)", borderRadius:"2px", overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${b.progress}%`, background:"linear-gradient(90deg,var(--gold),var(--gold-light))", borderRadius:"2px" }} />
                      </div>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:"11px", color:"var(--text-dim)", display:"flex", alignItems:"center", gap:"4px" }}>
                        <ClockIcon size={11}/> Due {b.dueDate}
                      </span>
                      <button className="btn btn-ghost" style={{ padding:"4px 10px", fontSize:"11px" }}>Renew</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          {/* Wishlist */}
          <div className="card anim-fade-up" style={{ animationDelay:"0.3s" }}>
            <div className="section-header" style={{ marginBottom:"14px" }}>
              <div className="section-title" style={{ fontSize:"16px" }}>Wishlist</div>
              <span style={{ color:"rgba(200,169,110,0.4)" }}><HeartIcon size={15}/></span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"9px" }}>
              {WISHLIST.map(b => (
                <div key={b.id} style={{ display:"flex", gap:"11px", alignItems:"center",
                  padding:"10px", background:"rgba(200,169,110,0.03)", borderRadius:"8px",
                  border:"1px solid rgba(200,169,110,0.07)", transition:"background 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(200,169,110,0.06)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(200,169,110,0.03)"}>
                  <div style={{ width:"36px", height:"50px", borderRadius:"4px", background:b.cover, flexShrink:0, boxShadow:"2px 2px 8px rgba(0,0,0,0.4)" }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"13px", color:"var(--text)", marginBottom:"2px", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{b.title}</div>
                    <div style={{ fontSize:"11px", color:"var(--text-dim)", marginBottom:"6px" }}>{b.author}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span className={b.available?"badge badge-green":"badge badge-red"} style={{ fontSize:"10px", padding:"2px 7px" }}>
                        {b.available?"Available":"Checked Out"}
                      </span>
                      {b.available && <button className="btn btn-ghost" style={{ padding:"3px 9px", fontSize:"10px" }}>Borrow</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="card anim-fade-up" style={{ animationDelay:"0.35s" }}>
            <div className="section-title" style={{ fontSize:"16px", marginBottom:"14px" }}>Recent Activity</div>
            {ACTIVITY.map((a,i) => (
              <div key={a.id} style={{ display:"flex", alignItems:"center", gap:"11px", padding:"10px 0",
                borderBottom:i<ACTIVITY.length-1?"1px solid rgba(200,169,110,0.05)":"none" }}>
                <div style={{ width:"30px", height:"30px", borderRadius:"50%", flexShrink:0, display:"flex",
                  alignItems:"center", justifyContent:"center", color:actColor[a.type],
                  background:`${actColor[a.type]}15`, border:`1px solid ${actColor[a.type]}28` }}>
                  {actIcon[a.type]}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"12px", color:"var(--text-muted)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.text}</div>
                  <div style={{ fontSize:"11px", color:"var(--text-dim)", marginTop:"1px" }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reading goal */}
      <div className="card anim-fade-up" style={{ animationDelay:"0.4s",
        background:"linear-gradient(135deg,rgba(200,169,110,0.07),rgba(139,69,19,0.07))",
        border:"1px solid rgba(200,169,110,0.12)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"20px", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:"200px" }}>
            <div style={{ fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(200,169,110,0.5)", marginBottom:"6px" }}>2026 Reading Goal</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"26px", color:"var(--text)", marginBottom:"10px", fontWeight:300 }}>
              28 <span style={{ fontSize:"16px", color:"var(--text-dim)" }}>of</span> 50 books
            </div>
            <div style={{ width:"100%", maxWidth:"320px", height:"5px", background:"rgba(200,169,110,0.1)", borderRadius:"3px", overflow:"hidden", marginBottom:"8px" }}>
              <div style={{ height:"100%", width:"56%", background:"linear-gradient(90deg,var(--gold),var(--gold-light))", borderRadius:"3px" }} />
            </div>
            <div style={{ fontSize:"12px", color:"var(--text-dim)" }}>56% complete — you're ahead of schedule! 🎉</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:"11px", color:"rgba(200,169,110,0.4)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"7px" }}>Avg Rating</div>
            <div style={{ display:"flex", gap:"3px", justifyContent:"flex-end", marginBottom:"6px" }}>
              {[1,2,3,4,5].map(i => <StarIcon key={i} size={16} filled={i<=4}/>)}
            </div>
            <div style={{ fontSize:"11px", color:"var(--text-dim)" }}>4.0 / 5 this year</div>
          </div>
        </div>
      </div>
    </div>
  );
}
