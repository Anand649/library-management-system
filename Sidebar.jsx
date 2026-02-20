// src/components/Sidebar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import {
  BookIcon, HomeIcon, GridIcon, UsersIcon, ArrowReturnIcon,
  HistoryIcon, UserIcon, LogOutIcon, BarChartIcon, MenuIcon, CloseIcon, IdCardIcon
} from "./Icons";

const MEMBER_NAV = [
  { key:"/dashboard",         label:"Dashboard",    Icon:HomeIcon },
  { key:"/browse",            label:"Browse Books", Icon:GridIcon },
  { key:"/my-books",          label:"My Books",     Icon:BookIcon },
  { key:"/history",           label:"History",      Icon:HistoryIcon },
  { key:"/profile",           label:"Profile",      Icon:UserIcon },
];

const LIBRARIAN_NAV = [
  { key:"/librarian",             label:"Dashboard",    Icon:HomeIcon },
  { key:"/librarian/books",       label:"Books",        Icon:BookIcon },
  { key:"/librarian/members",     label:"Members",      Icon:UsersIcon },
  { key:"/librarian/issue-return",label:"Issue/Return", Icon:ArrowReturnIcon },
  { key:"/librarian/history",     label:"History",      Icon:HistoryIcon },
];

const ADMIN_NAV = [
  { key:"/admin",             label:"Dashboard",    Icon:HomeIcon },
  { key:"/admin/books",       label:"Books",        Icon:BookIcon },
  { key:"/admin/members",     label:"Members",      Icon:UsersIcon },
  { key:"/admin/librarians",  label:"Librarians",   Icon:IdCardIcon },
  { key:"/admin/issue-return",label:"Issue/Return", Icon:ArrowReturnIcon },
  { key:"/admin/reports",     label:"Reports",      Icon:BarChartIcon },
];

function getNav(role) {
  if (role === "admin")      return ADMIN_NAV;
  if (role === "librarian")  return LIBRARIAN_NAV;
  return MEMBER_NAV;
}

export default function Sidebar() {
  const { user, logout }  = useAuth();
  const toast             = useToast();
  const navigate          = useNavigate();
  const location          = useLocation();
  const [open, setOpen]   = useState(false);
  const navItems          = getNav(user?.role);

  const handleLogout = () => {
    logout();
    toast.info("Signed out successfully.");
    navigate("/login");
  };

  const roleBadge = { member:"Member", librarian:"Librarian", admin:"Admin" }[user?.role] || "";
  const roleColor = { member:"var(--gold)", librarian:"var(--blue)", admin:"var(--red)" }[user?.role] || "var(--gold)";

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2)
    : "U";

  const SidebarContent = () => (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Top accent */}
      <div style={{ height:"2px", background:"linear-gradient(90deg,transparent,var(--gold),transparent)", opacity:0.4, flexShrink:0 }} />

      {/* Brand */}
      <div style={{ padding:"24px 20px 16px", borderBottom:"1px solid var(--gold-border)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ color:"var(--gold)", filter:"drop-shadow(0 0 8px rgba(200,169,110,0.4))" }}>
            <BookIcon size={20}/>
          </span>
          <div>
            <div style={{ fontSize:"14px", letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--gold)", fontFamily:"var(--font-display)" }}>Digital</div>
            <div style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(200,169,110,0.35)", marginTop:"1px" }}>Library System</div>
          </div>
        </div>
      </div>

      {/* User card */}
      <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--gold-border)", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"11px" }}>
          <div style={{
            width:"38px", height:"38px", borderRadius:"50%", flexShrink:0,
            background:"linear-gradient(135deg,#8B4513,#c8a96e)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#1a1208", fontWeight:"700", fontSize:"13px", fontFamily:"var(--font-body)"
          }}>
            {initials}
          </div>
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontSize:"13px", color:"var(--text)", fontWeight:"500", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
              {user?.name || "User"}
            </div>
            <span style={{ fontSize:"10px", letterSpacing:"0.08em", textTransform:"uppercase", color:roleColor, opacity:0.85 }}>
              {roleBadge}
            </span>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
        {navItems.map(({ key, label, Icon }) => {
          const active = location.pathname === key || (key !== "/" && location.pathname.startsWith(key) && key.length > 1);
          return (
            <button
              key={key}
              className={`nav-item ${active ? "active" : ""}`}
              onClick={() => { navigate(key); setOpen(false); }}
            >
              <Icon size={16}/>
              {label}
            </button>
          );
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding:"12px 10px", borderTop:"1px solid var(--gold-border)", flexShrink:0 }}>
        <button className="nav-item" onClick={handleLogout} style={{ color:"rgba(232,122,90,0.55)" }}>
          <LogOutIcon size={16}/> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{
        width:"var(--sidebar-w)", flexShrink:0,
        background:"var(--bg-panel)",
        borderRight:"1px solid var(--gold-border)",
        position:"sticky", top:0, height:"100vh", overflowY:"auto",
        display:"flex", flexDirection:"column",
      }}>
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display:"none",
          position:"fixed", top:"14px", left:"14px", zIndex:200,
          background:"var(--bg-panel)", border:"1px solid var(--gold-border)",
          borderRadius:"8px", padding:"8px", cursor:"pointer", color:"var(--gold)",
        }}
        className="mobile-menu-btn"
      >
        {open ? <CloseIcon size={18}/> : <MenuIcon size={18}/>}
      </button>

      {/* Mobile overlay */}
      {open && (
        <>
          <div onClick={() => setOpen(false)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:150, display:"none" }}
            className="mobile-overlay"
          />
          <aside style={{
            position:"fixed", top:0, left:0, bottom:0, width:"var(--sidebar-w)",
            background:"var(--bg-panel)", borderRight:"1px solid var(--gold-border)",
            zIndex:160, display:"none", flexDirection:"column",
          }}
            className="mobile-sidebar"
          >
            <SidebarContent />
          </aside>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          aside:not(.mobile-sidebar) { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-overlay  { display: block !important; }
          .mobile-sidebar  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
