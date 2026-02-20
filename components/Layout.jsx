// src/components/Layout.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { SearchIcon, BellIcon } from "./Icons";

const PAGE_TITLES = {
  "/dashboard":             { title:"Dashboard",     sub:"Welcome back!" },
  "/browse":                { title:"Browse Books",  sub:"Discover your next read" },
  "/my-books":              { title:"My Books",      sub:"Currently borrowed" },
  "/history":               { title:"History",       sub:"Your reading journey" },
  "/profile":               { title:"Profile",       sub:"Manage your account" },
  "/librarian":             { title:"Dashboard",     sub:"Library overview" },
  "/librarian/books":       { title:"Books",         sub:"Manage the collection" },
  "/librarian/members":     { title:"Members",       sub:"Member management" },
  "/librarian/issue-return":{ title:"Issue / Return",sub:"Checkout workflow" },
  "/librarian/history":     { title:"History",       sub:"Transaction log" },
  "/admin":                 { title:"Admin Dashboard",sub:"System overview" },
  "/admin/books":           { title:"Books",         sub:"Manage all books" },
  "/admin/members":         { title:"Members",       sub:"All members" },
  "/admin/librarians":      { title:"Librarians",    sub:"Staff management" },
  "/admin/issue-return":    { title:"Issue / Return",sub:"All transactions" },
  "/admin/reports":         { title:"Reports",       sub:"Analytics & insights" },
};

export default function Layout({ children }) {
  const { user }       = useAuth();
  const location       = useLocation();
  const [search, setSearch] = useState("");
  const info = PAGE_TITLES[location.pathname] || { title:"Bibliotheca", sub:"" };

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" });

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"var(--bg)" }}>
      <Sidebar />

      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, overflowX:"hidden" }}>
        {/* Top bar */}
        <header style={{
          padding:"16px 28px",
          borderBottom:"1px solid var(--gold-border)",
          background:"rgba(13,10,6,0.95)",
          backdropFilter:"blur(10px)",
          position:"sticky", top:0, zIndex:50,
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px",
        }}>
          <div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"22px", fontWeight:400, color:"var(--text)", lineHeight:1.1 }}>
              {info.title}
            </h1>
            <p style={{ fontSize:"11px", color:"var(--text-dim)", marginTop:"2px", letterSpacing:"0.04em" }}>
              {dateStr}
            </p>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            {/* Search bar */}
            <div style={{ position:"relative" }}>
              <span style={{ position:"absolute", left:"11px", top:"50%", transform:"translateY(-50%)", color:"rgba(200,169,110,0.35)", display:"flex" }}>
                <SearchIcon size={14}/>
              </span>
              <input
                className="input-base"
                placeholder="Search books, members…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ padding:"9px 14px 9px 34px", width:"200px", fontSize:"13px" }}
              />
            </div>

            {/* Notification bell */}
            <button style={{
              position:"relative", background:"var(--gold-dim)", border:"1px solid var(--gold-border)",
              borderRadius:"9px", padding:"9px", cursor:"pointer", color:"rgba(200,169,110,0.6)",
              display:"flex", transition:"background 0.2s",
            }}>
              <BellIcon size={16}/>
              <span style={{ position:"absolute", top:"7px", right:"7px", width:"6px", height:"6px",
                borderRadius:"50%", background:"var(--red)", border:"1px solid var(--bg)" }} />
            </button>

            {/* Avatar */}
            <div style={{
              width:"36px", height:"36px", borderRadius:"50%",
              background:"linear-gradient(135deg,#8B4513,#c8a96e)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#1a1208", fontWeight:"700", fontSize:"12px",
              cursor:"pointer", flexShrink:0,
            }}>
              {user?.name?.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2) || "U"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding:"28px", overflowY:"auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
