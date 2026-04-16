import { useState } from "react";

// ── TOKENS DE COLOR — Paleta oficial CIAF (extraída de ciaf.edu.co) ──
const C = {
  navy:    "#0B1C5E",   // azul marino oscuro (navbar)
  navyD:   "#070E38",
  navyL:   "#1A2F80",
  blue:    "#1A2A9C",   // azul vibrante más oscuro
  purple:  "#3D1FB8",   // morado hero más oscuro
  green:   "#39D353",   // verde neón CIAF ("Prográmalo")
  greenD:  "#22A33A",
  cyan:    "#00C8DC",   // cian botones
  white:   "#FFFFFF",
  gray50:  "#F4F6FF",
  gray100: "#E8ECF8",
  gray300: "#A8B2D4",
  gray500: "#5A6490",
  gray700: "#2E3560",
  text:    "#0B1240",
};

const HERO_GRAD = "linear-gradient(135deg, #0B1C5E 0%, #1A2A9C 50%, #3D1FB8 100%)";
const GREEN_GRAD = "linear-gradient(90deg, #39D353, #22D46A)";
const CYAN_GRAD  = "linear-gradient(90deg, #00C8DC, #00A8C0)";

// ── DATOS ────────────────────────────────────────────────────
const JOBS = [
  { id:1, title:"Desarrollador Frontend Jr.", company:"TechCo",     logo:"TC", location:"Bogotá",  type:"Tiempo completo", career:"Sistemas",     match:95, tags:["React","CSS","Git"],        desc:"Construye interfaces modernas para millones de usuarios." },
  { id:2, title:"Analista de Datos",          company:"DataVision",  logo:"DV", location:"Remoto",  type:"Prácticas",       career:"Sistemas",     match:88, tags:["Python","SQL","Excel"],     desc:"Transforma datos en decisiones estratégicas de negocio." },
  { id:3, title:"Diseñador UX/UI",            company:"CreativeHub", logo:"CH", location:"Medellín",type:"Medio tiempo",    career:"Diseño",       match:76, tags:["Figma","Illustrator"],      desc:"Diseña experiencias digitales que enamoran a los usuarios." },
  { id:4, title:"Asistente Contable",         company:"FinanzasPro", logo:"FP", location:"Bogotá",  type:"Prácticas",       career:"Contabilidad", match:82, tags:["Excel","SAP"],              desc:"Apoya procesos contables en empresa líder del sector." },
  { id:5, title:"Community Manager",          company:"BrandLab",    logo:"BL", location:"Remoto",  type:"Freelance",       career:"Marketing",    match:70, tags:["Instagram","Canva"],        desc:"Gestiona redes sociales y crea contenido de alto impacto." },
  { id:6, title:"Soporte TI",                 company:"NetSolve",    logo:"NS", location:"Bogotá",  type:"Tiempo completo", career:"Sistemas",     match:91, tags:["Redes","Windows","Soporte"],desc:"Brinda soporte técnico a usuarios internos y externos." },
];

const CAREERS = ["all","Sistemas","Diseño","Contabilidad","Marketing"];
const TYPES   = ["all","Tiempo completo","Medio tiempo","Prácticas","Freelance"];
const STEPS   = [
  {icon:"👤",title:"Crea tu perfil",    desc:"Agrega habilidades, proyectos y logros académicos en minutos."},
  {icon:"🎯",title:"Match inteligente", desc:"Conectamos tu perfil con las ofertas que mejor se ajustan a ti."},
  {icon:"✅",title:"Validación docente",desc:"Tus profesores avalan tus competencias y potencian tu perfil."},
  {icon:"🚀",title:"Consigue el empleo",desc:"Postúlate con confianza y destaca entre los demás candidatos."},
];

// ── MATCH BAR ────────────────────────────────────────────────
function MatchBar({ pct }) {
  const col = pct>=90 ? C.green : pct>=75 ? C.cyan : "#FF9800";
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
      <div style={{flex:1,height:6,borderRadius:99,background:C.gray100,overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",background:col,borderRadius:99}}/>
      </div>
      <span style={{fontSize:12,fontWeight:800,color:col,minWidth:34}}>{pct}%</span>
    </div>
  );
}

// ── JOB CARD ─────────────────────────────────────────────────
function JobCard({ job, onApply }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? HERO_GRAD : C.white,
        border:`1.5px solid ${hov ? C.blue : C.gray100}`,
        borderRadius:16, padding:22, transition:"all .25s",
        transform:hov?"translateY(-4px)":"none",
        boxShadow:hov?`0 16px 40px rgba(43,62,198,.2)`:`0 2px 8px rgba(11,28,94,.06)`,
        position:"relative", overflow:"hidden", cursor:"pointer",
      }}
    >
      {job.match>=90&&(
        <div style={{position:"absolute",top:12,right:12,background:C.green,color:C.white,fontSize:10,fontWeight:900,padding:"3px 10px",borderRadius:99}}>
          TOP MATCH
        </div>
      )}
      <div style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:14}}>
        <div style={{width:46,height:46,borderRadius:12,background:hov?"rgba(57,211,83,.15)":C.gray100,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color:hov?C.green:C.navy,flexShrink:0,border:`1.5px solid ${hov?"rgba(57,211,83,.3)":C.gray100}`,transition:"all .25s"}}>
          {job.logo}
        </div>
        <div>
          <div style={{fontSize:15,fontWeight:800,color:hov?C.white:C.navy,lineHeight:1.2}}>{job.title}</div>
          <div style={{fontSize:13,color:hov?"rgba(255,255,255,.6)":C.gray500,marginTop:3}}>{job.company} · {job.location}</div>
        </div>
      </div>
      <div style={{fontSize:13,color:hov?"rgba(255,255,255,.65)":C.gray500,marginBottom:12,lineHeight:1.5}}>{job.desc}</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
        <span style={{fontSize:11,padding:"3px 10px",borderRadius:99,background:hov?"rgba(0,200,220,.15)":"rgba(11,28,94,.06)",color:hov?C.cyan:C.blue,fontWeight:700}}>{job.type}</span>
        {job.tags.map(t=>(
          <span key={t} style={{fontSize:11,padding:"3px 10px",borderRadius:99,background:hov?"rgba(255,255,255,.08)":C.gray50,color:hov?"rgba(255,255,255,.5)":C.gray700,fontWeight:500}}>{t}</span>
        ))}
      </div>
      <div style={{marginBottom:14}}>
        <div style={{fontSize:11,color:hov?"rgba(255,255,255,.4)":C.gray300,fontWeight:700,letterSpacing:.5}}>COMPATIBILIDAD</div>
        <MatchBar pct={job.match}/>
      </div>
      <button onClick={()=>onApply(job)} style={{
        width:"100%",padding:"10px 0",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13,transition:"all .25s",fontFamily:"inherit",
        border:hov?`1.5px solid ${C.green}`:"none",
        background:hov?"transparent":C.navy,
        color:hov?C.green:C.white,
      }}>
        {hov?"Postularme ahora →":"Ver oferta"}
      </button>
    </div>
  );
}

// ── FORMULARIO DE PERFIL ─────────────────────────────────────
const FIELDS = [
  {key:"name",     label:"¿Cuál es tu nombre completo?",       placeholder:"Ej: María Fernanda González", icon:"👤"},
  {key:"career",   label:"¿Qué carrera estudias en CIAF?",     placeholder:"Ej: Ingeniería de Software",   icon:"🎓"},
  {key:"semester", label:"¿En qué semestre o nivel vas?",       placeholder:"Ej: Semestre 4 / Técnico",     icon:"📅"},
  {key:"skills",   label:"¿Cuáles son tus habilidades clave?", placeholder:"Ej: React, Figma, Excel…",      icon:"⚡"},
  {key:"email",    label:"¿Cuál es tu correo electrónico?",    placeholder:"tucorreo@ciaf.edu.co",          icon:"📧"},
  {key:"bio",      label:"Cuéntanos algo sobre ti",            placeholder:"Una frase que te defina…",      icon:"✍️"},
];

function ProfileSection() {
  const [step, setStep]   = useState(0);
  const [data, setData]   = useState({name:"",career:"",semester:"",skills:"",email:"",bio:""});
  const [done, setDone]   = useState(false);
  const [notif, setNotif] = useState("");

  const cur = FIELDS[step];
  const showNotif = msg => { setNotif(msg); setTimeout(()=>setNotif(""),3000); };
  const next = () => step < FIELDS.length-1 ? setStep(s=>s+1) : setDone(true);
  const prev = () => step > 0 && setStep(s=>s-1);
  const reset = () => { setDone(false); setStep(0); setData({name:"",career:"",semester:"",skills:"",email:"",bio:""}); };

  const initials = data.name
    ? data.name.trim().split(" ").slice(0,2).map(w=>w[0]?.toUpperCase()).join("")
    : "??";

  // ── PERFIL COMPLETADO ─────────────────────────────────────
  if (done) return (
    <div style={{maxWidth:720,margin:"0 auto"}}>
      {notif&&<div style={{background:C.green,color:C.white,padding:"12px 20px",borderRadius:10,marginBottom:16,fontWeight:700,textAlign:"center"}}>{notif}</div>}

      {/* Header */}
      <div style={{background:HERO_GRAD,borderRadius:20,padding:"36px 32px",color:C.white,marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:220,height:220,borderRadius:"50%",background:"rgba(57,211,83,.1)"}}/>
        <div style={{position:"absolute",bottom:-60,left:-20,width:180,height:180,borderRadius:"50%",background:"rgba(0,200,220,.08)"}}/>
        <div style={{display:"flex",gap:24,alignItems:"center",flexWrap:"wrap",position:"relative"}}>
          <div style={{width:84,height:84,borderRadius:"50%",background:GREEN_GRAD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:900,color:C.white,flexShrink:0,boxShadow:`0 0 0 4px rgba(57,211,83,.35),0 0 0 8px rgba(57,211,83,.12)`}}>
            {initials}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:28,fontWeight:900,letterSpacing:-.5}}>{data.name||"Tu Nombre"}</div>
            <div style={{fontSize:15,color:"rgba(255,255,255,.7)",marginTop:4}}>{data.career}</div>
            {data.semester&&<div style={{fontSize:13,color:C.green,marginTop:4,fontWeight:700}}>{data.semester}</div>}
          </div>
          <div style={{background:C.green,color:C.white,padding:"8px 18px",borderRadius:99,fontWeight:800,fontSize:13}}>✓ Perfil CIAF</div>
        </div>
      </div>

      {/* Grid info */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        {data.bio&&(
          <div style={{background:C.white,border:`1.5px solid ${C.gray100}`,borderRadius:16,padding:22,gridColumn:"1/-1"}}>
            <div style={{fontSize:11,fontWeight:800,color:C.green,letterSpacing:1,marginBottom:8}}>SOBRE MÍ</div>
            <div style={{fontSize:15,color:C.gray700,lineHeight:1.65}}>{data.bio}</div>
          </div>
        )}
        {data.skills&&(
          <div style={{background:C.white,border:`1.5px solid ${C.gray100}`,borderRadius:16,padding:22}}>
            <div style={{fontSize:11,fontWeight:800,color:C.green,letterSpacing:1,marginBottom:12}}>HABILIDADES</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {data.skills.split(",").map(s=>s.trim()).filter(Boolean).map((s,i)=>(
                <span key={i} style={{padding:"5px 12px",borderRadius:99,background:HERO_GRAD,color:C.white,fontSize:12,fontWeight:700}}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.email&&(
          <div style={{background:C.white,border:`1.5px solid ${C.gray100}`,borderRadius:16,padding:22}}>
            <div style={{fontSize:11,fontWeight:800,color:C.green,letterSpacing:1,marginBottom:12}}>CONTACTO</div>
            <div style={{fontSize:14,color:C.gray700,marginBottom:6}}>📧 {data.email}</div>
            <div style={{fontSize:14,color:C.gray700}}>🏫 CIAF Pereira</div>
          </div>
        )}
      </div>

      {/* Ofertas recomendadas */}
      <div style={{background:C.white,border:`1.5px solid ${C.gray100}`,borderRadius:16,padding:22,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:800,color:C.green,letterSpacing:1,marginBottom:16}}>OFERTAS RECOMENDADAS PARA TI</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {JOBS.slice(0,3).map(j=>(
            <div key={j.id} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 14px",borderRadius:12,background:C.gray50,border:`1px solid ${C.gray100}`}}>
              <div style={{width:38,height:38,borderRadius:10,background:HERO_GRAD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:C.white,flexShrink:0}}>{j.logo}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,color:C.navy}}>{j.title}</div>
                <div style={{fontSize:12,color:C.gray500}}>{j.company} · {j.location}</div>
              </div>
              <button onClick={()=>showNotif(`✅ Postulación enviada a ${j.company}`)} style={{padding:"6px 14px",borderRadius:8,border:"none",background:GREEN_GRAD,color:C.white,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
                Aplicar
              </button>
            </div>
          ))}
        </div>
      </div>

      <button onClick={reset} style={{width:"100%",padding:"13px 0",borderRadius:12,border:`1.5px solid ${C.gray300}`,background:"none",color:C.gray500,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
        ← Editar perfil
      </button>
    </div>
  );

  // ── FORMULARIO PASO A PASO ────────────────────────────────
  return (
    <div style={{maxWidth:520,margin:"0 auto"}}>
      {/* Barra de progreso */}
      <div style={{display:"flex",gap:5,marginBottom:28}}>
        {FIELDS.map((_,i)=>(
          <div key={i} style={{flex:1,height:4,borderRadius:99,background:i<=step?C.green:C.gray100,transition:"background .3s"}}/>
        ))}
      </div>

      <div style={{marginBottom:28}}>
        <div style={{display:"inline-block",background:`rgba(57,211,83,.1)`,border:`1px solid rgba(57,211,83,.3)`,borderRadius:99,padding:"4px 12px",fontSize:12,color:C.greenD,fontWeight:700,marginBottom:14}}>
          Paso {step+1} de {FIELDS.length}
        </div>
        <div style={{fontSize:36,marginBottom:10}}>{cur.icon}</div>
        <div style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:4}}>{cur.label}</div>
      </div>

      <input
        value={data[cur.key]}
        onChange={e=>setData({...data,[cur.key]:e.target.value})}
        onKeyDown={e=>e.key==="Enter"&&next()}
        placeholder={cur.placeholder}
        style={{width:"100%",border:`1.5px solid ${C.gray300}`,borderRadius:12,padding:"14px 16px",fontSize:15,color:C.text,background:C.white,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}
        onFocus={e=>e.target.style.borderColor=C.green}
        onBlur={e=>e.target.style.borderColor=C.gray300}
      />

      <div style={{display:"flex",gap:10,marginTop:20}}>
        {step>0&&(
          <button onClick={prev} style={{flex:1,padding:"13px 0",borderRadius:12,border:`1.5px solid ${C.gray300}`,background:"none",color:C.gray500,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Atrás
          </button>
        )}
        <button onClick={next} style={{flex:2,padding:"13px 0",borderRadius:12,border:"none",background:HERO_GRAD,color:C.white,fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>
          {step<FIELDS.length-1 ? "Siguiente →" : "Ver mi perfil 🚀"}
        </button>
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]       = useState("inicio");
  const [filterC, setFilterC] = useState("all");
  const [filterT, setFilterT] = useState("all");
  const [notif, setNotif]   = useState("");

  const showNotif = msg => { setNotif(msg); setTimeout(()=>setNotif(""),3000); };
  const jobs = JOBS.filter(j=>(filterC==="all"||j.career===filterC)&&(filterT==="all"||j.type===filterT));

  const NAV = [
    {id:"inicio", label:"Inicio"},
    {id:"ofertas",label:"Ofertas"},
    {id:"perfil", label:"Mi Perfil"},
    {id:"como",   label:"¿Cómo funciona?"},
  ];

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Segoe UI',system-ui,sans-serif;background:${C.gray50};color:${C.text};min-height:100vh}
        button,input{font-family:inherit}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:${C.blue};border-radius:99px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{transform:translateX(60px);opacity:0}to{transform:translateX(0);opacity:1}}
        .fu{animation:fadeUp .45s ease forwards}
      `}</style>

      {/* NOTIFICACIÓN */}
      {notif&&(
        <div style={{position:"fixed",top:20,right:20,zIndex:9999,background:C.navy,color:C.green,padding:"13px 22px",borderRadius:12,fontWeight:700,fontSize:14,animation:"slideIn .3s ease",boxShadow:"0 8px 24px rgba(11,28,94,.3)"}}>
          {notif}
        </div>
      )}

      {/* ── NAVBAR (azul marino como ciaf.edu.co) ── */}
      <nav style={{background:C.navy,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(7,14,56,.4)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:8,background:GREEN_GRAD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>💼</div>
            <div>
              <span style={{fontWeight:900,fontSize:17,color:C.white,letterSpacing:-.3}}>Bolsa de Empleo</span>
              <span style={{fontWeight:900,fontSize:17,color:C.green,letterSpacing:-.3}}> CIAF</span>
            </div>
          </div>
          {/* Tabs */}
          <div style={{display:"flex",gap:2}}>
            {NAV.map(n=>(
              <button key={n.id} onClick={()=>setTab(n.id)} style={{
                padding:"8px 16px",borderRadius:8,border:"none",cursor:"pointer",
                background:tab===n.id?"rgba(57,211,83,.15)":"none",
                color:tab===n.id?C.green:"rgba(255,255,255,.65)",
                fontWeight:tab===n.id?700:500,fontSize:13,transition:"all .2s",
              }}>{n.label}</button>
            ))}
          </div>
          {/* CTA */}
          <button onClick={()=>setTab("perfil")} style={{padding:"9px 20px",borderRadius:99,border:"none",background:GREEN_GRAD,color:C.white,fontWeight:800,fontSize:13,cursor:"pointer"}}>
            Crear perfil →
          </button>
        </div>
      </nav>

      <main style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>

        {/* ══ INICIO ════════════════════════════════════════ */}
        {tab==="inicio"&&(
          <div className="fu">
            {/* HERO — degradado azul-morado como la web de CIAF */}
            <div style={{background:HERO_GRAD,borderRadius:"0 0 28px 28px",padding:"64px 48px",color:C.white,marginBottom:40,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-80,right:-80,width:320,height:320,borderRadius:"50%",background:"rgba(57,211,83,.08)"}}/>
              <div style={{position:"absolute",bottom:-60,left:-40,width:240,height:240,borderRadius:"50%",background:"rgba(0,200,220,.07)"}}/>
              <div style={{position:"relative",maxWidth:580}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(57,211,83,.15)",border:`1px solid rgba(57,211,83,.3)`,borderRadius:99,padding:"6px 16px",marginBottom:22,fontSize:12,color:C.green,fontWeight:700,letterSpacing:.8}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:C.green,display:"inline-block"}}/>
                  CIAF PEREIRA · PLATAFORMA ESTUDIANTIL
                </div>
                <h1 style={{fontSize:"clamp(32px,4.5vw,58px)",fontWeight:900,lineHeight:1.08,letterSpacing:-2,marginBottom:16}}>
                  No esperes el futuro.<br/>
                  <span style={{background:GREEN_GRAD,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                    ¡Empieza hoy!
                  </span>
                </h1>
                <p style={{fontSize:17,color:"rgba(255,255,255,.75)",maxWidth:460,marginBottom:32,lineHeight:1.65}}>
                  Conectamos estudiantes CIAF con empresas reales. Sin experiencia previa. Solo tu talento y potencial.
                </p>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <button onClick={()=>setTab("perfil")} style={{padding:"13px 28px",borderRadius:12,border:"none",background:GREEN_GRAD,color:C.white,fontWeight:800,fontSize:15,cursor:"pointer"}}>
                    Crear mi perfil →
                  </button>
                  <button onClick={()=>setTab("ofertas")} style={{padding:"13px 28px",borderRadius:12,border:`1.5px solid rgba(255,255,255,.25)`,background:"rgba(255,255,255,.08)",color:C.white,fontWeight:700,fontSize:15,cursor:"pointer"}}>
                    Ver ofertas →
                  </button>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginBottom:48}}>
              {[
                {v:"1,200+",l:"Estudiantes activos",  icon:"👥"},
                {v:"340+",  l:"Empresas aliadas",      icon:"🏢"},
                {v:"89%",   l:"Tasa de match",          icon:"🎯"},
                {v:"48h",   l:"Tiempo de respuesta",    icon:"⚡"},
              ].map((s,i)=>(
                <div key={i} style={{textAlign:"center",background:C.white,border:`1.5px solid ${C.gray100}`,borderRadius:16,padding:"28px 16px",boxShadow:`0 2px 8px rgba(11,28,94,.05)`}}>
                  <div style={{fontSize:28,marginBottom:6}}>{s.icon}</div>
                  <div style={{fontSize:36,fontWeight:900,color:C.navy,letterSpacing:-1}}>{s.v}</div>
                  <div style={{fontSize:13,color:C.green,fontWeight:700,marginTop:6}}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* PREVIEW CARDS */}
            <div style={{marginBottom:64}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                <h2 style={{fontSize:24,fontWeight:900,color:C.navy}}>Ofertas destacadas</h2>
                <button onClick={()=>setTab("ofertas")} style={{padding:"8px 18px",borderRadius:8,border:`1.5px solid ${C.gray300}`,background:C.white,color:C.navy,fontWeight:600,fontSize:13,cursor:"pointer"}}>Ver todas →</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:16}}>
                {JOBS.slice(0,3).map(j=><JobCard key={j.id} job={j} onApply={()=>showNotif(`✅ Postulación enviada a ${j.company}`)}/>)}
              </div>
            </div>
          </div>
        )}

        {/* ══ OFERTAS ════════════════════════════════════════ */}
        {tab==="ofertas"&&(
          <div className="fu" style={{paddingTop:48,paddingBottom:80}}>
            <h2 style={{fontSize:34,fontWeight:900,color:C.navy,letterSpacing:-1,marginBottom:6}}>Ofertas disponibles</h2>
            <p style={{color:C.gray500,fontSize:15,marginBottom:28}}>{jobs.length} oportunidades esperan tu postulación</p>

            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:28,padding:"16px 18px",background:C.white,borderRadius:14,border:`1.5px solid ${C.gray100}`}}>
              <span style={{fontSize:12,color:C.gray300,alignSelf:"center",fontWeight:700,marginRight:4}}>CARRERA</span>
              {CAREERS.map(c=>(
                <button key={c} onClick={()=>setFilterC(c)} style={{padding:"5px 14px",borderRadius:99,border:`1.5px solid ${filterC===c?C.green:C.gray300}`,background:filterC===c?`rgba(57,211,83,.1)`:C.white,color:filterC===c?C.greenD:C.gray500,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {c==="all"?"Todas":c}
                </button>
              ))}
              <div style={{width:1,background:C.gray100,margin:"0 4px"}}/>
              <span style={{fontSize:12,color:C.gray300,alignSelf:"center",fontWeight:700,marginRight:4}}>TIPO</span>
              {TYPES.map(t=>(
                <button key={t} onClick={()=>setFilterT(t)} style={{padding:"5px 14px",borderRadius:99,border:`1.5px solid ${filterT===t?C.cyan:C.gray300}`,background:filterT===t?`rgba(0,200,220,.1)`:C.white,color:filterT===t?C.cyan:C.gray500,fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {t==="all"?"Todos":t}
                </button>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
              {jobs.map(j=><JobCard key={j.id} job={j} onApply={()=>showNotif(`✅ Postulación enviada a ${j.company}`)}/>)}
            </div>

            {jobs.length===0&&(
              <div style={{textAlign:"center",padding:80,color:C.gray300}}>
                <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                <div style={{fontSize:20,fontWeight:800,color:C.navy}}>Sin resultados</div>
                <div style={{fontSize:14,marginTop:6}}>Intenta con otros filtros</div>
              </div>
            )}
          </div>
        )}

        {/* ══ PERFIL ════════════════════════════════════════ */}
        {tab==="perfil"&&(
          <div className="fu" style={{paddingTop:56,paddingBottom:80}}>
            <div style={{textAlign:"center",marginBottom:44}}>
              <h2 style={{fontSize:34,fontWeight:900,color:C.navy,letterSpacing:-1,marginBottom:8}}>Tu perfil estudiantil</h2>
              <p style={{color:C.gray500,fontSize:15}}>Completa tu información y te mostramos las mejores ofertas</p>
            </div>
            <ProfileSection/>
          </div>
        )}

        {/* ══ CÓMO FUNCIONA ══════════════════════════════════ */}
        {tab==="como"&&(
          <div className="fu" style={{paddingTop:56,paddingBottom:80}}>
            <div style={{textAlign:"center",marginBottom:52}}>
              <h2 style={{fontSize:38,fontWeight:900,color:C.navy,letterSpacing:-1.5,marginBottom:12}}>Del aula al trabajo</h2>
              <p style={{color:C.gray500,fontSize:16,maxWidth:460,margin:"0 auto"}}>Un proceso diseñado para que tu talento brille sin necesitar años de experiencia.</p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:20,marginBottom:56}}>
              {STEPS.map((s,i)=>(
                <div key={i} style={{background:C.white,border:`1.5px solid ${C.gray100}`,borderRadius:20,padding:28,position:"relative",overflow:"hidden",boxShadow:"0 2px 12px rgba(11,28,94,.06)"}}>
                  <div style={{position:"absolute",top:-10,right:-10,fontSize:72,opacity:.04,fontWeight:900}}>{i+1}</div>
                  <div style={{width:52,height:52,borderRadius:14,background:HERO_GRAD,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:16}}>
                    {s.icon}
                  </div>
                  <div style={{fontSize:17,fontWeight:800,color:C.navy,marginBottom:8}}>{s.title}</div>
                  <div style={{fontSize:14,color:C.gray500,lineHeight:1.6}}>{s.desc}</div>
                  <div style={{position:"absolute",bottom:0,left:0,width:"100%",height:3,background:`linear-gradient(90deg,${[C.green,C.cyan,C.blue,C.purple][i]},transparent)`}}/>
                </div>
              ))}
            </div>

            {/* CTA FINAL */}
            <div style={{background:HERO_GRAD,borderRadius:20,padding:"44px 40px",textAlign:"center",color:C.white,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:"rgba(57,211,83,.1)"}}/>
              <div style={{fontSize:28,fontWeight:900,marginBottom:12,position:"relative"}}>¿Listo para tu primer empleo?</div>
              <div style={{fontSize:15,color:"rgba(255,255,255,.65)",marginBottom:28,maxWidth:400,margin:"0 auto 28px",position:"relative"}}>
                Crea tu perfil hoy y empieza a conectar con empresas que valoran tu talento.
              </div>
              <button onClick={()=>setTab("perfil")} style={{padding:"14px 36px",borderRadius:12,border:"none",background:GREEN_GRAD,color:C.white,fontWeight:900,fontSize:15,cursor:"pointer",position:"relative"}}>
                Crear mi perfil →
              </button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{background:C.navy,marginTop:40,padding:"32px 24px",textAlign:"center"}}>
        <div style={{fontWeight:900,fontSize:16,color:C.white,marginBottom:4}}>
          Bolsa de Empleo <span style={{color:C.green}}>CIAF</span>
        </div>
        <div style={{fontSize:12,color:"rgba(255,255,255,.3)"}}>
          Centro Integral de Formación — Pereira, Risaralda · 2025
        </div>
      </footer>
    </>
  );
}
