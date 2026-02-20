// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { BookIcon, UsersIcon, BarChartIcon, TrendUpIcon, TrashIcon, EditIcon, PlusIcon, CheckIcon, CloseIcon, ClockIcon } from "../components/Icons";

const SYSTEM_STATS = [
  { label:"Total Books",    value:"1,240", delta:"+12",  color:"var(--gold)",   Icon:BookIcon     },
  { label:"Total Members",  value:"342",   delta:"+28",  color:"var(--blue)",   Icon:UsersIcon    },
  { label:"Issued Today",   value:"23",    delta:"+5",   color:"var(--purple)", Icon:TrendUpIcon  },
  { label:"Revenue (₹)",    value:"8,400", delta:"+₹640",color:"var(--green)",  Icon:BarChartIcon },
];

const LIBRARIANS = [
  { id:1, name:"Kavitha R.",    email:"kavitha@lib.com", joined:"Jan 2024", books:45, status:"active" },
  { id:2, name:"Suresh M.",     email:"suresh@lib.com",  joined:"Mar 2023", books:62, status:"active" },
  { id:3, name:"Deepa V.",      email:"deepa@lib.com",   joined:"Jul 2024", books:28, status:"inactive" },
];

const RECENT_USERS = [
  { id:1, name:"Arjun Sharma",  role:"member",    date:"Feb 14" },
  { id:2, name:"Priya Nair",    role:"member",    date:"Feb 13" },
  { id:3, name:"Kavitha R.",    role:"librarian", date:"Feb 12" },
  { id:4, name:"Rohit Kumar",   role:"member",    date:"Feb 11" },
  { id:5, name:"Sneha Patel",   role:"member",    date:"Feb 10" },
];

const MONTHS = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb"];
const BAR_DATA = [
  { month:"Aug", issue:45, ret:40 },
  { month:"Sep", issue:52, ret:48 },
  { month:"Oct", issue:61, ret:55 },
  { month:"Nov", issue:48, ret:44 },
  { month:"Dec", issue:38, ret:35 },
  { month:"Jan", issue:70, ret:62 },
  { month:"Feb", issue:87, ret:74 },
];

function BarChart() {
  const max = Math.max(...BAR_DATA.map(d => d.issue));
  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:"10px", height:"120px", marginBottom:"8px" }}>
        {BAR_DATA.map((d,i) => (
          <div key={i} style={{ flex:1, display:"flex", gap:"3px", alignItems:"flex-end", height:"100%" }}>
            <div style={{ flex:1, borderRadius:"4px 4px 0 0",
              background:"linear-gradient(180deg,var(--gold),rgba(200,169,110,0.4))",
              height:`${(d.issue/max)*100}%`, minHeight:"4px", transition:"height 0.5s ease",
              transitionDelay:`${i*0.06}s` }} title={`Issued: ${d.issue}`} />
            <div style={{ flex:1, borderRadius:"4px 4px 0 0",
              background:"linear-gradient(180deg,var(--green),rgba(140,200,122,0.3))",
              height:`${(d.ret/max)*100}%`, minHeight:"4px", transition:"height 0.5s ease",
              transitionDelay:`${i*0.06+0.03}s` }} title={`Returned: ${d.ret}`} />
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:"10px" }}>
        {BAR_DATA.map((d,i) => (
          <div key={i} style={{ flex:1, textAlign:"center", fontSize:"10px", color:"var(--text-dim)" }}>{d.month}</div>
        ))}
      </div>
      <div style={{ display:"flex", gap:"16px", marginTop:"10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"11px", color:"var(--text-dim)" }}>
          <div style={{ width:"10px",height:"10px",borderRadius:"2px",background:"var(--gold)" }} /> Issued
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"11px", color:"var(--text-dim)" }}>
          <div style={{ width:"10px",height:"10px",borderRadius:"2px",background:"var(--green)" }} /> Returned
        </div>
      </div>
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s,d)=>s+d.value,0);
  let offset  = 0;
  const r = 40, cx=50, cy=50, circ = 2*Math.PI*r;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        {data.map((d,i) => {
          const frac = d.value/total;
          const dash = frac*circ;
          const gap  = circ-dash;
          const rot  = offset * 360 - 90;
          offset += frac;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color}
              strokeWidth="16" strokeDasharray={`${dash} ${gap}`}
              transform={`rotate(${rot} ${cx} ${cy})`}
              style={{ transition:"stroke-dasharray 0.8s ease", transitionDelay:`${i*0.1}s` }} />
          );
        })}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle"
          fill="var(--text)" fontSize="14" fontFamily="var(--font-display)" fontWeight="300">{total}</text>
        <text x="50" y="62" textAnchor="middle" fill="var(--text-dim)" fontSize="7" fontFamily="var(--font-body)">members</text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {data.map((d,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
            <div style={{ width:"9px",height:"9px",borderRadius:"2px",background:d.color,flexShrink:0 }} />
            <span style={{ fontSize:"12px", color:"var(--text-dim)" }}>{d.label}</span>
            <span style={{ fontSize:"12px", color:d.color, marginLeft:"auto", paddingLeft:"10px" }}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"22px" }}>
          <h3 style={{ fontFamily:"var(--font-display)",fontSize:"20px",fontWeight:400,color:"var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text-dim)",display:"flex" }}><CloseIcon size={18}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab]   = useState("overview");
  const [showAdd, setShowAdd] = useState(false);
  const [librarians, setLibrarians] = useState(LIBRARIANS);
  const [newLib, setNewLib] = useState({ name:"", email:"", password:"" });

  const TABS = [
    { key:"overview",   label:"Overview" },
    { key:"librarians", label:"Librarians" },
    { key:"reports",    label:"Reports" },
    { key:"settings",   label:"Settings" },
  ];

  const memberDist = [
    { label:"Active",    value:280, color:"var(--green)"  },
    { label:"Overdue",   value:42,  color:"var(--red)"    },
    { label:"Suspended", value:20,  color:"var(--text-dim)"},
  ];

  return (
    <div className="anim-fade-in">
      {/* Tabs */}
      <div style={{ display:"flex", gap:"4px", marginBottom:"24px", background:"rgba(200,169,110,0.05)", border:"1px solid var(--gold-border)", borderRadius:"10px", padding:"4px", width:"fit-content" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={()=>setTab(t.key)}
            style={{ padding:"9px 18px", border:"none", borderRadius:"8px", cursor:"pointer",
              fontFamily:"var(--font-body)", fontSize:"13px", fontWeight:tab===t.key?600:400, transition:"all 0.18s",
              background:tab===t.key?"rgba(200,169,110,0.15)":"transparent",
              color:tab===t.key?"var(--gold)":"var(--text-dim)" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <div className="anim-scale-in">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"24px" }}>
            {SYSTEM_STATS.map((s,i) => (
              <div key={i} className="card" style={{ position:"relative", overflow:"hidden", cursor:"default",
                transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.35)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent,${s.color},transparent)`,opacity:0.6 }} />
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:"9px" }}>{s.label}</div>
                    <div style={{ fontFamily:"var(--font-display)", fontSize:"30px", color:s.color, lineHeight:1, marginBottom:"4px", fontWeight:300 }}>{s.value}</div>
                    <span style={{ fontSize:"11px", color:"var(--green)" }}>{s.delta} this month</span>
                  </div>
                  <div style={{ color:s.color, opacity:0.2 }}><s.Icon size={28}/></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"20px", marginBottom:"20px" }}>
            <div className="card">
              <div className="section-header">
                <div className="section-title" style={{ fontSize:"17px" }}>Issue & Return Trends</div>
                <span className="badge badge-gold" style={{ fontSize:"11px" }}>Last 7 months</span>
              </div>
              <BarChart />
            </div>
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"18px" }}>Member Status</div>
              <DonutChart data={memberDist} />
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"14px" }}>Recent Registrations</div>
              {RECENT_USERS.map((u,i) => (
                <div key={u.id} style={{ display:"flex", alignItems:"center", gap:"11px", padding:"9px 0",
                  borderBottom:i<RECENT_USERS.length-1?"1px solid rgba(200,169,110,0.06)":"none" }}>
                  <div style={{ width:"32px",height:"32px",borderRadius:"50%",background:"linear-gradient(135deg,#6B3A2A,#c8a96e)",
                    display:"flex",alignItems:"center",justifyContent:"center",color:"#1a1208",fontSize:"11px",fontWeight:"700",flexShrink:0 }}>
                    {u.name.split(" ").map(n=>n[0]).join("")}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"13px", color:"var(--text)", fontWeight:"500" }}>{u.name}</div>
                    <div style={{ fontSize:"11px", color:"var(--text-dim)" }}>{u.date}</div>
                  </div>
                  <span className={u.role==="librarian"?"badge badge-blue":"badge badge-gold"} style={{ fontSize:"10px" }}>{u.role}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"14px" }}>System Health</div>
              {[
                { label:"Database",    status:"Healthy",   color:"var(--green)",  pct:99 },
                { label:"API Server",  status:"Running",   color:"var(--green)",  pct:98 },
                { label:"Storage",     status:"78% used",  color:"var(--gold)",   pct:78 },
                { label:"Backup",      status:"Last: 2h",  color:"var(--blue)",   pct:100 },
              ].map((s,i) => (
                <div key={i} style={{ marginBottom:"14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                    <span style={{ fontSize:"12px", color:"var(--text-muted)" }}>{s.label}</span>
                    <span style={{ fontSize:"12px", color:s.color }}>{s.status}</span>
                  </div>
                  <div style={{ height:"4px", background:"rgba(200,169,110,0.1)", borderRadius:"2px", overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${s.pct}%`, background:s.color, borderRadius:"2px", opacity:0.7 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LIBRARIANS ── */}
      {tab === "librarians" && (
        <div className="anim-scale-in">
          <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"20px" }}>
            <button className="btn btn-primary" onClick={()=>setShowAdd(true)}><PlusIcon size={15}/> Add Librarian</button>
          </div>
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <table className="table-base">
              <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Books Managed</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {librarians.map(l => (
                  <tr key={l.id}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        <div style={{ width:"32px",height:"32px",borderRadius:"50%",background:"linear-gradient(135deg,#1A3A5C,#6ab0d4)",
                          display:"flex",alignItems:"center",justifyContent:"center",color:"#0f1a28",fontSize:"11px",fontWeight:"700",flexShrink:0 }}>
                          {l.name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <span style={{ color:"var(--text)", fontWeight:"500" }}>{l.name}</span>
                      </div>
                    </td>
                    <td style={{ fontSize:"12px" }}>{l.email}</td>
                    <td style={{ fontSize:"12px" }}>{l.joined}</td>
                    <td>{l.books}</td>
                    <td>
                      <span className={l.status==="active"?"badge badge-green":"badge badge-red"}>{l.status}</span>
                    </td>
                    <td>
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button style={{ background:"none",border:"none",cursor:"pointer",color:"var(--blue)",padding:"4px" }}><EditIcon size={15}/></button>
                        <button onClick={()=>setLibrarians(p=>p.filter(x=>x.id!==l.id))} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--red)",padding:"4px" }}><TrashIcon size={15}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── REPORTS ── */}
      {tab === "reports" && (
        <div className="anim-scale-in">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"16px", marginBottom:"24px" }}>
            {[
              { title:"Monthly Report",  sub:"Books, members, revenue",     icon:<BarChartIcon size={20}/>, color:"var(--gold)"   },
              { title:"Overdue Report",  sub:"All overdue transactions",     icon:<ClockIcon size={20}/>,   color:"var(--red)"    },
              { title:"Member Activity", sub:"Borrowing patterns by member", icon:<UsersIcon size={20}/>,   color:"var(--blue)"   },
              { title:"Book Popularity", sub:"Most borrowed books",          icon:<BookIcon size={20}/>,    color:"var(--purple)" },
            ].map((r,i) => (
              <div key={i} className="card" style={{ display:"flex", alignItems:"center", gap:"16px", cursor:"pointer",
                transition:"all 0.2s", border:"1px solid var(--gold-border)" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(200,169,110,0.07)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="var(--bg-card)"; e.currentTarget.style.transform=""; }}>
                <div style={{ width:"44px",height:"44px",borderRadius:"10px",background:`${r.color}15`,border:`1px solid ${r.color}25`,
                  display:"flex",alignItems:"center",justifyContent:"center",color:r.color,flexShrink:0 }}>
                  {r.icon}
                </div>
                <div>
                  <div style={{ fontSize:"14px", color:"var(--text)", fontWeight:"500" }}>{r.title}</div>
                  <div style={{ fontSize:"12px", color:"var(--text-dim)", marginTop:"2px" }}>{r.sub}</div>
                </div>
                <button className="btn btn-ghost" style={{ marginLeft:"auto", padding:"6px 12px", fontSize:"11px" }}>Export</button>
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"16px" }}>Issue/Return Trends</div>
              <BarChart />
            </div>
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"16px" }}>Top Genres</div>
              {[
                { genre:"Fiction",    count:320, pct:80 },
                { genre:"Self-Help",  count:240, pct:60 },
                { genre:"Sci-Fi",     count:180, pct:45 },
                { genre:"Classic",    count:150, pct:38 },
                { genre:"History",    count:110, pct:28 },
              ].map((g,i) => (
                <div key={i} style={{ marginBottom:"13px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                    <span style={{ fontSize:"13px", color:"var(--text-muted)" }}>{g.genre}</span>
                    <span style={{ fontSize:"12px", color:"var(--gold)" }}>{g.count} borrowed</span>
                  </div>
                  <div style={{ height:"4px", background:"rgba(200,169,110,0.1)", borderRadius:"2px", overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${g.pct}%`, background:"linear-gradient(90deg,var(--gold),var(--gold-light))", borderRadius:"2px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SETTINGS ── */}
      {tab === "settings" && (
        <div className="anim-scale-in" style={{ maxWidth:"600px" }}>
          {[
            { title:"Library Info",     fields:[{ label:"Library Name",placeholder:"Bibliotheca City Library" },{ label:"Address",placeholder:"123 Main St, City" },{ label:"Contact Email",placeholder:"admin@library.com" }] },
            { title:"Borrowing Rules",  fields:[{ label:"Default Loan Period (days)",placeholder:"14" },{ label:"Max Books per Member",placeholder:"5" },{ label:"Fine per Day (₹)",placeholder:"5" }] },
          ].map((section,i) => (
            <div key={i} className="card" style={{ marginBottom:"16px" }}>
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"18px" }}>{section.title}</div>
              {section.fields.map((f,j) => (
                <div key={j} style={{ marginBottom:"14px" }}>
                  <label style={{ display:"block",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:"6px" }}>{f.label}</label>
                  <input className="input-base" placeholder={f.placeholder} style={{ padding:"10px 14px" }} />
                </div>
              ))}
              <button className="btn btn-primary" style={{ padding:"9px 20px", fontSize:"12px" }}>
                <CheckIcon size={14}/> Save Changes
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Librarian Modal */}
      {showAdd && (
        <Modal title="Add Librarian" onClose={()=>setShowAdd(false)}>
          {["name","email","password"].map(f => (
            <div key={f} style={{ marginBottom:"14px" }}>
              <label style={{ display:"block",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:"6px" }}>{f.charAt(0).toUpperCase()+f.slice(1)}</label>
              <input className="input-base" type={f==="password"?"password":"text"} placeholder={`Enter ${f}…`}
                value={newLib[f]} onChange={e=>setNewLib(p=>({...p,[f]:e.target.value}))} style={{ padding:"10px 14px" }} />
            </div>
          ))}
          <div style={{ display:"flex", gap:"10px", marginTop:"6px" }}>
            <button className="btn btn-ghost" onClick={()=>setShowAdd(false)} style={{ flex:1 }}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{
              if (newLib.name&&newLib.email) {
                setLibrarians(p=>[...p,{ id:Date.now(),name:newLib.name,email:newLib.email,joined:"Feb 2026",books:0,status:"active" }]);
                setNewLib({name:"",email:"",password:""});
                setShowAdd(false);
              }
            }} style={{ flex:1 }}>Add Librarian</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
