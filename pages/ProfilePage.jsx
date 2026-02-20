// src/pages/ProfilePage.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { UserIcon, MailIcon, PhoneIcon, LockIcon, CheckIcon, BookIcon, StarIcon } from "../components/Icons";

export default function ProfilePage() {
  const { user } = useAuth();
  const toast    = useToast();

  const [name,  setName]  = useState(user?.name  || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [bio,   setBio]   = useState("");

  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conPass, setConPass] = useState("");

  const [saving, setSaving]   = useState(false);
  const [pwSaving, setPwSave] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    toast.success("Profile updated successfully!");
  };

  const handlePw = async () => {
    if (!curPass || !newPass || !conPass) { toast.error("Fill in all password fields."); return; }
    if (newPass !== conPass) { toast.error("New passwords do not match."); return; }
    if (newPass.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    setPwSave(true);
    await new Promise(r => setTimeout(r, 900));
    setPwSave(false);
    setCurPass(""); setNewPass(""); setConPass("");
    toast.success("Password changed successfully!");
  };

  const roleColor = { member:"var(--gold)", librarian:"var(--blue)", admin:"var(--red)" }[user?.role] || "var(--gold)";
  const roleName  = { member:"Library Member", librarian:"Librarian", admin:"Administrator" }[user?.role] || "Member";

  const READING_STATS = [
    { label:"Books Read",      value:"28",  color:"var(--gold)"  },
    { label:"Currently Reading",value:"3",  color:"var(--blue)"  },
    { label:"On Wishlist",     value:"6",   color:"var(--purple)" },
    { label:"Avg Rating",      value:"4.2", color:"var(--green)" },
  ];

  const initials = user?.name?.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2) || "U";

  return (
    <div className="anim-fade-in" style={{ maxWidth:"840px" }}>
      {/* Profile header */}
      <div className="card" style={{ marginBottom:"20px",
        background:"linear-gradient(135deg,rgba(200,169,110,0.07),rgba(139,69,19,0.07))",
        border:"1px solid rgba(200,169,110,0.15)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
          <div style={{ width:"72px", height:"72px", borderRadius:"50%", flexShrink:0,
            background:"linear-gradient(135deg,#8B4513,#c8a96e)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#1a1208", fontWeight:"700", fontSize:"22px",
            boxShadow:"0 4px 16px rgba(200,169,110,0.3)", border:"3px solid rgba(200,169,110,0.3)" }}>
            {initials}
          </div>
          <div style={{ flex:1 }}>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"24px", fontWeight:400, color:"var(--text)", marginBottom:"3px" }}>
              {user?.name || "User"}
            </h2>
            <span style={{ fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", color:roleColor, opacity:0.85 }}>{roleName}</span>
            <div style={{ fontSize:"12px", color:"var(--text-dim)", marginTop:"4px" }}>Member since January 2025 · ID: MEM-0042</div>
          </div>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
            {READING_STATS.map((s,i) => (
              <div key={i} style={{ textAlign:"center", minWidth:"60px" }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:"22px", color:s.color, fontWeight:300 }}>{s.value}</div>
                <div style={{ fontSize:"10px", color:"var(--text-dim)", letterSpacing:"0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
        {/* Edit profile */}
        <div className="card">
          <div className="section-title" style={{ fontSize:"17px", marginBottom:"18px" }}>Personal Info</div>

          {[
            { label:"Full Name",  icon:<UserIcon size={15}/>, value:name,  setter:setName,  type:"text",  ph:"Your full name" },
            { label:"Email",      icon:<MailIcon size={15}/>, value:email, setter:setEmail, type:"email", ph:"your@email.com" },
            { label:"Phone",      icon:<PhoneIcon size={15}/>,value:phone, setter:setPhone, type:"tel",   ph:"+91 98765 43210" },
          ].map((f,i) => (
            <div key={i} style={{ marginBottom:"14px" }}>
              <label style={{ display:"block",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:"6px" }}>{f.label}</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute",left:"11px",top:"50%",transform:"translateY(-50%)",color:"rgba(200,169,110,0.35)",display:"flex" }}>{f.icon}</span>
                <input className="input-base" type={f.type} placeholder={f.ph} value={f.value}
                  onChange={e=>f.setter(e.target.value)} style={{ padding:"10px 14px 10px 38px" }} />
              </div>
            </div>
          ))}

          <div style={{ marginBottom:"16px" }}>
            <label style={{ display:"block",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:"6px" }}>Bio</label>
            <textarea className="input-base" placeholder="Tell us about yourself…" value={bio} onChange={e=>setBio(e.target.value)} rows={3}
              style={{ padding:"10px 14px", resize:"vertical", minHeight:"80px" }} />
          </div>

          <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ width:"100%", padding:"11px", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
            {saving
              ? <span style={{ display:"flex",alignItems:"center",gap:"7px" }}>
                  <span style={{ width:"12px",height:"12px",border:"2px solid rgba(26,18,8,0.3)",borderTopColor:"#1a1208",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite" }} /> Saving…
                </span>
              : <><CheckIcon size={14}/> Save Changes</>}
          </button>
        </div>

        {/* Change password */}
        <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
          <div className="card">
            <div className="section-title" style={{ fontSize:"17px", marginBottom:"18px" }}>Change Password</div>

            {[
              { label:"Current Password", value:curPass, setter:setCurPass },
              { label:"New Password",     value:newPass, setter:setNewPass },
              { label:"Confirm New",      value:conPass, setter:setConPass },
            ].map((f,i) => (
              <div key={i} style={{ marginBottom:"14px" }}>
                <label style={{ display:"block",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-dim)",marginBottom:"6px" }}>{f.label}</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute",left:"11px",top:"50%",transform:"translateY(-50%)",color:"rgba(200,169,110,0.35)",display:"flex" }}><LockIcon size={15}/></span>
                  <input className="input-base" type="password" placeholder="••••••••" value={f.value}
                    onChange={e=>f.setter(e.target.value)} style={{ padding:"10px 14px 10px 38px" }} />
                </div>
              </div>
            ))}

            <button className="btn btn-ghost" onClick={handlePw} disabled={pwSaving} style={{ width:"100%", padding:"11px", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              {pwSaving
                ? <span style={{ display:"flex",alignItems:"center",gap:"7px" }}>
                    <span style={{ width:"12px",height:"12px",border:"2px solid rgba(200,169,110,0.3)",borderTopColor:"var(--gold)",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite" }} /> Updating…
                  </span>
                : <><LockIcon size={14}/> Update Password</>}
            </button>
          </div>

          {/* Membership card */}
          <div style={{ background:"linear-gradient(135deg,#1a1206,#0f0b04)", border:"1px solid rgba(200,169,110,0.2)",
            borderRadius:"12px", padding:"20px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,transparent,var(--gold),transparent)",opacity:0.4 }} />
            <div style={{ position:"absolute",bottom:"-20px",right:"-20px",width:"80px",height:"80px",borderRadius:"50%",background:"var(--gold)",opacity:0.05 }} />
            <div style={{ fontSize:"10px",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(200,169,110,0.4)",marginBottom:"12px" }}>Membership Card</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"18px", color:"var(--gold)", marginBottom:"4px" }}>
              {user?.name || "Member"}
            </div>
            <div style={{ fontSize:"11px", color:"var(--text-dim)", marginBottom:"12px" }}>ID: MEM-0042</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span className="badge badge-green" style={{ fontSize:"10px" }}>Active Member</span>
              <div style={{ display:"flex", gap:"3px" }}>
                {[1,2,3,4,5].map(i=><StarIcon key={i} size={12} filled={i<=4}/>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
