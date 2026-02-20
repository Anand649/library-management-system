// src/pages/LibrarianDashboard.jsx
import { useState } from "react";
import { BookIcon, UsersIcon, ArrowReturnIcon, ClockIcon, CheckIcon, PlusIcon, SearchIcon, EditIcon, TrashIcon, CloseIcon } from "../components/Icons";

const STATS = [
  { label:"Total Books",       value:"1,240", sub:"+12 this month",   color:"var(--gold)",   Icon:BookIcon },
  { label:"Active Members",    value:"342",   sub:"28 new this month", color:"var(--blue)",   Icon:UsersIcon },
  { label:"Books Issued",      value:"87",    sub:"Currently out",    color:"var(--purple)",  Icon:ArrowReturnIcon },
  { label:"Overdue",           value:"14",    sub:"Need attention",   color:"var(--red)",    Icon:ClockIcon },
];

const INIT_BOOKS = [
  { id:1, title:"The Great Gatsby",   author:"F. Scott Fitzgerald", genre:"Classic",   isbn:"978-0743273565", copies:3, available:2 },
  { id:2, title:"Atomic Habits",      author:"James Clear",          genre:"Self-Help", isbn:"978-0735211292", copies:2, available:0 },
  { id:3, title:"Dune",              author:"Frank Herbert",         genre:"Sci-Fi",    isbn:"978-0441013593", copies:4, available:3 },
  { id:4, title:"1984",              author:"George Orwell",         genre:"Classic",   isbn:"978-0451524935", copies:5, available:4 },
  { id:5, title:"Sapiens",           author:"Yuval N. Harari",       genre:"History",   isbn:"978-0062316097", copies:2, available:1 },
];

const INIT_MEMBERS = [
  { id:1, name:"Arjun Sharma",   email:"arjun@email.com",  memberId:"MEM-001", borrowed:2, status:"active" },
  { id:2, name:"Priya Nair",     email:"priya@email.com",  memberId:"MEM-002", borrowed:1, status:"active" },
  { id:3, name:"Rohit Kumar",    email:"rohit@email.com",  memberId:"MEM-003", borrowed:3, status:"overdue" },
  { id:4, name:"Sneha Patel",    email:"sneha@email.com",  memberId:"MEM-004", borrowed:0, status:"active" },
  { id:5, name:"Dev Menon",      email:"dev@email.com",    memberId:"MEM-005", borrowed:1, status:"suspended" },
];

const TRANSACTIONS = [
  { id:1, member:"Arjun Sharma",  book:"The Great Gatsby",  type:"issue",  date:"Feb 10", due:"Feb 24", status:"active" },
  { id:2, member:"Priya Nair",    book:"Dune",              type:"issue",  date:"Feb 8",  due:"Feb 22", status:"active" },
  { id:3, member:"Rohit Kumar",   book:"Atomic Habits",     type:"issue",  date:"Jan 28", due:"Feb 11", status:"overdue" },
  { id:4, member:"Sneha Patel",   book:"1984",              type:"return", date:"Feb 12", due:"Feb 12", status:"returned" },
  { id:5, member:"Dev Menon",     book:"Sapiens",           type:"issue",  date:"Feb 5",  due:"Feb 19", status:"active" },
];

function StatCard({ label, value, sub, color, Icon }) {
  return (
    <div className="card" style={{ position:"relative", overflow:"hidden", cursor:"default",
      transition:"transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.35)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent,${color},transparent)`,opacity:0.6 }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <div style={{ fontSize:"11px", letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-dim)", marginBottom:"10px" }}>{label}</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:"34px", color, lineHeight:1, marginBottom:"5px", fontWeight:300 }}>{value}</div>
          <div style={{ fontSize:"12px", color:"var(--text-dim)" }}>{sub}</div>
        </div>
        <div style={{ color, opacity:0.2 }}><Icon size={30}/></div>
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"22px" }}>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"20px", fontWeight:400, color:"var(--text)" }}>{title}</h3>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text-dim)",display:"flex",padding:"2px" }}><CloseIcon size={18}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div style={{ marginBottom:"14px" }}>
      <label style={{ display:"block",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:"6px" }}>{label}</label>
      {children}
    </div>
  );
}

export default function LibrarianDashboard() {
  const [tab, setTab]         = useState("overview");
  const [books, setBooks]     = useState(INIT_BOOKS);
  const [members]             = useState(INIT_MEMBERS);
  const [bookSearch, setBSearch] = useState("");
  const [memSearch,  setMSearch] = useState("");
  const [showAddBook, setShowAddBook] = useState(false);
  const [editBook,    setEditBook]    = useState(null);
  const [newBook, setNewBook] = useState({ title:"", author:"", genre:"", isbn:"", copies:1 });

  const TABS = [
    { key:"overview",  label:"Overview" },
    { key:"books",     label:"Books" },
    { key:"members",   label:"Members" },
    { key:"transactions", label:"Issue/Return" },
  ];

  const filteredBooks   = books.filter(b => b.title.toLowerCase().includes(bookSearch.toLowerCase()) || b.author.toLowerCase().includes(bookSearch.toLowerCase()));
  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(memSearch.toLowerCase()) || m.memberId.toLowerCase().includes(memSearch.toLowerCase()));

  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) return;
    setBooks(prev => [...prev, { ...newBook, id:Date.now(), available:newBook.copies }]);
    setNewBook({ title:"",author:"",genre:"",isbn:"",copies:1 });
    setShowAddBook(false);
  };

  const handleDeleteBook = (id) => setBooks(b => b.filter(x=>x.id!==id));

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
            {STATS.map((s,i) => <StatCard key={i} {...s}/>)}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
            {/* Recent transactions */}
            <div className="card">
              <div className="section-header">
                <div className="section-title" style={{ fontSize:"17px" }}>Recent Transactions</div>
              </div>
              <table className="table-base">
                <thead><tr><th>Member</th><th>Book</th><th>Status</th></tr></thead>
                <tbody>
                  {TRANSACTIONS.slice(0,4).map(t => (
                    <tr key={t.id}>
                      <td style={{ color:"var(--text)" }}>{t.member.split(" ")[0]}</td>
                      <td style={{ maxWidth:"130px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.book}</td>
                      <td>
                        <span className={
                          t.status==="returned"?"badge badge-green":
                          t.status==="overdue"?"badge badge-red":"badge badge-gold"}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick actions */}
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"16px" }}>Quick Actions</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {[
                  { label:"Add Book",     color:"var(--gold)",   action:()=>setShowAddBook(true) },
                  { label:"Issue Book",   color:"var(--blue)",   action:()=>setTab("transactions") },
                  { label:"Return Book",  color:"var(--green)",  action:()=>setTab("transactions") },
                  { label:"View Members", color:"var(--purple)", action:()=>setTab("members") },
                ].map((a,i) => (
                  <button key={i} onClick={a.action}
                    style={{ padding:"16px 12px", borderRadius:"10px", border:`1px solid ${a.color}25`,
                      background:`${a.color}0d`, color:a.color, cursor:"pointer", fontFamily:"var(--font-body)",
                      fontSize:"13px", fontWeight:"500", transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background=`${a.color}1a`; e.currentTarget.style.transform="translateY(-1px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background=`${a.color}0d`; e.currentTarget.style.transform=""; }}>
                    {a.label}
                  </button>
                ))}
              </div>

              {/* Overdue alert */}
              <div style={{ marginTop:"16px", padding:"14px", borderRadius:"10px", background:"rgba(232,122,90,0.07)", border:"1px solid rgba(232,122,90,0.2)" }}>
                <div style={{ fontSize:"13px", color:"var(--red)", fontWeight:"500", marginBottom:"4px" }}>⚠ 14 Overdue Books</div>
                <div style={{ fontSize:"12px", color:"var(--text-dim)" }}>3 members have overdue items. Send reminders?</div>
                <button className="btn btn-danger" style={{ marginTop:"10px", padding:"7px 14px", fontSize:"12px" }}>Send Reminders</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKS ── */}
      {tab === "books" && (
        <div className="anim-scale-in">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", gap:"12px", flexWrap:"wrap" }}>
            <div style={{ position:"relative", flex:1, minWidth:"200px" }}>
              <span style={{ position:"absolute",left:"11px",top:"50%",transform:"translateY(-50%)",color:"rgba(200,169,110,0.35)",display:"flex" }}><SearchIcon size={14}/></span>
              <input className="input-base" placeholder="Search books…" value={bookSearch} onChange={e=>setBSearch(e.target.value)} style={{ padding:"10px 14px 10px 35px",width:"100%" }} />
            </div>
            <button className="btn btn-primary" onClick={()=>setShowAddBook(true)}>
              <PlusIcon size={15}/> Add Book
            </button>
          </div>

          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <table className="table-base">
              <thead><tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Copies</th><th>Available</th><th>Actions</th></tr></thead>
              <tbody>
                {filteredBooks.map(b => (
                  <tr key={b.id}>
                    <td style={{ color:"var(--text)", fontWeight:"500" }}>{b.title}</td>
                    <td>{b.author}</td>
                    <td><span className="badge badge-gold" style={{ fontSize:"10px" }}>{b.genre}</span></td>
                    <td style={{ fontFamily:"monospace", fontSize:"11px" }}>{b.isbn}</td>
                    <td>{b.copies}</td>
                    <td>
                      <span className={b.available>0?"badge badge-green":"badge badge-red"}>{b.available>0?b.available+" free":"None"}</span>
                    </td>
                    <td>
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button onClick={()=>setEditBook(b)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--blue)",padding:"4px",transition:"opacity 0.2s" }}
                          onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                          <EditIcon size={15}/>
                        </button>
                        <button onClick={()=>handleDeleteBook(b.id)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--red)",padding:"4px",transition:"opacity 0.2s" }}
                          onMouseEnter={e=>e.currentTarget.style.opacity="0.7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                          <TrashIcon size={15}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MEMBERS ── */}
      {tab === "members" && (
        <div className="anim-scale-in">
          <div style={{ position:"relative", marginBottom:"20px" }}>
            <span style={{ position:"absolute",left:"11px",top:"50%",transform:"translateY(-50%)",color:"rgba(200,169,110,0.35)",display:"flex" }}><SearchIcon size={14}/></span>
            <input className="input-base" placeholder="Search members…" value={memSearch} onChange={e=>setMSearch(e.target.value)} style={{ padding:"10px 14px 10px 35px",maxWidth:"360px",display:"block" }} />
          </div>

          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <table className="table-base">
              <thead><tr><th>Name</th><th>Email</th><th>Member ID</th><th>Borrowed</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filteredMembers.map(m => (
                  <tr key={m.id}>
                    <td style={{ color:"var(--text)", fontWeight:"500" }}>{m.name}</td>
                    <td style={{ fontSize:"12px" }}>{m.email}</td>
                    <td style={{ fontFamily:"monospace", fontSize:"11px", color:"var(--gold)" }}>{m.memberId}</td>
                    <td>{m.borrowed}</td>
                    <td>
                      <span className={
                        m.status==="active"?"badge badge-green":
                        m.status==="overdue"?"badge badge-red":"badge badge-purple"}>
                        {m.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost" style={{ padding:"4px 10px", fontSize:"11px" }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TRANSACTIONS ── */}
      {tab === "transactions" && (
        <div className="anim-scale-in">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"24px" }}>
            {/* Issue form */}
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"16px", color:"var(--blue)" }}>Issue Book</div>
              <FieldRow label="Member ID / Name">
                <input className="input-base" placeholder="Search member…" style={{ padding:"10px 14px" }} />
              </FieldRow>
              <FieldRow label="Book Title / ISBN">
                <input className="input-base" placeholder="Search book…" style={{ padding:"10px 14px" }} />
              </FieldRow>
              <FieldRow label="Due Date">
                <input className="input-base" type="date" style={{ padding:"10px 14px" }} />
              </FieldRow>
              <button className="btn btn-primary" style={{ width:"100%", padding:"12px", letterSpacing:"0.1em", textTransform:"uppercase", fontSize:"12px" }}>
                <ArrowReturnIcon size={15}/> Issue Book
              </button>
            </div>

            {/* Return form */}
            <div className="card">
              <div className="section-title" style={{ fontSize:"17px", marginBottom:"16px", color:"var(--green)" }}>Return Book</div>
              <FieldRow label="Transaction ID / Member">
                <input className="input-base" placeholder="Search transaction…" style={{ padding:"10px 14px" }} />
              </FieldRow>
              <FieldRow label="Condition">
                <select className="input-base" style={{ padding:"10px 14px", cursor:"pointer" }}>
                  <option>Good</option><option>Fair</option><option>Damaged</option>
                </select>
              </FieldRow>
              <FieldRow label="Fine (if any)">
                <input className="input-base" placeholder="₹ 0.00" style={{ padding:"10px 14px" }} />
              </FieldRow>
              <button className="btn" style={{ width:"100%", padding:"12px", letterSpacing:"0.1em", textTransform:"uppercase", fontSize:"12px", background:"rgba(140,200,122,0.15)", color:"var(--green)", border:"1px solid rgba(140,200,122,0.25)" }}>
                <CheckIcon size={15}/> Process Return
              </button>
            </div>
          </div>

          {/* Transaction log */}
          <div className="card" style={{ padding:0, overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--gold-border)" }}>
              <div className="section-title" style={{ fontSize:"16px" }}>Transaction Log</div>
            </div>
            <table className="table-base">
              <thead><tr><th>Member</th><th>Book</th><th>Type</th><th>Issue Date</th><th>Due Date</th><th>Status</th></tr></thead>
              <tbody>
                {TRANSACTIONS.map(t => (
                  <tr key={t.id}>
                    <td style={{ color:"var(--text)", fontWeight:"500" }}>{t.member}</td>
                    <td>{t.book}</td>
                    <td><span className={t.type==="issue"?"badge badge-blue":"badge badge-green"}>{t.type}</span></td>
                    <td style={{ fontSize:"12px" }}>{t.date}</td>
                    <td style={{ fontSize:"12px" }}>{t.due}</td>
                    <td>
                      <span className={
                        t.status==="returned"?"badge badge-green":
                        t.status==="overdue"?"badge badge-red":"badge badge-gold"}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddBook && (
        <Modal title="Add New Book" onClose={()=>setShowAddBook(false)}>
          {["title","author","genre","isbn"].map(f => (
            <FieldRow key={f} label={f.charAt(0).toUpperCase()+f.slice(1)}>
              <input className="input-base" placeholder={`Enter ${f}…`} value={newBook[f]} onChange={e=>setNewBook(p=>({...p,[f]:e.target.value}))} style={{ padding:"10px 14px" }} />
            </FieldRow>
          ))}
          <FieldRow label="Number of Copies">
            <input className="input-base" type="number" min="1" value={newBook.copies} onChange={e=>setNewBook(p=>({...p,copies:parseInt(e.target.value)||1}))} style={{ padding:"10px 14px" }} />
          </FieldRow>
          <div style={{ display:"flex", gap:"10px", marginTop:"6px" }}>
            <button className="btn btn-ghost" onClick={()=>setShowAddBook(false)} style={{ flex:1 }}>Cancel</button>
            <button className="btn btn-primary" onClick={handleAddBook} style={{ flex:1 }}>Add Book</button>
          </div>
        </Modal>
      )}

      {/* Edit Book Modal */}
      {editBook && (
        <Modal title="Edit Book" onClose={()=>setEditBook(null)}>
          {["title","author","genre","isbn"].map(f => (
            <FieldRow key={f} label={f.charAt(0).toUpperCase()+f.slice(1)}>
              <input className="input-base" value={editBook[f]} onChange={e=>setEditBook(p=>({...p,[f]:e.target.value}))} style={{ padding:"10px 14px" }} />
            </FieldRow>
          ))}
          <FieldRow label="Copies">
            <input className="input-base" type="number" min="1" value={editBook.copies} onChange={e=>setEditBook(p=>({...p,copies:parseInt(e.target.value)||1}))} style={{ padding:"10px 14px" }} />
          </FieldRow>
          <div style={{ display:"flex", gap:"10px", marginTop:"6px" }}>
            <button className="btn btn-ghost" onClick={()=>setEditBook(null)} style={{ flex:1 }}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>{ setBooks(b=>b.map(x=>x.id===editBook.id?editBook:x)); setEditBook(null); }} style={{ flex:1 }}>Save Changes</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
