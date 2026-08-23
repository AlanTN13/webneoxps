import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "design/news-covers");
const SOURCE_DIR = path.join(ROOT, "public/assets/insights/editorial-source");

const dataUri = async (file, mime) => {
  const buffer = await fs.readFile(file);
  return `data:${mime};base64,${buffer.toString("base64")}`;
};

const esc = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const text = (x, y, value, size = 24, weight = 600, fill = "#e2e8f0", extra = "") =>
  `<text x="${x}" y="${y}" font-family="Inter,Arial,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(value)}</text>`;

const roundRect = (x, y, width, height, fill = "#111d31", stroke = "#26344d", radius = 24, extra = "") =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" ${extra}/>`;

const pill = (x, y, width, label, fill, color = "#f8fafc") =>
  `${roundRect(x, y, width, 42, fill, "none", 21)}${text(x + width / 2, y + 28, label, 17, 700, color, 'text-anchor="middle" letter-spacing=".04em"')}`;

const arrow = (x1, y1, x2, y2, color = "#8b5cf6", width = 5, dash = "") =>
  `<path d="M ${x1} ${y1} L ${x2 - 16} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""}/><path d="M ${x2 - 18} ${y2 - 10} L ${x2} ${y2} L ${x2 - 18} ${y2 + 10}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;

const dot = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;

const windowChrome = (x, y, width, height, label = "") => `
  ${roundRect(x, y, width, height, "#f8fafc", "#cbd5e1", 26, 'filter="url(#shadow)"')}
  <path d="M ${x} ${y + 64} H ${x + width}" stroke="#dbe3ee" stroke-width="2"/>
  ${dot(x + 30, y + 32, 7, "#fb7185")}${dot(x + 54, y + 32, 7, "#fbbf24")}${dot(x + 78, y + 32, 7, "#34d399")}
  ${label ? text(x + 112, y + 41, label, 19, 650, "#334155") : ""}`;

function shell({ slug, accent = "#8b5cf6", accent2 = "#38bdf8", art, backgroundImage = "" }) {
  const image = backgroundImage
    ? `<image href="${backgroundImage}" x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/><rect width="1600" height="900" fill="url(#photoWash)"/>`
    : `<rect width="1600" height="900" fill="url(#background)"/><rect width="1600" height="900" fill="url(#grid)" opacity=".35"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-labelledby="title desc">
  <title id="title">${esc(slug)}</title>
  <desc id="desc">Portada editorial original de NexOps Insights.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse"><stop stop-color="#07111f"/><stop offset=".58" stop-color="#111b34"/><stop offset="1" stop-color="#25134d"/></linearGradient>
    <linearGradient id="photoWash" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse"><stop stop-color="#020617" stop-opacity=".15"/><stop offset=".55" stop-color="#020617" stop-opacity=".4"/><stop offset="1" stop-color="#020617" stop-opacity=".96"/></linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/></linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0H0V64" fill="none" stroke="#64748b" stroke-opacity=".12"/></pattern>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#020617" flood-opacity=".28"/></filter>
    <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="16"/></filter>
  </defs>
  ${image}
  <circle cx="1390" cy="110" r="230" fill="${accent}" opacity=".09" filter="url(#glow)"/>
  <path d="M80 72H138" stroke="${accent2}" stroke-width="4" stroke-linecap="round"/>
  ${text(158, 80, "NEXOPS  /  INSIGHTS", 18, 750, "#cbd5e1", 'letter-spacing=".18em"')}
  <g>${art}</g>
  <path d="M80 828H1520" stroke="#94a3b8" stroke-opacity=".18"/>
  ${text(80, 858, "EDITORIAL SYSTEM · LANDSCAPE 16:9", 14, 650, "#64748b", 'letter-spacing=".14em"')}
  <circle cx="1516" cy="850" r="8" fill="${accent}"/><circle cx="1488" cy="850" r="8" fill="${accent2}" opacity=".8"/>
</svg>`;
}

const phoneFrame = (x, y, width, height, brand, whatsappData) => `
  ${roundRect(x, y, width, height, "#eef3f8", "#ffffff", 48, 'stroke-width="5" filter="url(#shadow)"')}
  ${roundRect(x + 18, y + 18, width - 36, height - 36, "#e8f5ef", "none", 36)}
  ${roundRect(x + width / 2 - 70, y + 14, 140, 22, "#0f172a", "none", 11)}
  ${roundRect(x + 18, y + 66, width - 36, 84, "#075e54", "none", 0)}
  <image href="${whatsappData}" x="${x + 42}" y="${y + 85}" width="48" height="48"/>
  ${text(x + 108, y + 112, brand, 21, 750, "#ffffff")}
  ${text(x + 108, y + 136, "en línea", 14, 500, "#d1fae5")}
  ${roundRect(x + 48, y + 190, width - 112, 82, "#ffffff", "none", 18)}
  ${roundRect(x + 92, y + 300, width - 140, 92, "#d9fdd3", "none", 18)}
  ${roundRect(x + 48, y + 424, width - 112, 76, "#ffffff", "none", 18)}
  ${text(x + 68, y + 224, "Hola, quiero información", 17, 600, "#334155")}
  ${text(x + 110, y + 337, "Perfecto. ¿Qué necesitás", 16, 600, "#334155")}
  ${text(x + 110, y + 362, "resolver primero?", 16, 600, "#334155")}
  ${text(x + 68, y + 458, "Ventas y seguimiento", 17, 600, "#334155")}`;

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const [metaData, whatsappData, infrastructureData] = await Promise.all([
    dataUri(path.join(ROOT, "public/meta.svg"), "image/svg+xml"),
    dataUri(path.join(ROOT, "src/assets/whatsapp.svg"), "image/svg+xml"),
    dataUri(path.join(SOURCE_DIR, "infraestructura-ia-data-center.png"), "image/png"),
  ]);

  const covers = {
    "ai-overviews-de-google-ya-impacta-el-trafico-web-y-el-seo": shell({
      slug: "AI Overviews",
      accent: "#8b5cf6",
      accent2: "#38bdf8",
      art: `${windowChrome(150, 140, 1300, 610, "Google Search")}
        ${text(250, 237, "G", 54, 800, "#4285f4")}${text(292, 237, "o", 46, 700, "#ea4335")}${text(324, 237, "o", 46, 700, "#fbbc05")}${text(356, 237, "g", 46, 700, "#4285f4")}${text(389, 237, "l", 46, 700, "#34a853")}${text(405, 237, "e", 46, 700, "#ea4335")}
        ${roundRect(500, 185, 750, 66, "#ffffff", "#cbd5e1", 33)}${text(540, 228, "cómo automatizar reportes de ventas", 23, 500, "#334155")}
        ${roundRect(230, 300, 820, 330, "#f5f3ff", "#c4b5fd", 26)}${pill(270, 334, 164, "AI OVERVIEW", "#6d28d9")}
        ${text(270, 415, "La automatización conecta datos del CRM,", 24, 650, "#1e293b")}${text(270, 451, "facturación y planillas en un reporte único.", 24, 650, "#1e293b")}
        ${roundRect(270, 500, 210, 84, "#ffffff", "#ddd6fe", 18)}${roundRect(500, 500, 210, 84, "#ffffff", "#ddd6fe", 18)}${roundRect(730, 500, 210, 84, "#ffffff", "#ddd6fe", 18)}
        ${text(294, 538, "Fuente 1", 17, 700, "#475569")}${text(524, 538, "Fuente 2", 17, 700, "#475569")}${text(754, 538, "Fuente 3", 17, 700, "#475569")}
        ${roundRect(1090, 300, 270, 96, "#ffffff", "#e2e8f0", 18)}${roundRect(1090, 420, 270, 96, "#ffffff", "#e2e8f0", 18)}${roundRect(1090, 540, 270, 96, "#ffffff", "#e2e8f0", 18)}
        ${text(1120, 338, "Resultado orgánico", 18, 700, "#2563eb")}${text(1120, 458, "Resultado orgánico", 18, 700, "#2563eb")}${text(1120, 578, "Resultado orgánico", 18, 700, "#2563eb")}`,
    }),
    "como-armar-pipeline-ventas-crm": shell({
      slug: "Pipeline CRM",
      accent: "#6366f1",
      accent2: "#22d3ee",
      art: `${roundRect(120, 135, 1360, 610, "#f8fafc", "#cbd5e1", 30, 'filter="url(#shadow)"')}${text(170, 198, "PIPELINE COMERCIAL", 21, 800, "#334155", 'letter-spacing=".12em"')}${pill(1210, 166, 190, "CONVERSIÓN 28%", "#4f46e5")}
        ${[0,1,2,3].map((i)=>roundRect(170+i*310,250,278,420,"#eef2f7","#dbe3ee",20)).join("")}
        ${text(194, 292, "NUEVO", 17, 750, "#64748b")}${text(504, 292, "CALIFICADO", 17, 750, "#64748b")}${text(814, 292, "PROPUESTA", 17, 750, "#64748b")}${text(1124, 292, "CERRADO", 17, 750, "#64748b")}
        ${[[194,330,"ACME", "Ana · hoy"],[194,450,"Delta", "Luis · mañana"],[504,330,"Andes", "María · demo"],[504,450,"Norte", "Pablo · validar"],[814,330,"Global", "Julia · propuesta"],[1124,330,"Nova", "Ganado"]].map(([x,y,a,b],i)=>`${roundRect(x,y,230,92,i===5?"#dcfce7":"#ffffff",i===5?"#86efac":"#dbe3ee",16)}${text(x+20,y+34,a,19,750,"#1e293b")}${text(x+20,y+65,b,15,550,"#64748b")}`).join("")}
        ${arrow(448, 470, 496, 470, "#6366f1", 4)}${arrow(758, 470, 806, 470, "#6366f1", 4)}${arrow(1068, 470, 1116, 470, "#22c55e", 4)}`,
    }),
    "como-integrar-whatsapp-con-un-crm-para-no-perder-leads": shell({
      slug: "WhatsApp CRM",
      accent: "#25d366",
      accent2: "#60a5fa",
      art: `${phoneFrame(150, 125, 430, 620, "WhatsApp Business", whatsappData)}${arrow(610, 420, 780, 420, "#25d366", 8, "14 12")}
        ${roundRect(820, 155, 620, 560, "#f8fafc", "#cbd5e1", 30, 'filter="url(#shadow)"')}${pill(870, 200, 130, "CRM", "#2563eb")}${text(870, 287, "Ficha de lead", 31, 800, "#0f172a")}
        ${roundRect(870, 325, 230, 78, "#eff6ff", "#bfdbfe", 16)}${text(892, 356, "Estado", 14, 650, "#64748b")}${text(892, 385, "Calificado", 20, 800, "#1d4ed8")}
        ${roundRect(1120, 325, 270, 78, "#ecfdf5", "#a7f3d0", 16)}${text(1142, 356, "Próxima acción", 14, 650, "#64748b")}${text(1142, 385, "Llamar hoy", 20, 800, "#047857")}
        ${text(870, 462, "HISTORIAL", 15, 750, "#64748b", 'letter-spacing=".12em"')}${dot(894,510,8,"#25d366")}${dot(894,566,8,"#60a5fa")}${dot(894,622,8,"#8b5cf6")}<path d="M894 510V622" stroke="#cbd5e1" stroke-width="4"/>${text(926,517,"Mensaje recibido",18,650,"#334155")}${text(926,573,"Lead identificado",18,650,"#334155")}${text(926,629,"Seguimiento asignado",18,650,"#334155")}`,
    }),
    "ia-necesita-contexto-del-negocio": shell({
      slug: "Contexto de negocio",
      accent: "#a78bfa",
      accent2: "#38bdf8",
      art: `${text(120, 174, "CONTEXTO OPERATIVO", 21, 800, "#cbd5e1", 'letter-spacing=".14em"')}
        ${[[150,235,"REGLAS","Políticas · límites"],[150,380,"DATOS","Clientes · catálogo"],[150,525,"ESTADO","Pedido · oportunidad"],[1120,235,"SALIDA","Respuesta situada"],[1120,380,"ACCIÓN","Tarea permitida"],[1120,525,"CONTROL","Registro · revisión"]].map(([x,y,a,b],i)=>`${roundRect(x,y,330,104,i<3?"#16233a":"#132b31",i<3?"#475569":"#2dd4bf",20)}${text(x+24,y+38,a,15,800,i<3?"#a78bfa":"#5eead4",'letter-spacing=".12em"')}${text(x+24,y+75,b,20,650,"#e2e8f0")}`).join("")}
        ${[287,432,577].map(y=>arrow(490,y,680,430,"#8b5cf6",5)).join("")}${[287,432,577].map(y=>arrow(920,430,1110,y,"#38bdf8",5)).join("")}
        <circle cx="800" cy="430" r="146" fill="#6d28d9" opacity=".2" filter="url(#glow)"/>${roundRect(680,310,240,240,"url(#accent)","#c4b5fd",42,'filter="url(#shadow)"')}${text(800,399,"AI",72,850,"#ffffff",'text-anchor="middle"')}${text(800,449,"AGENT",19,800,"#ede9fe",'text-anchor="middle" letter-spacing=".16em"')}${pill(725,482,150,"CON CONTEXTO","#111827")}`,
    }),
    "la-burbuja-de-la-ia-no-esta-en-wall-street": shell({
      slug: "Infraestructura IA",
      accent: "#8b5cf6",
      accent2: "#fbbf24",
      backgroundImage: infrastructureData,
      art: `${roundRect(945, 150, 510, 555, "#07111f", "#334155", 32, 'fill-opacity=".88" stroke-opacity=".9" filter="url(#shadow)"')}${text(1000, 218, "INFRAESTRUCTURA IA", 19, 800, "#c4b5fd", 'letter-spacing=".14em"')}${text(1000, 270, "Capacidad que", 42, 800, "#ffffff")}${text(1000, 318, "condiciona el negocio", 42, 800, "#ffffff")}
        ${[[1000,380,"ENERGÍA","MW","#fbbf24"],[1000,490,"CAPACIDAD","GPU","#60a5fa"],[1000,600,"COSTO","$/RUN","#a78bfa"]].map(([x,y,a,b,c])=>`${roundRect(x,y,395,82,"#111d31","#334155",18)}${dot(x+35,y+41,10,c)}${text(x+62,y+34,a,14,800,"#94a3b8",'letter-spacing=".12em"')}${text(x+62,y+63,b,24,800,"#f8fafc")}<path d="M ${x+240} ${y+55} C ${x+278} ${y+20}, ${x+314} ${y+69}, ${x+360} ${y+29}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join("")}`,
    }),
    "meta-business-agent-whatsapp-leads-ventas": shell({
      slug: "Meta Business Agent",
      accent: "#0081fb",
      accent2: "#25d366",
      art: `<image href="${metaData}" x="120" y="110" width="350" height="196" preserveAspectRatio="xMinYMid meet"/>${phoneFrame(170, 235, 400, 520, "Business Agent", whatsappData)}
        ${roundRect(680, 155, 760, 560, "#f8fafc", "#cbd5e1", 30, 'filter="url(#shadow)"')}${pill(730,205,210,"LEAD EN CURSO","#0081fb")}${text(730,295,"Calificación comercial",31,800,"#0f172a")}
        ${[[730,345,"Necesidad","Seguimiento comercial","#dbeafe"],[730,450,"Empresa","PyME · 20 personas","#ede9fe"],[730,555,"Próximo paso","Agendar diagnóstico","#dcfce7"]].map(([x,y,a,b,c])=>`${roundRect(x,y,410,82,c,"none",16)}${text(x+20,y+30,a,14,750,"#64748b")}${text(x+20,y+60,b,20,750,"#1e293b")}`).join("")}
        ${arrow(1160, 386, 1340, 386, "#0081fb", 6)}${arrow(1160, 491, 1340, 491, "#25d366", 6)}${arrow(1160, 596, 1340, 596, "#8b5cf6", 6)}${pill(1280,365,110,"CONSULTA","#e0f2fe","#0369a1")}${pill(1280,470,110,"CALIFICA","#dcfce7","#047857")}${pill(1280,575,110,"AVANZA","#ede9fe","#6d28d9")}`,
    }),
    "openai-enfrenta-demanda-por-presunta-filtracion-de-datos-a-meta-y-google": shell({
      slug: "Gobierno de datos e IA",
      accent: "#f43f5e",
      accent2: "#8b5cf6",
      art: `${text(120,175,"DATOS SENSIBLES → PROVEEDOR IA",22,800,"#cbd5e1",'letter-spacing=".12em"')}
        ${roundRect(120,240,300,390,"#172033","#475569",26)}${text(170,295,"DATOS",20,800,"#f8fafc")}${[[170,340,"CLIENTES","#fee2e2"],[170,420,"CONTRATOS","#fef3c7"],[170,500,"OPERACIÓN","#dbeafe"]].map(([x,y,a,c])=>`${roundRect(x,y,200,58,c,"none",14)}${text(x+100,y+37,a,15,800,"#334155",'text-anchor="middle"')}`).join("")}
        ${arrow(440,435,585,435,"#f43f5e",6)}${roundRect(600,235,400,400,"#111d31","#8b5cf6",34,'stroke-width="3" filter="url(#shadow)"')}${text(800,300,"CLASIFICAR",18,800,"#fda4af",'text-anchor="middle" letter-spacing=".14em"')}${text(800,365,"REDACTAR",18,800,"#fde68a",'text-anchor="middle" letter-spacing=".14em"')}${text(800,430,"AUTORIZAR",18,800,"#93c5fd",'text-anchor="middle" letter-spacing=".14em"')}${text(800,495,"REGISTRAR",18,800,"#c4b5fd",'text-anchor="middle" letter-spacing=".14em"')}<path d="M800 535l-72-36v-90l72-36 72 36v90z" fill="#7c3aed" fill-opacity=".35" stroke="#c4b5fd" stroke-width="4"/>${text(800,470,"✓",42,800,"#ffffff",'text-anchor="middle"')}
        ${arrow(1020,435,1165,435,"#8b5cf6",6)}${roundRect(1180,240,300,390,"#13253a","#475569",26)}${text(1330,295,"DESTINOS",20,800,"#f8fafc",'text-anchor="middle"')}${pill(1235,340,190,"PROVEEDOR IA","#312e81")}${pill(1235,425,190,"CRM / ERP","#164e63")}${pill(1235,510,190,"LOG + CONTROL","#3f1d52")}`,
    }),
    "que-procesos-automatizar-primero-pyme": shell({
      slug: "Matriz de priorización",
      accent: "#f59e0b",
      accent2: "#8b5cf6",
      art: `${roundRect(170,135,1260,610,"#f8fafc","#cbd5e1",30,'filter="url(#shadow)"')}${text(230,195,"MATRIZ DE PRIORIZACIÓN",20,800,"#334155",'letter-spacing=".12em"')}
        <path d="M330 650V260M330 650H1330" stroke="#64748b" stroke-width="4" stroke-linecap="round"/><path d="M330 455H1330M830 260V650" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="12 10"/>
        ${text(790,705,"IMPACTO →",18,800,"#64748b",'text-anchor="middle" letter-spacing=".12em"')}${text(230,470,"FACTIBILIDAD",18,800,"#64748b",'text-anchor="middle" transform="rotate(-90 230 470)" letter-spacing=".12em"')}
        ${text(1060,308,"PRIORIZAR",16,800,"#16a34a",'text-anchor="middle" letter-spacing=".16em"')}${text(560,615,"POSTERGAR",16,800,"#94a3b8",'text-anchor="middle" letter-spacing=".16em"')}
        ${[[1100,350,72,"REPORTES","#22c55e"],[955,390,58,"SEGUIMIENTO","#8b5cf6"],[735,520,48,"ALTAS","#38bdf8"],[520,380,54,"EXCEPCIONES","#f43f5e"],[1210,505,42,"PEDIDOS","#f59e0b"]].map(([x,y,r,a,c])=>`${dot(x,y,r,c)}${text(x,y+6,a,15,800,"#ffffff",'text-anchor="middle"')}`).join("")}`,
    }),
    "rpa-vs-automatizacion-api": shell({
      slug: "RPA vs API",
      accent: "#38bdf8",
      accent2: "#a78bfa",
      art: `${roundRect(100,150,650,520,"#f8fafc","#cbd5e1",28,'filter="url(#shadow)"')}${roundRect(850,150,650,520,"#0f1f34","#334155",28,'filter="url(#shadow)"')}${pill(140,190,110,"RPA","#2563eb")}${pill(890,190,110,"API","#7c3aed")}
        ${windowChrome(165,270,520,290,"Aplicación de escritorio")}${roundRect(225,370,170,58,"#dbeafe","#93c5fd",12)}${text(310,407,"COPIAR",16,800,"#1d4ed8",'text-anchor="middle"')}${roundRect(455,370,170,58,"#dcfce7","#86efac",12)}${text(540,407,"PEGAR",16,800,"#047857",'text-anchor="middle"')}<path d="M415 438l34 44 18-18 30 54 24-14-30-54 24-8z" fill="#2563eb"/>
        ${[[930,300,"POST","/opportunities"],[930,405,"EVENT","lead.created"],[930,510,"GET","/customers/:id"]].map(([x,y,a,b],i)=>`${roundRect(x,y,500,72,"#162b46",i===0?"#38bdf8":i===1?"#a78bfa":"#34d399",16)}${pill(x+18,y+15,90,a,i===0?"#0369a1":i===1?"#6d28d9":"#047857")}${text(x+132,y+46,b,20,650,"#e2e8f0")}`).join("")}
        ${roundRect(650,635,300,74,"url(#accent)","#ffffff",37,'stroke-opacity=".3"')}${text(800,681,"HÍBRIDO",22,850,"#ffffff",'text-anchor="middle" letter-spacing=".14em"')}`,
    }),
    "whatsapp-crm-circuito-automatico-seguimiento-leads": shell({
      slug: "Circuito WhatsApp CRM",
      accent: "#25d366",
      accent2: "#8b5cf6",
      art: `${text(105,170,"CIRCUITO OPERATIVO DE SEGUIMIENTO",21,800,"#cbd5e1",'letter-spacing=".13em"')}
        ${[[105,"CHAT","#25d366"],[345,"IDENTIFICA","#38bdf8"],[585,"CLASIFICA","#8b5cf6"],[825,"ASIGNA","#f59e0b"],[1065,"CRM","#2563eb"],[1305,"KPI","#ec4899"]].map(([x,a,c],i)=>`${roundRect(x,265,180,250,"#f8fafc",c,24,'stroke-width="3" filter="url(#shadow)"')}${dot(x+90,330,34,c)}${text(x+90,338,String(i+1).padStart(2,"0"),18,850,"#ffffff",'text-anchor="middle"')}${text(x+90,402,a,16,850,"#334155",'text-anchor="middle" letter-spacing=".08em"')}${text(x+90,452,["Mensaje","Lead","Necesidad","Responsable","Acción","Resultado"][i],17,600,"#64748b",'text-anchor="middle"')}`).join("")}
        ${[285,525,765,1005,1245].map(x=>arrow(x,390,x+52,390,"#94a3b8",4)).join("")}
        ${pill(280,590,240,"SIN TAREAS PERDIDAS","#064e3b")}${pill(680,590,240,"PRÓXIMA ACCIÓN","#312e81")}${pill(1080,590,240,"TRAZABILIDAD","#1e3a8a")}`,
    }),
    "agente-ia-no-es-empleado-digital-limites": shell({
      slug: "Límites de agente IA",
      accent: "#8b5cf6",
      accent2: "#f43f5e",
      art: `${text(120,170,"PERMISOS · APROBACIÓN · ESCALAMIENTO",21,800,"#cbd5e1",'letter-spacing=".12em"')}
        <circle cx="800" cy="440" r="235" fill="#8b5cf6" opacity=".08" stroke="#a78bfa" stroke-width="3" stroke-dasharray="14 12"/>${roundRect(660,300,280,280,"url(#accent)","#c4b5fd",48,'filter="url(#shadow)"')}${text(800,414,"AI",78,850,"#ffffff",'text-anchor="middle"')}${text(800,470,"AGENTE",20,850,"#ede9fe",'text-anchor="middle" letter-spacing=".16em"')}
        ${[[150,250,"LEER CRM","PERMITIDO","#16a34a"],[150,520,"ENVIAR BORRADOR","APROBACIÓN","#f59e0b"],[1120,250,"CAMBIAR PRECIO","BLOQUEADO","#e11d48"],[1120,520,"CASO AMBIGUO","HUMANO","#2563eb"]].map(([x,y,a,b,c])=>`${roundRect(x,y,330,120,"#111d31","#475569",20)}${text(x+24,y+42,a,17,700,"#e2e8f0")}${pill(x+24,y+62,180,b,c)}`).join("")}
        ${arrow(490,310,640,385,"#22c55e",5)}${arrow(490,580,640,500,"#f59e0b",5)}${arrow(960,385,1110,310,"#e11d48",5)}${arrow(960,500,1110,580,"#2563eb",5)}`,
    }),
    "agentes-ia-produccion-control-limites": shell({
      slug: "Agentes IA en producción",
      accent: "#22d3ee",
      accent2: "#8b5cf6",
      art: `${roundRect(115,135,1370,610,"#091627","#334155",30,'filter="url(#shadow)"')}${text(165,195,"AGENT CONTROL PLANE",20,800,"#e2e8f0",'letter-spacing=".12em"')}${pill(1230,165,170,"PRODUCCIÓN","#065f46")}
        ${roundRect(160,240,810,430,"#101f34","#334155",22)}${text(200,287,"EJECUCIONES",16,800,"#94a3b8",'letter-spacing=".12em"')}${[[200,330,"run_4821","OK","2.4 s","#22c55e"],[200,410,"run_4822","REVIEW","8.7 s","#f59e0b"],[200,490,"run_4823","BLOCKED","1.2 s","#f43f5e"],[200,570,"run_4824","OK","3.1 s","#22c55e"]].map(([x,y,a,b,c,d])=>`${roundRect(x,y,730,62,"#162941","#263b57",13)}${text(x+20,y+39,a,18,700,"#e2e8f0")}${pill(x+270,y+10,140,b,d)}${text(x+620,y+39,c,17,650,"#94a3b8")}`).join("")}
        ${[[1030,240,"EVALUACIÓN","92 / 100","#22d3ee"],[1030,380,"PERMISOS","6 activos","#a78bfa"],[1030,520,"REVISIÓN HUMANA","1 pendiente","#fbbf24"]].map(([x,y,a,b,c])=>`${roundRect(x,y,390,120,"#101f34","#334155",20)}${text(x+24,y+38,a,14,800,"#94a3b8",'letter-spacing=".1em"')}${text(x+24,y+87,b,31,850,c)}`).join("")}`,
    }),
    "automatizar-un-proceso-roto-falla-mas-rapido": shell({
      slug: "Proceso roto",
      accent: "#f43f5e",
      accent2: "#f59e0b",
      art: `${text(120,170,"AUTOMATIZAR NO CORRIGE EL PROCESO",21,800,"#cbd5e1",'letter-spacing=".12em"')}
        ${[[150,320,"ENTRADA","#38bdf8"],[500,320,"REGLA","#8b5cf6"],[850,320,"EXCEPCIÓN","#f43f5e"],[1200,320,"SALIDA","#22c55e"]].map(([x,y,a,c])=>`${roundRect(x,y,240,120,"#111d31",c,22,'stroke-width="3" filter="url(#shadow)"')}${dot(x+40,y+60,16,c)}${text(x+72,y+68,a,19,800,"#e2e8f0")}`).join("")}
        ${arrow(400,380,490,380,"#64748b",5)}${arrow(750,380,840,380,"#64748b",5)}${arrow(1100,380,1190,380,"#64748b",5)}
        <path d="M970 455C970 640 515 650 515 470" fill="none" stroke="#f43f5e" stroke-width="10" stroke-linecap="round" stroke-dasharray="18 14"/><path d="M500 488l15-30 26 21" fill="none" stroke="#f43f5e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        ${pill(580,590,190,"RETRABAJO ×3","#9f1239")}${pill(830,590,210,"ERROR AMPLIFICADO","#7c2d12")}<path d="M780 470l-45 88h54l-20 88 90-120h-58l33-56z" fill="#fbbf24" stroke="#fef3c7" stroke-width="4"/>`,
    }),
    "big-tech-frena-regulaciones-mas-duras-sobre-ia-en-eeuu": shell({
      slug: "Gobernanza de IA",
      accent: "#60a5fa",
      accent2: "#a78bfa",
      art: `${roundRect(140,140,500,580,"#f8fafc","#cbd5e1",26,'filter="url(#shadow)"')}${text(200,205,"AI GOVERNANCE",22,850,"#1e293b",'letter-spacing=".12em"')}<path d="M200 245H570" stroke="#cbd5e1" stroke-width="3"/>${[0,1,2,3,4].map(i=>`<path d="M210 ${305+i*70}H540" stroke="#94a3b8" stroke-width="10" stroke-linecap="round" opacity="${.28+i*.08}"/>`).join("")}${pill(200,625,170,"NIST AI RMF","#1e3a8a")}${pill(390,625,170,"AI ACT","#312e81")}
        ${[[830,220,"01","INVENTARIO","#38bdf8"],[1120,330,"02","RIESGO","#f59e0b"],[1010,590,"03","CONTROLES","#8b5cf6"],[700,500,"04","RESPONSABLE","#22c55e"]].map(([x,y,n,a,c])=>`${roundRect(x,y,300,112,"#111d31",c,22,'stroke-width="3"')}${dot(x+48,y+56,27,c)}${text(x+48,y+64,n,16,850,"#ffffff",'text-anchor="middle"')}${text(x+88,y+65,a,18,800,"#e2e8f0")}`).join("")}<path d="M1040 262C1210 245 1310 390 1240 520C1170 650 930 670 780 570C630 470 690 290 830 260" fill="none" stroke="#64748b" stroke-width="4" stroke-dasharray="12 12"/>`,
    }),
    "como-automatizar-reportes-de-ventas": shell({
      slug: "Reportes de ventas",
      accent: "#22d3ee",
      accent2: "#8b5cf6",
      art: `${text(120,170,"FUENTES → MODELO → REPORTE PROGRAMADO",21,800,"#cbd5e1",'letter-spacing=".12em"')}${[[130,245,"CRM","#2563eb"],[130,385,"PLANILLAS","#16a34a"],[130,525,"FACTURACIÓN","#f59e0b"]].map(([x,y,a,c])=>`${roundRect(x,y,280,92,"#111d31",c,20,'stroke-width="3"')}${dot(x+40,y+46,14,c)}${text(x+72,y+55,a,18,800,"#e2e8f0")}`).join("")}${[291,431,571].map(y=>arrow(430,y,620,430,"#64748b",5)).join("")}
        ${roundRect(650,285,280,290,"url(#accent)","#c4b5fd",38,'filter="url(#shadow)"')}${text(790,383,"∑",76,800,"#ffffff",'text-anchor="middle"')}${text(790,440,"MODELO",19,850,"#ffffff",'text-anchor="middle" letter-spacing=".14em"')}${pill(705,475,170,"ACTUALIZA 08:00","#111827")}${arrow(950,430,1080,430,"#22d3ee",6)}
        ${roundRect(1110,215,360,430,"#f8fafc","#cbd5e1",24,'filter="url(#shadow)"')}${text(1150,270,"VENTAS · SEMANA",18,800,"#334155")}${text(1150,330,"$ 8.4 M",42,850,"#0f172a")}${text(1150,365,"+12% vs. objetivo",17,700,"#16a34a")}<path d="M1150 500C1200 470 1240 520 1290 455S1390 430 1430 390" fill="none" stroke="#7c3aed" stroke-width="8" stroke-linecap="round"/><path d="M1150 550H1430" stroke="#cbd5e1" stroke-width="3"/><rect x="1160" y="570" width="70" height="28" rx="8" fill="#38bdf8"/><rect x="1250" y="550" width="70" height="48" rx="8" fill="#8b5cf6"/><rect x="1340" y="520" width="70" height="78" rx="8" fill="#22c55e"/>`,
    }),
    "solicitud-interna-flujo-automatico-trabajo": shell({
      slug: "Solicitud a flujo",
      accent: "#8b5cf6",
      accent2: "#22d3ee",
      art: `${text(110,170,"DE SOLICITUD A TRABAJO TRAZABLE",21,800,"#cbd5e1",'letter-spacing=".12em"')}${[[100,"FORMULARIO","Entrada"],[365,"CLASIFICA","Reglas"],[630,"RESPONSABLE","Equipo"],[895,"ESTADOS","SLA"],[1160,"MÉTRICAS","Control"]].map(([x,a,b],i)=>`${roundRect(x,265,220,270,"#f8fafc",["#38bdf8","#8b5cf6","#22c55e","#f59e0b","#ec4899"][i],24,'stroke-width="3" filter="url(#shadow)"')}${dot(x+110,330,34,["#38bdf8","#8b5cf6","#22c55e","#f59e0b","#ec4899"][i])}${text(x+110,338,String(i+1),18,850,"#ffffff",'text-anchor="middle"')}${text(x+110,410,a,16,850,"#334155",'text-anchor="middle" letter-spacing=".06em"')}${text(x+110,455,b,18,600,"#64748b",'text-anchor="middle"')}`).join("")}${[320,585,850,1115].map(x=>arrow(x,400,x+38,400,"#94a3b8",4)).join("")}${roundRect(630,585,220,78,"#3f1d2e","#f43f5e",18)}${text(740,617,"EXCEPCIÓN",15,850,"#fda4af",'text-anchor="middle" letter-spacing=".12em"')}${text(740,646,"Deriva a humano",16,650,"#f8fafc",'text-anchor="middle"')}<path d="M740 535V575" stroke="#f43f5e" stroke-width="5"/>`,
    }),
    "como-hacer-dashboard-indicadores-gestion": shell({
      slug: "Dashboard de indicadores",
      accent: "#22d3ee",
      accent2: "#8b5cf6",
      art: `${roundRect(105,130,1390,620,"#f8fafc","#cbd5e1",30,'filter="url(#shadow)"')}${text(155,190,"DASHBOARD DE GESTIÓN",20,850,"#334155",'letter-spacing=".12em"')}${pill(1240,160,180,"ACTUALIZADO HOY","#0f766e")}
        ${[[155,235,"VENTAS","$ 8.4 M","+12%","#2563eb"],[475,235,"CONVERSIÓN","28%","+3.1 pp","#8b5cf6"],[795,235,"CICLO","18 días","-4 días","#16a34a"],[1115,235,"ESTANCADAS","12","requiere acción","#f43f5e"]].map(([x,y,a,b,c,d])=>`${roundRect(x,y,270,135,"#ffffff","#dbe3ee",18)}${text(x+22,y+34,a,14,800,"#64748b",'letter-spacing=".1em"')}${text(x+22,y+84,b,31,850,"#0f172a")}${text(x+22,y+114,c,15,700,d)}`).join("")}
        ${roundRect(155,405,760,275,"#ffffff","#dbe3ee",20)}${text(185,447,"TENDENCIA VS. META",15,800,"#64748b",'letter-spacing=".1em"')}<path d="M190 610C270 560 330 595 410 520S560 545 645 470S790 500 875 445" fill="none" stroke="#7c3aed" stroke-width="8" stroke-linecap="round"/><path d="M190 535H875" stroke="#22d3ee" stroke-width="4" stroke-dasharray="12 10" opacity=".7"/>${text(820,525,"META",14,800,"#0891b2")}
        ${roundRect(955,405,430,275,"#ffffff","#dbe3ee",20)}${text(985,447,"DESVÍOS Y RESPONSABLE",15,800,"#64748b",'letter-spacing=".08em"')}${[[985,485,"Oportunidades sin acción","María","#f43f5e"],[985,545,"Ciclo zona norte","Lucas","#f59e0b"],[985,605,"Conversión inbound","Ana","#22c55e"]].map(([x,y,a,b,c])=>`${dot(x+10,y+10,8,c)}${text(x+32,y+16,a,16,650,"#334155")}${pill(x+290,y-11,100,b,"#eef2ff","#4338ca")}`).join("")}`,
    }),
  };

  for (const [slug, svg] of Object.entries(covers)) {
    await fs.writeFile(path.join(OUTPUT_DIR, `${slug}.svg`), `${svg}\n`, "utf8");
  }
  const entries = Object.keys(covers);
  const contactSheet = `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="980" viewBox="0 0 1800 980">
    <rect width="1800" height="980" fill="#020617"/>
    ${entries.map((slug, index) => {
      const column = index % 4;
      const row = Math.floor(index / 4);
      const x = 24 + column * 444;
      const y = 24 + row * 190;
      return `<rect x="${x}" y="${y}" width="420" height="166" rx="14" fill="#0f172a" stroke="#334155"/><image href="./${slug}.svg" x="${x + 8}" y="${y + 8}" width="404" height="142" preserveAspectRatio="xMidYMid meet"/><text x="${x + 12}" y="${y + 160}" font-family="Inter,Arial,sans-serif" font-size="10" font-weight="650" fill="#cbd5e1">${esc(slug)}</text>`;
    }).join("")}
  </svg>`;
  await fs.writeFile(path.join(OUTPUT_DIR, "contact-sheet.svg"), `${contactSheet}\n`, "utf8");
  console.log(`news:covers OK — ${Object.keys(covers).length} SVG(s) editoriales en ${path.relative(ROOT, OUTPUT_DIR)}`);
}

main().catch((error) => {
  console.error(`news:covers ERROR — ${error.message}`);
  process.exit(1);
});
