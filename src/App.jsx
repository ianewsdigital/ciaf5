import { useState, useEffect } from "react";

// ── COLORES CIAF ─────────────────────────────────────────────
const C = {
  navy:"#0B1C5E", navyD:"#070E38", navyL:"#1A2A9C",
  blue:"#1A2A9C", purple:"#3D1FB8",
  green:"#39D353", greenD:"#22A33A", greenL:"#6EE87E",
  cyan:"#00C8DC", white:"#FFFFFF",
  gray50:"#F4F6FF", gray100:"#E8ECF8", gray300:"#A8B2D4",
  gray500:"#5A6490", gray700:"#2E3560", text:"#0B1240",
};
const HERO   = "linear-gradient(135deg,#0B1C5E 0%,#1A2A9C 55%,#3D1FB8 100%)";
const GREENG = "linear-gradient(90deg,#39D353,#22D46A)";

// ── HOOK RESPONSIVE ──────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w < 1024, w };
}

// ── DATOS ────────────────────────────────────────────────────
const JOBS = [
  {
    id:1, title:"Desarrollador Frontend Jr.", company:"TechCo", logo:"💻",
    location:"Bogotá", type:"Tiempo completo", career:"Sistemas", match:95,
    tags:["React","CSS","Git","JavaScript"], salary:"$2.0M – $2.8M",
    posted:"hace 2 días", size:"50–200 emp.", deadline:"30 abr 2025",
    benefits:["🏥 Salud","📚 Capacitación","🏠 Remoto parcial"],
    desc:"Construye interfaces modernas para millones de usuarios en un equipo ágil con tecnologías de punta.",
  },
  {
    id:2, title:"Analista de Datos", company:"DataVision", logo:"📊",
    location:"Remoto", type:"Prácticas", career:"Sistemas", match:88,
    tags:["Python","SQL","Excel","Power BI"], salary:"$1.2M – $1.6M",
    posted:"hace 1 día", size:"10–50 emp.", deadline:"25 abr 2025",
    benefits:["💻 Equipo incluido","⏰ Horario flexible"],
    desc:"Transforma grandes volúmenes de datos en insights estratégicos que impulsan las decisiones del negocio.",
  },
  {
    id:3, title:"Diseñador UX/UI", company:"CreativeHub", logo:"🎨",
    location:"Medellín", type:"Medio tiempo", career:"Diseño", match:76,
    tags:["Figma","Illustrator","Prototyping"], salary:"$1.5M – $2.0M",
    posted:"hace 3 días", size:"10–50 emp.", deadline:"5 may 2025",
    benefits:["🎨 Adobe Suite","🌴 Viernes corto"],
    desc:"Diseña experiencias digitales memorables que enamoran a los usuarios desde el primer clic.",
  },
  {
    id:4, title:"Asistente Contable", company:"FinanzasPro", logo:"🧾",
    location:"Bogotá", type:"Prácticas", career:"Contabilidad", match:82,
    tags:["Excel","SAP","Contabilidad"], salary:"$1.0M – $1.4M",
    posted:"hace 5 días", size:"200+ emp.", deadline:"28 abr 2025",
    benefits:["📈 Bonificaciones","🏥 Salud","🎓 Aval práctica"],
    desc:"Apoya procesos contables y financieros en una empresa líder del sector con más de 20 años de trayectoria.",
  },
  {
    id:5, title:"Community Manager", company:"BrandLab", logo:"📱",
    location:"Remoto", type:"Freelance", career:"Marketing", match:70,
    tags:["Instagram","TikTok","Canva","Métricas"], salary:"$900K – $1.3M",
    posted:"hace 1 semana", size:"1–10 emp.", deadline:"10 may 2025",
    benefits:["🕐 Horario libre","💡 Proyectos creativos"],
    desc:"Gestiona redes sociales de marcas emergentes y crea contenido digital de alto impacto y alcance.",
  },
  {
    id:6, title:"Soporte TI", company:"NetSolve", logo:"🖥️",
    location:"Bogotá", type:"Tiempo completo", career:"Sistemas", match:91,
    tags:["Redes","Windows","Linux","Soporte"], salary:"$1.8M – $2.2M",
    posted:"hace 4 días", size:"50–200 emp.", deadline:"2 may 2025",
    benefits:["🏥 Salud","🚌 Transporte","📚 Cursos"],
    desc:"Brinda soporte técnico de primer y segundo nivel a usuarios internos en infraestructura crítica.",
  },
];

const CAREERS = ["all","Sistemas","Diseño","Contabilidad","Marketing"];
const TYPES   = ["all","Tiempo completo","Medio tiempo","Prácticas","Freelance"];

const FIELDS = [
  { key:"name",     label:"¿Cuál es tu nombre completo?",       placeholder:"Ej: María Fernanda González", icon:"👤" },
  { key:"career",   label:"¿Qué carrera estudias en CIAF?",     placeholder:"Selecciona tu carrera",       icon:"🎓",
    options:[
      "Ingeniería de Software","Tecnología en Sistemas","Diseño Gráfico",
      "Contabilidad y Finanzas","Marketing Digital","Administración de Empresas",
      "Técnico en Redes","Técnico en Contabilidad","Gestión Empresarial","Desarrollo de Software",
    ],
  },
  { key:"semester", label:"¿En qué semestre o nivel vas?",       placeholder:"Ej: Semestre 4 / Técnico",    icon:"📅" },
  { key:"skills",   label:"¿Cuáles son tus habilidades clave?", placeholder:"Ej: React, Figma, Excel…",    icon:"⚡" },
  { key:"email",    label:"¿Cuál es tu correo electrónico?",    placeholder:"tucorreo@ciaf.edu.co",         icon:"📧" },
  { key:"bio",      label:"Cuéntanos algo sobre ti",            placeholder:"Una frase que te defina…",    icon:"✍️" },
];

// ── PARTÍCULAS ────────────────────────────────────────────────
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i, size: 3 + (i * 7 % 5),
    x: (i * 37 + 13) % 100, y: (i * 53 + 7) % 100,
    dur: 6 + (i % 5) * 2, delay: (i % 6),
    opacity: 0.08 + (i % 4) * 0.04,
  }));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {dots.map(d => (
        <div key={d.id} style={{
          position:"absolute", left:`${d.x}%`, top:`${d.y}%`,
          width:d.size, height:d.size, borderRadius:"50%",
          background:C.green, opacity:d.opacity,
          animation:`float ${d.dur}s ${d.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ── MATCH RING SVG ────────────────────────────────────────────
function MatchRing({ pct }) {
  const r = 18, circ = 2 * Math.PI * r;
  const col = pct >= 90 ? "#39D353" : pct >= 75 ? "#00C8DC" : "#FF9800";
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" style={{ flexShrink:0 }}>
      <circle cx="24" cy="24" r={r} fill="none" stroke={C.gray100} strokeWidth="4" />
      <circle cx="24" cy="24" r={r} fill="none" stroke={col} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round" transform="rotate(-90 24 24)"
        style={{ transition:"stroke-dashoffset .8s ease" }} />
      <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="800" fill={col}>{pct}%</text>
    </svg>
  );
}

// ── JOB CARD ─────────────────────────────────────────────────
function JobCard({ job, onApply }) {
  const [hov, setHov]           = useState(false);
  const [saved, setSaved]       = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? HERO : C.white,
        border: `1.5px solid ${hov ? "rgba(57,211,83,.4)" : C.gray100}`,
        borderRadius:20, padding:0, transition:"all .3s cubic-bezier(.4,0,.2,1)",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 24px 48px rgba(26,42,156,.25)" : "0 2px 12px rgba(11,28,94,.06)",
        overflow:"hidden", cursor:"pointer",
      }}
    >
      <div style={{ height:4, background: hov ? GREENG : `linear-gradient(90deg,${job.match>=90?"#39D353":job.match>=75?"#00C8DC":"#FF9800"},transparent)` }} />
      <div style={{ padding:18 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", flex:1, minWidth:0 }}>
            <div style={{ width:46, height:46, borderRadius:14, background: hov ? "rgba(57,211,83,.12)" : C.gray50, border:`1.5px solid ${hov?"rgba(57,211,83,.3)":C.gray100}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
              {job.logo}
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:14, fontWeight:800, color: hov ? C.white : C.navy, lineHeight:1.2 }}>{job.title}</div>
              <div style={{ fontSize:12, color: hov ? "rgba(255,255,255,.6)" : C.gray500, marginTop:3, display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>
                <span>🏢</span>{job.company}<span style={{ opacity:.4 }}>·</span><span>📍</span>{job.location}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0, marginLeft:8 }}>
            <MatchRing pct={job.match} />
            <button onClick={e => { e.stopPropagation(); setSaved(!saved); }}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, lineHeight:1 }}>
              {saved ? "❤️" : "🤍"}
            </button>
          </div>
        </div>

        <p style={{ fontSize:13, color: hov ? "rgba(255,255,255,.7)" : C.gray500, lineHeight:1.6, marginBottom:12 }}>{job.desc}</p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:12 }}>
          {[
            { icon:"💰", label:"Salario",    val:job.salary   },
            { icon:"🏢", label:"Empresa",    val:job.size     },
            { icon:"📅", label:"Publicado",  val:job.posted   },
            { icon:"⏰", label:"Cierra",     val:job.deadline },
          ].map(m => (
            <div key={m.label} style={{ background: hov ? "rgba(255,255,255,.06)" : C.gray50, borderRadius:10, padding:"7px 9px", border:`1px solid ${hov?"rgba(255,255,255,.08)":C.gray100}` }}>
              <div style={{ fontSize:10, color: hov ? "rgba(255,255,255,.4)" : C.gray300, fontWeight:700, letterSpacing:.5 }}>{m.icon} {m.label.toUpperCase()}</div>
              <div style={{ fontSize:11, fontWeight:700, color: hov ? C.white : C.navy, marginTop:2 }}>{m.val}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
          <span style={{ fontSize:11, padding:"3px 9px", borderRadius:99, background: hov ? "rgba(0,200,220,.15)" : "rgba(26,42,156,.08)", color: hov ? C.cyan : C.blue, fontWeight:700, border:`1px solid ${hov?"rgba(0,200,220,.25)":"rgba(26,42,156,.12)"}` }}>
            {job.type}
          </span>
          {job.tags.map(t => (
            <span key={t} style={{ fontSize:11, padding:"3px 9px", borderRadius:99, background: hov ? "rgba(255,255,255,.07)" : C.gray100, color: hov ? "rgba(255,255,255,.6)" : C.gray700, fontWeight:500 }}>{t}</span>
          ))}
        </div>

        <div style={{ marginBottom:12 }}>
          <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, color: hov ? C.green : C.blue, padding:0, display:"flex", alignItems:"center", gap:4 }}>
            {expanded ? "▲" : "▼"} Beneficios ({job.benefits.length})
          </button>
          {expanded && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
              {job.benefits.map(b => (
                <span key={b} style={{ fontSize:11, padding:"4px 12px", borderRadius:99, background: hov ? "rgba(57,211,83,.12)" : "rgba(57,211,83,.08)", color: hov ? C.greenL : C.greenD, fontWeight:600, border:`1px solid ${hov?"rgba(57,211,83,.25)":"rgba(57,211,83,.15)"}` }}>{b}</span>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => onApply(job)} style={{
          width:"100%", padding:"11px 0", borderRadius:12, cursor:"pointer", fontWeight:800, fontSize:13,
          transition:"all .25s", fontFamily:"inherit",
          border: hov ? `1.5px solid ${C.green}` : "none",
          background: hov ? "transparent" : C.navy,
          color: hov ? C.green : C.white, letterSpacing:.3,
        }}>
          {hov ? "Postularme ahora →" : "Ver oferta"}
        </button>
      </div>
    </div>
  );
}

// ── PERFIL ────────────────────────────────────────────────────
function ProfileSection() {
  const [step, setStep]               = useState(0);
  const [data, setData]               = useState({ name:"", career:"", semester:"", skills:"", email:"", bio:"" });
  const [done, setDone]               = useState(false);
  const [notif, setNotif]             = useState("");
  const [activeSkill, setActiveSkill] = useState(null);
  const { isMobile }                  = useBreakpoint();

  const cur       = FIELDS[step];
  const showNotif = msg => { setNotif(msg); setTimeout(() => setNotif(""), 3000); };
  const next      = () => step < FIELDS.length - 1 ? setStep(s => s + 1) : setDone(true);
  const prev      = () => step > 0 && setStep(s => s - 1);
  const reset     = () => { setDone(false); setStep(0); setData({ name:"", career:"", semester:"", skills:"", email:"", bio:"" }); };
  const initials  = data.name ? data.name.trim().split(" ").slice(0,2).map(w => w[0]?.toUpperCase()).join("") : "??";
  const skillList = data.skills ? data.skills.split(",").map(s => s.trim()).filter(Boolean) : [];
  const pct       = Math.round((Object.values(data).filter(v => v.trim()).length / FIELDS.length) * 100);

  if (done) return (
    <div style={{ maxWidth:740, margin:"0 auto" }}>
      {notif && (
        <div style={{ background:C.green, color:C.white, padding:"12px 20px", borderRadius:12, marginBottom:16, fontWeight:700, textAlign:"center", boxShadow:"0 4px 16px rgba(57,211,83,.3)" }}>
          {notif}
        </div>
      )}

      {/* Hero Card */}
      <div style={{ background:HERO, borderRadius:24, overflow:"hidden", marginBottom:14, position:"relative" }}>
        <Particles />
        <div style={{ position:"absolute", top:-60, right:-60, width:260, height:260, borderRadius:"50%", background:"rgba(57,211,83,.08)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-80, left:-40, width:220, height:220, borderRadius:"50%", background:"rgba(0,200,220,.07)", pointerEvents:"none" }} />
        <div style={{ padding: isMobile ? "24px 18px" : "36px 32px", position:"relative" }}>
          <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap", marginBottom:20 }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:isMobile?68:90, height:isMobile?68:90, borderRadius:"50%", background:GREENG, display:"flex", alignItems:"center", justifyContent:"center", fontSize:isMobile?26:34, fontWeight:900, color:C.white, boxShadow:"0 0 0 4px rgba(57,211,83,.3),0 0 0 8px rgba(57,211,83,.1)" }}>
                {initials}
              </div>
              <div style={{ position:"absolute", bottom:2, right:2, width:20, height:20, borderRadius:"50%", background:C.green, border:`2px solid ${C.navyD}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>✓</div>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:isMobile?20:28, fontWeight:900, color:C.white, letterSpacing:-.5 }}>{data.name || "Tu Nombre"}</div>
              <div style={{ fontSize:14, color:"rgba(255,255,255,.7)", marginTop:4 }}>{data.career}</div>
              {data.semester && <div style={{ fontSize:13, color:C.green, marginTop:4, fontWeight:700, display:"flex", alignItems:"center", gap:6 }}><span>📅</span>{data.semester}</div>}
            </div>
            <div style={{ display:"flex", flexDirection:"row", gap:8, flexWrap:"wrap" }}>
              <div style={{ background:"rgba(57,211,83,.2)", border:"1px solid rgba(57,211,83,.4)", color:C.green, padding:"5px 12px", borderRadius:99, fontWeight:800, fontSize:11 }}>✓ Perfil CIAF</div>
              <div style={{ background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.6)", padding:"5px 12px", borderRadius:99, fontWeight:600, fontSize:11 }}>🏫 Pereira</div>
            </div>
          </div>
          <div style={{ background:"rgba(255,255,255,.06)", borderRadius:12, padding:"12px 14px", border:"1px solid rgba(255,255,255,.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:"rgba(255,255,255,.6)", fontWeight:600 }}>Completitud del perfil</span>
              <span style={{ fontSize:12, color:C.green, fontWeight:800 }}>{pct}%</span>
            </div>
            <div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,.1)", overflow:"hidden" }}>
              <div style={{ width:`${pct}%`, height:"100%", background:GREENG, borderRadius:99 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:12, marginBottom:12 }}>
        {data.bio && (
          <div style={{ background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:20, padding: isMobile ? 16 : 24, gridColumn:"1/-1", boxShadow:"0 2px 12px rgba(11,28,94,.05)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ width:32, height:32, borderRadius:10, background:"rgba(57,211,83,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>✍️</div>
              <span style={{ fontSize:12, fontWeight:800, color:C.green, letterSpacing:.8 }}>SOBRE MÍ</span>
            </div>
            <p style={{ fontSize:15, color:C.gray700, lineHeight:1.7, margin:0, fontStyle:"italic" }}>&ldquo;{data.bio}&rdquo;</p>
          </div>
        )}
        {skillList.length > 0 && (
          <div style={{ background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:20, padding: isMobile ? 16 : 24, boxShadow:"0 2px 12px rgba(11,28,94,.05)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <div style={{ width:32, height:32, borderRadius:10, background:"rgba(26,42,156,.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚡</div>
              <span style={{ fontSize:12, fontWeight:800, color:C.blue, letterSpacing:.8 }}>HABILIDADES</span>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {skillList.map((s, i) => (
                <button key={i} onClick={() => setActiveSkill(activeSkill === i ? null : i)} style={{
                  padding:"6px 14px", borderRadius:99, cursor:"pointer", fontWeight:700, fontSize:12,
                  transition:"all .2s", fontFamily:"inherit", border:"none",
                  background: activeSkill === i ? HERO : C.navy, color:C.white,
                  transform: activeSkill === i ? "scale(1.08)" : "scale(1)",
                  boxShadow: activeSkill === i ? "0 4px 16px rgba(26,42,156,.3)" : "none",
                }}>{s}</button>
              ))}
            </div>
            {activeSkill !== null && (
              <div style={{ marginTop:12, padding:"8px 12px", borderRadius:10, background:C.gray50, fontSize:12, color:C.gray500, border:`1px solid ${C.gray100}` }}>
                💡 Habilidad destacada: <strong>{skillList[activeSkill]}</strong>
              </div>
            )}
          </div>
        )}
        <div style={{ background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:20, padding: isMobile ? 16 : 24, boxShadow:"0 2px 12px rgba(11,28,94,.05)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:"rgba(0,200,220,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>📬</div>
            <span style={{ fontSize:12, fontWeight:800, color:C.cyan, letterSpacing:.8 }}>CONTACTO</span>
          </div>
          {[
            { icon:"📧", val:data.email || "—" },
            { icon:"🏫", val:"CIAF Pereira"     },
            { icon:"📍", val:"Pereira, Risaralda"},
          ].map(c => (
            <div key={c.icon} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.gray100}` }}>
              <span style={{ fontSize:16 }}>{c.icon}</span>
              <span style={{ fontSize:13, color:C.gray700 }}>{c.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap:10, marginBottom:12 }}>
        {[
          { icon:"🎯", val:"Top 15%", label:"Compatibilidad"            },
          { icon:"⭐", val:"4.8/5",   label:"Valoración"                },
          { icon:"👁️", val:"12",      label:"Empresas vieron tu perfil" },
        ].map((s, i) => (
          <div key={i} style={{ background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:16, padding:"16px 12px", textAlign:"center", boxShadow:"0 2px 8px rgba(11,28,94,.04)" }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontSize:18, fontWeight:900, color:C.navy }}>{s.val}</div>
            <div style={{ fontSize:11, color:C.gray500, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ofertas recomendadas */}
      <div style={{ background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:20, padding: isMobile ? 16 : 24, marginBottom:14, boxShadow:"0 2px 12px rgba(11,28,94,.05)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <div style={{ width:32, height:32, borderRadius:10, background:"rgba(57,211,83,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🎯</div>
          <span style={{ fontSize:12, fontWeight:800, color:C.green, letterSpacing:.8 }}>OFERTAS RECOMENDADAS</span>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {JOBS.slice(0,3).map(j => (
            <div key={j.id}
              style={{ display:"flex", alignItems:"center", gap:12, padding:"12px", borderRadius:14, background:C.gray50, border:`1px solid ${C.gray100}`, transition:"all .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.green}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.gray100}
            >
              <div style={{ width:40, height:40, borderRadius:12, background:HERO, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{j.logo}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{j.title}</div>
                <div style={{ fontSize:11, color:C.gray500, marginTop:2 }}>🏢 {j.company} · 💰 {j.salary}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5, flexShrink:0 }}>
                <span style={{ fontSize:11, fontWeight:800, color: j.match >= 90 ? "#39D353" : "#00C8DC" }}>{j.match}%</span>
                <button onClick={() => showNotif(`✅ Postulación enviada a ${j.company}`)}
                  style={{ padding:"5px 12px", borderRadius:8, border:"none", background:GREENG, color:C.white, fontWeight:700, fontSize:11, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                  Aplicar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={reset} style={{ width:"100%", padding:"13px 0", borderRadius:12, border:`1.5px solid ${C.gray300}`, background:"none", color:C.gray500, fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
        ← Editar perfil
      </button>
    </div>
  );

  // ── FORMULARIO ────────────────────────────────────────────
  return (
    <div style={{ maxWidth:520, margin:"0 auto" }}>
      <div style={{ display:"flex", gap:5, marginBottom:28 }}>
        {FIELDS.map((_, i) => (
          <div key={i} style={{ flex:1, height:4, borderRadius:99, background: i <= step ? "#39D353" : C.gray100, transition:"background .3s" }} />
        ))}
      </div>

      <div style={{ marginBottom:28 }}>
        <div style={{ display:"inline-block", background:"rgba(57,211,83,.1)", border:"1px solid rgba(57,211,83,.3)", borderRadius:99, padding:"4px 12px", fontSize:12, color:C.greenD, fontWeight:700, marginBottom:14 }}>
          Paso {step + 1} de {FIELDS.length}
        </div>
        <div style={{ fontSize:40, marginBottom:10 }}>{cur.icon}</div>
        <div style={{ fontSize:22, fontWeight:900, color:C.navy, marginBottom:4 }}>{cur.label}</div>
      </div>

      {cur.options ? (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {cur.options.map(opt => (
            <button key={opt} onClick={() => setData({ ...data, [cur.key]:opt })}
              style={{
                width:"100%", padding:"13px 18px", borderRadius:12, cursor:"pointer",
                border:`1.5px solid ${data[cur.key] === opt ? "#39D353" : C.gray300}`,
                background: data[cur.key] === opt ? "rgba(57,211,83,.08)" : C.white,
                color: data[cur.key] === opt ? C.greenD : C.gray700,
                fontWeight: data[cur.key] === opt ? 700 : 500, fontSize:14,
                textAlign:"left", transition:"all .2s",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                fontFamily:"inherit",
              }}>
              {opt}
              {data[cur.key] === opt && <span style={{ fontSize:16 }}>✅</span>}
            </button>
          ))}
        </div>
      ) : (
        <input
          value={data[cur.key]}
          onChange={e => setData({ ...data, [cur.key]:e.target.value })}
          onKeyDown={e => e.key === "Enter" && next()}
          placeholder={cur.placeholder}
          style={{ width:"100%", border:`1.5px solid ${C.gray300}`, borderRadius:12, padding:"14px 16px", fontSize:15, color:C.text, background:C.white, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }}
          onFocus={e => e.target.style.borderColor = "#39D353"}
          onBlur={e => e.target.style.borderColor = C.gray300}
        />
      )}

      <div style={{ display:"flex", gap:10, marginTop:20 }}>
        {step > 0 && (
          <button onClick={prev} style={{ flex:1, padding:"13px 0", borderRadius:12, border:`1.5px solid ${C.gray300}`, background:"none", color:C.gray500, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
            Atrás
          </button>
        )}
        <button onClick={next} style={{ flex:2, padding:"13px 0", borderRadius:12, border:"none", background:HERO, color:C.white, fontWeight:800, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
          {step < FIELDS.length - 1 ? "Siguiente →" : "Ver mi perfil 🚀"}
        </button>
      </div>
    </div>
  );
}

// ── APP PRINCIPAL ─────────────────────────────────────────────
export default function App() {
  const [tab, setTab]           = useState("inicio");
  const [filterC, setFilterC]   = useState("all");
  const [filterT, setFilterT]   = useState("all");
  const [notif, setNotif]       = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet }  = useBreakpoint();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goTab     = (id) => { setTab(id); setMenuOpen(false); window.scrollTo(0,0); };
  const showNotif = msg  => { setNotif(msg); setTimeout(() => setNotif(""), 3000); };
  const jobs = JOBS.filter(j => (filterC === "all" || j.career === filterC) && (filterT === "all" || j.type === filterT));
  const NAV  = [{ id:"inicio", label:"Inicio" }, { id:"ofertas", label:"Ofertas" }, { id:"perfil", label:"Mi Perfil" }, { id:"como", label:"¿Cómo funciona?" }];

  return (
    <>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family:'Segoe UI', system-ui, sans-serif; background:${C.gray50}; color:${C.text}; min-height:100vh; }
        button, input, textarea { font-family:inherit; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${C.blue}; border-radius:99px; }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { transform:translateX(60px); opacity:0; } to { transform:translateX(0); opacity:1; } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float   { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:.4; } }
        .fu { animation: fadeUp .4s ease forwards; }
        .card-hover:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(11,28,94,.12) !important; }
        @media (max-width:639px) { .hero-badges { display:none !important; } }
      `}</style>

      {/* Notificación */}
      {notif && (
        <div style={{ position:"fixed", top:16, right:16, left:16, zIndex:9999, background:C.navy, color:C.green, padding:"13px 18px", borderRadius:14, fontWeight:700, fontSize:14, animation:"slideIn .3s ease", boxShadow:"0 8px 28px rgba(11,28,94,.35)", display:"flex", alignItems:"center", gap:10, border:"1px solid rgba(57,211,83,.3)" }}>
          <span style={{ fontSize:18 }}>✅</span>{notif}
        </div>
      )}

      {/* ── NAVBAR ── */}
      <nav style={{ background: scrolled ? "rgba(11,28,94,.97)" : C.navy, position:"sticky", top:0, zIndex:100, boxShadow: scrolled ? "0 4px 24px rgba(7,14,56,.5)" : "0 2px 20px rgba(7,14,56,.3)", backdropFilter:"blur(12px)", transition:"all .3s" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60 }}>

          {/* Logo */}
          <div onClick={() => goTab("inicio")} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
            <div style={{ width:34, height:34, borderRadius:10, background:GREENG, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 4px 12px rgba(57,211,83,.3)", flexShrink:0 }}>💼</div>
            <div style={{ lineHeight:1 }}>
              <span style={{ fontWeight:900, fontSize:isMobile?14:16, color:C.white }}>Bolsa de Empleo</span>
              <span style={{ fontWeight:900, fontSize:isMobile?14:16, color:C.green }}> CIAF</span>
            </div>
          </div>

          {/* Nav links — solo desktop */}
          {!isMobile && (
            <div style={{ display:"flex", gap:2, background:"rgba(255,255,255,.06)", borderRadius:12, padding:4 }}>
              {NAV.map(n => (
                <button key={n.id} onClick={() => goTab(n.id)} style={{ padding:"7px 14px", borderRadius:8, border:"none", cursor:"pointer", background: tab===n.id ? "rgba(57,211,83,.18)" : "none", color: tab===n.id ? C.green : "rgba(255,255,255,.6)", fontWeight: tab===n.id ? 700 : 500, fontSize:13, transition:"all .2s", whiteSpace:"nowrap" }}>
                  {n.label}
                </button>
              ))}
            </div>
          )}

          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {/* CTA — solo desktop */}
            {!isMobile && (
              <button onClick={() => goTab("perfil")} style={{ padding:"8px 18px", borderRadius:99, border:"none", background:GREENG, color:C.white, fontWeight:800, fontSize:13, cursor:"pointer", boxShadow:"0 4px 14px rgba(57,211,83,.35)", whiteSpace:"nowrap" }}>
                Crear perfil →
              </button>
            )}

            {/* Hamburguesa — solo mobile */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{ background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", borderRadius:10, width:40, height:40, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, cursor:"pointer", padding:0, flexShrink:0 }}
              >
                <span style={{ display:"block", width:18, height:2, background: menuOpen ? C.green : C.white, borderRadius:2, transition:"all .25s", transform: menuOpen ? "rotate(45deg) translate(0,7px)" : "none" }} />
                <span style={{ display:"block", width:18, height:2, background: menuOpen ? "transparent" : C.white, borderRadius:2, transition:"all .25s" }} />
                <span style={{ display:"block", width:18, height:2, background: menuOpen ? C.green : C.white, borderRadius:2, transition:"all .25s", transform: menuOpen ? "rotate(-45deg) translate(0,-7px)" : "none" }} />
              </button>
            )}
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {isMobile && menuOpen && (
          <div style={{ background:"rgba(7,14,56,.98)", borderTop:"1px solid rgba(255,255,255,.08)", padding:"10px 14px 16px", animation:"slideDown .2s ease" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => goTab(n.id)} style={{ display:"block", width:"100%", padding:"12px 14px", borderRadius:10, border:"none", cursor:"pointer", background: tab===n.id ? "rgba(57,211,83,.1)" : "none", color: tab===n.id ? C.green : "rgba(255,255,255,.75)", fontWeight: tab===n.id ? 700 : 500, fontSize:15, textAlign:"left", marginBottom:3, transition:"all .2s" }}>
                {n.label}
              </button>
            ))}
            <button onClick={() => goTab("perfil")} style={{ display:"block", width:"100%", padding:"12px 0", borderRadius:12, border:"none", background:GREENG, color:C.white, fontWeight:800, fontSize:15, cursor:"pointer", marginTop:10, boxShadow:"0 4px 14px rgba(57,211,83,.3)" }}>
              Crear perfil gratis →
            </button>
          </div>
        )}
      </nav>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"0 16px" }}>

        {/* ══ INICIO ══════════════════════════════════════════ */}
        {tab === "inicio" && (
          <div className="fu">
            {/* Hero */}
            <div style={{ background:HERO, borderRadius:0, padding: isMobile ? "40px 20px 44px" : isTablet ? "52px 36px" : "64px 48px 56px", color:C.white, position:"relative", overflow:"hidden", margin:"0 -16px 32px", width:"calc(100% + 32px)" }}>
              <Particles />
              <div style={{ position:"absolute", top:-80, right:-80, width:340, height:340, borderRadius:"50%", background:"rgba(57,211,83,.07)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-80, right:180, width:260, height:260, borderRadius:"50%", background:"rgba(0,200,220,.06)", pointerEvents:"none" }} />

              <div style={{ position:"relative", maxWidth: isTablet ? "100%" : 600 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(57,211,83,.15)", border:"1px solid rgba(57,211,83,.3)", borderRadius:99, padding:"5px 14px", marginBottom:18, fontSize:11, color:C.green, fontWeight:700, letterSpacing:.8 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block", animation:"pulse 2s infinite" }} />
                  CIAF PEREIRA · PLATAFORMA ESTUDIANTIL
                </div>
                <h1 style={{ fontSize:"clamp(26px,5vw,60px)", fontWeight:900, lineHeight:1.08, letterSpacing:-1.5, marginBottom:16 }}>
                  No esperes el futuro.<br />
                  <span style={{ background:"linear-gradient(90deg,#39D353,#22D46A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                    ¡Prográmalo!
                  </span>
                </h1>
                <p style={{ fontSize:isMobile?14:17, color:"rgba(255,255,255,.72)", maxWidth:480, marginBottom:28, lineHeight:1.65 }}>
                  Conectamos estudiantes CIAF con empresas reales. Sin experiencia previa. Solo tu talento, habilidades y potencial.
                </p>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  <button onClick={() => goTab("perfil")} style={{ padding: isMobile?"11px 20px":"13px 30px", borderRadius:12, border:"none", background:GREENG, color:C.white, fontWeight:800, fontSize:isMobile?13:15, cursor:"pointer", boxShadow:"0 6px 20px rgba(57,211,83,.35)" }}>
                    Crear mi perfil gratis →
                  </button>
                  <button onClick={() => goTab("ofertas")} style={{ padding: isMobile?"11px 18px":"13px 28px", borderRadius:12, border:"1.5px solid rgba(255,255,255,.25)", background:"rgba(255,255,255,.08)", color:C.white, fontWeight:700, fontSize:isMobile?13:15, cursor:"pointer" }}>
                    Ver ofertas →
                  </button>
                </div>
              </div>

              {/* Badges flotantes — ocultos en mobile */}
              <div className="hero-badges" style={{ position:"absolute", right:40, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:12, opacity:.9 }}>
                {[
                  { e:"🎯", l:"89% Match",       c:"rgba(57,211,83,.15)", bc:"rgba(57,211,83,.3)"    },
                  { e:"🏢", l:"340+ Empresas",   c:"rgba(0,200,220,.12)", bc:"rgba(0,200,220,.25)"   },
                  { e:"⚡", l:"48h Respuesta",   c:"rgba(255,255,255,.07)",bc:"rgba(255,255,255,.15)" },
                ].map((b, i) => (
                  <div key={i} style={{ background:b.c, border:`1px solid ${b.bc}`, borderRadius:12, padding:"10px 16px", display:"flex", alignItems:"center", gap:10, backdropFilter:"blur(8px)", animation:`float ${5+i}s ${i*.8}s ease-in-out infinite` }}>
                    <span style={{ fontSize:20 }}>{b.e}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:C.white }}>{b.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:40 }}>
              {[
                { v:"1,200+", l:"Estudiantes activos", icon:"👥", col:"#39D353" },
                { v:"340+",   l:"Empresas aliadas",    icon:"🏢", col:"#00C8DC" },
                { v:"89%",    l:"Tasa de match",        icon:"🎯", col:"#39D353" },
                { v:"48h",    l:"Tiempo de respuesta",  icon:"⚡", col:"#00C8DC" },
              ].map((s, i) => (
                <div key={i} className="card-hover" style={{ textAlign:"center", background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:18, padding: isMobile ? "20px 10px" : "28px 16px", boxShadow:"0 2px 8px rgba(11,28,94,.05)", transition:"all .25s" }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:`rgba(${s.col==="#39D353"?"57,211,83":"0,200,220"},.1)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, margin:"0 auto 10px" }}>{s.icon}</div>
                  <div style={{ fontSize:isMobile?28:36, fontWeight:900, color:C.navy, letterSpacing:-1 }}>{s.v}</div>
                  <div style={{ fontSize:12, color:s.col, fontWeight:700, marginTop:6 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Preview ofertas */}
            <div style={{ marginBottom:56 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, gap:10, flexWrap:"wrap" }}>
                <h2 style={{ fontSize:isMobile?20:24, fontWeight:900, color:C.navy }}>Ofertas destacadas</h2>
                <button onClick={() => goTab("ofertas")} style={{ padding:"7px 16px", borderRadius:8, border:`1.5px solid ${C.gray300}`, background:C.white, color:C.navy, fontWeight:600, fontSize:13, cursor:"pointer" }}>Ver todas →</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
                {JOBS.slice(0,3).map(j => <JobCard key={j.id} job={j} onApply={() => showNotif(`Postulación enviada a ${j.company}`)} />)}
              </div>
            </div>
          </div>
        )}

        {/* ══ OFERTAS ══════════════════════════════════════════ */}
        {tab === "ofertas" && (
          <div className="fu" style={{ margin:"0 -16px", padding: isMobile ? "32px 16px 56px" : "48px 24px 80px", background:C.navy, minHeight:"60vh" }}>
            <h2 style={{ fontSize:isMobile?24:34, fontWeight:900, color:C.white, letterSpacing:-1, marginBottom:6 }}>Ofertas disponibles</h2>
            <p style={{ color:"rgba(255,255,255,.5)", fontSize:14, marginBottom:24 }}>{jobs.length} oportunidades te están esperando</p>

            {/* Filtros */}
            <div style={{ marginBottom:24, padding:"14px 14px", background:"rgba(255,255,255,.06)", borderRadius:16, border:"1px solid rgba(255,255,255,.1)" }}>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center", marginBottom:10 }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontWeight:700 }}>CARRERA</span>
                {CAREERS.map(c => (
                  <button key={c} onClick={() => setFilterC(c)} style={{ padding:"4px 12px", borderRadius:99, border:`1.5px solid ${filterC===c?"#39D353":"rgba(255,255,255,.2)"}`, background: filterC===c ? "rgba(57,211,83,.15)" : "rgba(255,255,255,.06)", color: filterC===c ? C.green : "rgba(255,255,255,.6)", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s" }}>
                    {c === "all" ? "Todas" : c}
                  </button>
                ))}
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                <span style={{ fontSize:11, color:"rgba(255,255,255,.4)", fontWeight:700 }}>TIPO</span>
                {TYPES.map(t => (
                  <button key={t} onClick={() => setFilterT(t)} style={{ padding:"4px 12px", borderRadius:99, border:`1.5px solid ${filterT===t?C.cyan:"rgba(255,255,255,.2)"}`, background: filterT===t ? "rgba(0,200,220,.15)" : "rgba(255,255,255,.06)", color: filterT===t ? C.cyan : "rgba(255,255,255,.6)", fontSize:12, fontWeight:700, cursor:"pointer", transition:"all .2s" }}>
                    {t === "all" ? "Todos" : t}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(320px,1fr))", gap:16 }}>
              {jobs.map(j => <JobCard key={j.id} job={j} onApply={() => showNotif(`Postulación enviada a ${j.company}`)} />)}
            </div>
            {jobs.length === 0 && (
              <div style={{ textAlign:"center", padding:60, color:"rgba(255,255,255,.3)" }}>
                <div style={{ fontSize:56, marginBottom:12 }}>🔍</div>
                <div style={{ fontSize:22, fontWeight:800, color:C.white }}>Sin resultados</div>
                <div style={{ fontSize:14, marginTop:6 }}>Intenta con otros filtros</div>
              </div>
            )}
          </div>
        )}

        {/* ══ PERFIL ══════════════════════════════════════════ */}
        {tab === "perfil" && (
          <div className="fu" style={{ paddingTop: isMobile ? 28 : 56, paddingBottom: isMobile ? 52 : 80 }}>
            <div style={{ textAlign:"center", marginBottom: isMobile ? 24 : 44 }}>
              <h2 style={{ fontSize:isMobile?24:34, fontWeight:900, color:C.navy, letterSpacing:-1, marginBottom:8 }}>Tu perfil estudiantil</h2>
              <p style={{ color:C.gray500, fontSize:14 }}>Completa tu información y te mostramos las mejores ofertas</p>
            </div>
            <ProfileSection />
          </div>
        )}

        {/* ══ CÓMO FUNCIONA ════════════════════════════════════ */}
        {tab === "como" && (
          <div className="fu" style={{ paddingTop: isMobile ? 28 : 56, paddingBottom: isMobile ? 52 : 80 }}>
            <div style={{ textAlign:"center", marginBottom: isMobile ? 28 : 52 }}>
              <h2 style={{ fontSize:isMobile?26:38, fontWeight:900, color:C.navy, letterSpacing:-1.5, marginBottom:12 }}>Del aula al trabajo</h2>
              <p style={{ color:C.gray500, fontSize:15, maxWidth:460, margin:"0 auto" }}>Un proceso diseñado para que tu talento brille sin necesitar años de experiencia.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(220px,1fr))", gap:16, marginBottom:48 }}>
              {[
                { icon:"👤", title:"Crea tu perfil",     desc:"Agrega habilidades, proyectos y logros académicos en minutos.",           col:C.green  },
                { icon:"🎯", title:"Match inteligente",  desc:"Conectamos tu perfil con las ofertas que mejor se ajustan a ti.",          col:C.cyan   },
                { icon:"✅", title:"Validación docente", desc:"Tus profesores avalan tus competencias y potencian tu perfil.",            col:C.blue   },
                { icon:"🚀", title:"Consigue el empleo", desc:"Postúlate con confianza y destaca entre los demás candidatos.",            col:C.purple },
              ].map((s, i) => (
                <div key={i} className="card-hover" style={{ background:C.white, border:`1.5px solid ${C.gray100}`, borderRadius:20, padding: isMobile ? "20px 16px" : 28, position:"relative", overflow:"hidden", boxShadow:"0 2px 12px rgba(11,28,94,.05)", transition:"all .25s" }}>
                  <div style={{ position:"absolute", top:-12, right:-12, fontSize:80, opacity:.04, fontWeight:900, lineHeight:1 }}>{i+1}</div>
                  <div style={{ width:52, height:52, borderRadius:16, background:HERO, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:14, boxShadow:"0 6px 16px rgba(11,28,94,.2)" }}>{s.icon}</div>
                  <div style={{ fontSize:16, fontWeight:800, color:C.navy, marginBottom:8 }}>{s.title}</div>
                  <div style={{ fontSize:14, color:C.gray500, lineHeight:1.65 }}>{s.desc}</div>
                  <div style={{ position:"absolute", bottom:0, left:0, width:"100%", height:3, background:`linear-gradient(90deg,${s.col},transparent)` }} />
                </div>
              ))}
            </div>

            <div style={{ background:HERO, borderRadius:20, padding: isMobile ? "36px 20px" : "48px 40px", textAlign:"center", color:C.white, position:"relative", overflow:"hidden" }}>
              <Particles />
              <div style={{ position:"relative" }}>
                <div style={{ fontSize:isMobile?22:30, fontWeight:900, marginBottom:12 }}>¿Listo para tu primer empleo?</div>
                <div style={{ fontSize:15, color:"rgba(255,255,255,.65)", maxWidth:400, margin:"0 auto 28px" }}>
                  Crea tu perfil hoy y empieza a conectar con empresas que valoran tu talento.
                </div>
                <button onClick={() => goTab("perfil")} style={{ padding: isMobile?"12px 28px":"14px 40px", borderRadius:12, border:"none", background:GREENG, color:C.white, fontWeight:900, fontSize:15, cursor:"pointer", boxShadow:"0 6px 20px rgba(57,211,83,.35)" }}>
                  Crear mi perfil →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ background:C.navy, marginTop:32, padding: isMobile ? "24px 16px" : "32px 24px", textAlign:"center" }}>
        <div style={{ fontWeight:900, fontSize:16, color:C.white, marginBottom:4 }}>
          Bolsa de Empleo <span style={{ color:C.green }}>CIAF</span>
        </div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>Centro Integral de Formación — Pereira, Risaralda · 2025</div>
      </footer>
    </>
  );
}
