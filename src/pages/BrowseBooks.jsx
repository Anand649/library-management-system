// src/pages/BrowseBooks.jsx
import { useState } from "react";
import { SearchIcon, FilterIcon, BookIcon, HeartIcon, StarIcon, GridIcon, CheckIcon } from "../components/Icons";

const GENRES = ["All","Fiction","Non-Fiction","Sci-Fi","Classic","Self-Help","History","Mystery","Fantasy","Biography"];

const BOOKS = [
  { id:1,  title:"The Great Gatsby",        author:"F. Scott Fitzgerald", genre:"Classic",    cover:"#6B3A2A", rating:4.2, available:true,  year:1925 },
  { id:2,  title:"Atomic Habits",           author:"James Clear",          genre:"Self-Help",  cover:"#2A4A3E", rating:4.8, available:false, year:2018 },
  { id:3,  title:"Dune",                   author:"Frank Herbert",         genre:"Sci-Fi",     cover:"#1A3A5C", rating:4.6, available:true,  year:1965 },
  { id:4,  title:"1984",                   author:"George Orwell",         genre:"Fiction",    cover:"#3A1A1A", rating:4.7, available:true,  year:1949 },
  { id:5,  title:"Sapiens",                author:"Yuval Noah Harari",     genre:"History",    cover:"#1A3A1A", rating:4.4, available:false, year:2011 },
  { id:6,  title:"The Alchemist",          author:"Paulo Coelho",          genre:"Fiction",    cover:"#3A2A1A", rating:4.3, available:true,  year:1988 },
  { id:7,  title:"To Kill a Mockingbird",  author:"Harper Lee",            genre:"Classic",    cover:"#3A3A2A", rating:4.5, available:true,  year:1960 },
  { id:8,  title:"The Hobbit",             author:"J.R.R. Tolkien",        genre:"Fantasy",    cover:"#2A3A1A", rating:4.6, available:false, year:1937 },
  { id:9,  title:"Thinking, Fast & Slow",  author:"Daniel Kahneman",       genre:"Non-Fiction",cover:"#2A2A3A", rating:4.3, available:true,  year:2011 },
  { id:10, title:"The Midnight Library",   author:"Matt Haig",             genre:"Fiction",    cover:"#1A2A3A", rating:4.1, available:true,  year:2020 },
  { id:11, title:"Educated",              author:"Tara Westover",          genre:"Biography",  cover:"#3A2A2A", rating:4.5, available:false, year:2018 },
  { id:12, title:"Project Hail Mary",     author:"Andy Weir",              genre:"Sci-Fi",     cover:"#1A3A3A", rating:4.7, available:true,  year:2021 },
];

function BookCard({ book, wishlist, onToggleWish, onBorrow }) {
  const wished = wishlist.includes(book.id);
  return (
    <div style={{ background:"var(--bg-card)", border:`1px solid ${book.available?"var(--gold-border)":"rgba(200,169,110,0.07)"}`,
      borderRadius:"12px", padding:"18px", display:"flex", flexDirection:"column", gap:"12px",
      transition:"transform 0.2s, box-shadow 0.2s, border-color 0.2s", cursor:"default" }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(0,0,0,0.4)"; e.currentTarget.style.borderColor="rgba(200,169,110,0.25)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; e.currentTarget.style.borderColor=book.available?"var(--gold-border)":"rgba(200,169,110,0.07)"; }}>

      {/* Cover */}
      <div style={{ width:"100%", height:"120px", borderRadius:"8px", background:book.cover,
        display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
        boxShadow:"inset 0 0 40px rgba(0,0,0,0.3)" }}>
        <div style={{ position:"absolute",left:0,top:0,bottom:0,width:"8px",background:"rgba(0,0,0,0.3)",borderRadius:"8px 0 0 8px" }} />
        <span style={{ color:"rgba(255,255,255,0.15)", marginLeft:"8px" }}><BookIcon size={28}/></span>
        <button onClick={()=>onToggleWish(book.id)}
          style={{ position:"absolute", top:"8px", right:"8px", background:"rgba(0,0,0,0.4)",
            border:"none", borderRadius:"6px", padding:"5px", cursor:"pointer",
            color:wished?"#d46a8a":"rgba(255,255,255,0.4)", transition:"color 0.2s, background 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.6)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(0,0,0,0.4)"}>
          <HeartIcon size={14} filled={wished}/>
        </button>
        <span className={book.available?"badge badge-green":"badge badge-red"}
          style={{ position:"absolute", bottom:"8px", left:"8px", fontSize:"10px", padding:"2px 7px" }}>
          {book.available?"Available":"Checked Out"}
        </span>
      </div>

      <div style={{ flex:1 }}>
        <div style={{ fontSize:"14px", color:"var(--text)", fontWeight:"500", marginBottom:"2px", lineHeight:1.3 }}>{book.title}</div>
        <div style={{ fontSize:"12px", color:"var(--text-dim)", marginBottom:"8px" }}>{book.author}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span className="badge badge-gold" style={{ fontSize:"10px", padding:"2px 7px" }}>{book.genre}</span>
          <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
            <StarIcon size={12} filled/>
            <span style={{ fontSize:"11px", color:"rgba(200,169,110,0.7)" }}>{book.rating}</span>
          </div>
        </div>
      </div>

      <button onClick={()=>book.available&&onBorrow(book)} className={`btn ${book.available?"btn-primary":"btn-ghost"}`}
        disabled={!book.available}
        style={{ width:"100%", padding:"9px", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
        {book.available ? "Borrow" : "Unavailable"}
      </button>
    </div>
  );
}

export default function BrowseBooks() {
  const [search,  setSearch]  = useState("");
  const [genre,   setGenre]   = useState("All");
  const [sort,    setSort]    = useState("title");
  const [view,    setView]    = useState("grid");
  const [wishlist,setWishlist]= useState([]);
  const [borrowed,setBorrowed]= useState([]);
  const [toast,   setToast]   = useState(null);

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = BOOKS
    .filter(b => (genre==="All" || b.genre===genre) && (b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b) => sort==="rating" ? b.rating-a.rating : sort==="year" ? b.year-a.year : a.title.localeCompare(b.title));

  const toggleWish = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w, id]);
    showToast(wishlist.includes(id) ? "Removed from wishlist." : "Added to wishlist!", wishlist.includes(id)?"error":"success");
  };
  const handleBorrow = (book) => {
    setBorrowed(b => [...b, book.id]);
    showToast(`Borrowed "${book.title}" successfully!`);
  };

  return (
    <div className="anim-fade-in">
      {/* Controls */}
      <div style={{ display:"flex", gap:"12px", alignItems:"center", marginBottom:"24px", flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:"1", minWidth:"200px" }}>
          <span style={{ position:"absolute",left:"11px",top:"50%",transform:"translateY(-50%)",color:"rgba(200,169,110,0.35)",display:"flex" }}>
            <SearchIcon size={14}/>
          </span>
          <input className="input-base" placeholder="Search by title or author…" value={search} onChange={e=>setSearch(e.target.value)}
            style={{ padding:"10px 14px 10px 35px", width:"100%" }} />
        </div>

        <select className="input-base" value={sort} onChange={e=>setSort(e.target.value)}
          style={{ padding:"10px 14px", width:"140px", cursor:"pointer" }}>
          <option value="title">Sort: Title</option>
          <option value="rating">Sort: Rating</option>
          <option value="year">Sort: Newest</option>
        </select>

        <div style={{ display:"flex", background:"var(--gold-dim)", border:"1px solid var(--gold-border)", borderRadius:"8px", padding:"3px", gap:"2px" }}>
          {["grid","list"].map(v => (
            <button key={v} onClick={()=>setView(v)}
              style={{ padding:"6px 10px", border:"none", borderRadius:"6px", cursor:"pointer",
                background:view===v?"rgba(200,169,110,0.2)":"transparent",
                color:view===v?"var(--gold)":"var(--text-dim)", transition:"all 0.15s" }}>
              {v==="grid"?<GridIcon size={14}/>:<FilterIcon size={14}/>}
            </button>
          ))}
        </div>
      </div>

      {/* Genre filter */}
      <div style={{ display:"flex", gap:"7px", marginBottom:"24px", overflowX:"auto", paddingBottom:"4px" }}>
        {GENRES.map(g => (
          <button key={g} onClick={()=>setGenre(g)}
            style={{ padding:"6px 14px", border:`1px solid ${genre===g?"rgba(200,169,110,0.4)":"rgba(200,169,110,0.1)"}`,
              borderRadius:"20px", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:"12px",
              whiteSpace:"nowrap", transition:"all 0.15s",
              background:genre===g?"rgba(200,169,110,0.14)":"transparent",
              color:genre===g?"var(--gold)":"var(--text-dim)" }}>
            {g}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ fontSize:"12px", color:"var(--text-dim)", marginBottom:"16px" }}>
        Showing <span style={{ color:"var(--gold)" }}>{filtered.length}</span> books
        {genre!=="All" && <span> in <span style={{ color:"var(--gold)" }}>{genre}</span></span>}
      </div>

      {/* Books grid */}
      {view === "grid" ? (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"16px" }}>
          {filtered.map((b,i) => (
            <div key={b.id} className="anim-fade-up" style={{ animationDelay:`${i*0.04}s` }}>
              <BookCard book={b} wishlist={wishlist} onToggleWish={toggleWish} onBorrow={handleBorrow} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {filtered.map((b,i) => (
            <div key={b.id} className="anim-fade-up" style={{ animationDelay:`${i*0.03}s`,
              display:"flex", gap:"16px", alignItems:"center", padding:"16px", background:"var(--bg-card)",
              border:"1px solid var(--gold-border)", borderRadius:"10px",
              transition:"background 0.2s, border-color 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(200,169,110,0.07)"; e.currentTarget.style.borderColor="rgba(200,169,110,0.2)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="var(--bg-card)"; e.currentTarget.style.borderColor="var(--gold-border)"; }}>
              <div style={{ width:"44px", height:"60px", borderRadius:"5px", background:b.cover, flexShrink:0, boxShadow:"2px 2px 8px rgba(0,0,0,0.4)" }} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:"14px", color:"var(--text)", fontWeight:"500" }}>{b.title}</div>
                <div style={{ fontSize:"12px", color:"var(--text-dim)", marginTop:"2px" }}>{b.author} · {b.year}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}>
                <span className="badge badge-gold" style={{ fontSize:"10px" }}>{b.genre}</span>
                <div style={{ display:"flex", alignItems:"center", gap:"3px" }}>
                  <StarIcon size={12} filled/><span style={{ fontSize:"11px", color:"rgba(200,169,110,0.7)" }}>{b.rating}</span>
                </div>
                <span className={b.available?"badge badge-green":"badge badge-red"}>{b.available?"Available":"Out"}</span>
                <button onClick={()=>toggleWish(b.id)} style={{ background:"none", border:"none", cursor:"pointer", color:wishlist.includes(b.id)?"#d46a8a":"var(--text-dim)", transition:"color 0.2s" }}>
                  <HeartIcon size={15} filled={wishlist.includes(b.id)}/>
                </button>
                <button onClick={()=>b.available&&handleBorrow(b)} className={`btn ${b.available?"btn-primary":"btn-ghost"}`}
                  disabled={!b.available} style={{ padding:"6px 14px", fontSize:"11px" }}>
                  {b.available?"Borrow":"Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"60px 20px", color:"var(--text-dim)" }}>
          <BookIcon size={40}/>
          <p style={{ marginTop:"16px", fontSize:"15px" }}>No books found for "{search}"</p>
          <p style={{ fontSize:"12px", marginTop:"6px" }}>Try a different search or genre.</p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:9999,
          padding:"12px 18px", borderRadius:"10px", fontSize:"13px", fontWeight:"500",
          display:"flex", alignItems:"center", gap:"8px", animation:"fadeUp 0.3s ease",
          boxShadow:"0 8px 24px rgba(0,0,0,0.4)",
          background:toast.type==="success"?"rgba(20,40,20,0.95)":"rgba(40,15,15,0.95)",
          border:`1px solid ${toast.type==="success"?"rgba(140,200,122,0.3)":"rgba(232,122,90,0.3)"}`,
          color:toast.type==="success"?"var(--green)":"var(--red)" }}>
          {toast.type==="success"?<CheckIcon size={14}/>:"✕"} {toast.msg}
        </div>
      )}
    </div>
  );
}
