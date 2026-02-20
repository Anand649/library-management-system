// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0d0a06" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:"36px", height:"36px", border:"2px solid rgba(200,169,110,0.2)", borderTopColor:"#c8a96e",
            borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 16px" }} />
          <p style={{ color:"rgba(200,169,110,0.5)", fontSize:"13px", letterSpacing:"0.1em" }}>Loading…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Wrong role — redirect to their correct dashboard
    const routes = { admin:"/admin", librarian:"/librarian", member:"/dashboard" };
    return <Navigate to={routes[user?.role] || "/dashboard"} replace />;
  }

  return children;
}

// ── 404 Page ──────────────────────────────────────────────────────────────────
export function NotFound() {
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"#0d0a06", fontFamily:"'Cormorant Garamond',Georgia,serif", textAlign:"center", padding:"20px" }}>
      <div>
        <div style={{ fontSize:"120px", lineHeight:1, color:"rgba(200,169,110,0.08)", fontWeight:300, marginBottom:"8px" }}>404</div>
        <h1 style={{ fontSize:"32px", fontWeight:300, color:"#f0e6d0", marginBottom:"12px" }}>Page Not Found</h1>
        <p style={{ fontSize:"14px", color:"rgba(240,230,208,0.4)", marginBottom:"28px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/dashboard" style={{ display:"inline-flex", alignItems:"center", gap:"8px",
          padding:"12px 24px", background:"linear-gradient(135deg,#c8a96e,#9e7535)",
          borderRadius:"9px", color:"#1a1208", textDecoration:"none", fontSize:"13px",
          fontFamily:"'DM Sans',sans-serif", fontWeight:"600", letterSpacing:"0.1em", textTransform:"uppercase" }}>
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
