import { useState, useEffect } from "react";

/*
 * MEDULA — Astrological Chart Animation Prototype
 * ================================================
 * 
 * ANIMATION TRAINING GUIDE
 * 
 * This prototype recreates the key properties from your reference video:
 * 1. Slow continuous rotation (CSS @keyframes)
 * 2. 3D perspective tilt (CSS transform: perspective + rotateX)
 * 3. Depth-of-field blur (SVG filter: blur on background layers)
 * 4. Cropped/zoomed framing (scale + overflow hidden)
 * 5. Monochrome ethereal treatment (desaturated palette + opacity)
 *
 * HOW TO READ THIS CODE:
 * - The <style> block at the bottom defines all animations
 * - Each ring layer is a separate SVG group with its own blur level
 * - The 3D effect comes from CSS perspective + rotateX on the container
 * - Tweak any value marked with "✏️ TUNE THIS" to experiment
 */

// ── Zodiac data ──
const ZODIAC = [
  { symbol: "♈", name: "Aries" },
  { symbol: "♉", name: "Taurus" },
  { symbol: "♊", name: "Gemini" },
  { symbol: "♋", name: "Cancer" },
  { symbol: "♌", name: "Leo" },
  { symbol: "♍", name: "Virgo" },
  { symbol: "♎", name: "Libra" },
  { symbol: "♏", name: "Scorpio" },
  { symbol: "♐", name: "Sagittarius" },
  { symbol: "♑", name: "Capricorn" },
  { symbol: "♒", name: "Aquarius" },
  { symbol: "♓", name: "Pisces" },
];

// ── Planet data (sample natal chart positions in degrees) ──
const PLANETS = [
  { symbol: "☉", name: "Sun", deg: 62 },
  { symbol: "☽", name: "Moon", deg: 198 },
  { symbol: "☿", name: "Mercury", deg: 45 },
  { symbol: "♀", name: "Venus", deg: 88 },
  { symbol: "♂", name: "Mars", deg: 155 },
  { symbol: "♃", name: "Jupiter", deg: 276 },
  { symbol: "♄", name: "Saturn", deg: 320 },
  { symbol: "⛢", name: "Uranus", deg: 12 },
  { symbol: "♆", name: "Neptune", deg: 230 },
  { symbol: "♇", name: "Pluto", deg: 185 },
];

// ── Aspect lines (connections between planets) ──
const ASPECTS = [
  { from: 62, to: 242, type: "opposition" },
  { from: 198, to: 318, type: "trine" },
  { from: 45, to: 165, type: "trine" },
  { from: 88, to: 268, type: "opposition" },
  { from: 155, to: 275, type: "trine" },
  { from: 276, to: 96, type: "trine" },
  { from: 12, to: 192, type: "opposition" },
  { from: 230, to: 350, type: "trine" },
  { from: 62, to: 182, type: "trine" },
  { from: 320, to: 140, type: "opposition" },
];

const CX = 500;
const CY = 500;

function polarToCart(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// ── Ring component: draws a circle with tick marks ──
function TickRing({ radius, tickCount, tickLength, opacity = 1 }) {
  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    const angle = (360 / tickCount) * i;
    const isMajor = i % 5 === 0;
    const len = isMajor ? tickLength * 1.8 : tickLength;
    const inner = polarToCart(CX, CY, radius - len, angle);
    const outer = polarToCart(CX, CY, radius, angle);
    ticks.push(
      <line
        key={i}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke="rgba(40,35,30,0.5)"
        strokeWidth={isMajor ? 1.2 : 0.6}
        opacity={opacity}
      />
    );
  }
  return <g>{ticks}</g>;
}

// ── Degree numbers on outer ring ──
function DegreeNumbers({ radius }) {
  const nums = [];
  for (let i = 0; i < 36; i++) {
    const angle = i * 10;
    const pos = polarToCart(CX, CY, radius, angle);
    nums.push(
      <text
        key={i}
        x={pos.x}
        y={pos.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        fontFamily="'EB Garamond', Georgia, serif"
        fill="rgba(40,35,30,0.55)"
        transform={`rotate(${angle}, ${pos.x}, ${pos.y})`}
      >
        {`${angle % 30}°`}
      </text>
    );
  }
  return <g>{nums}</g>;
}

// ── Zodiac symbols around the wheel ──
function ZodiacRing({ radius }) {
  return (
    <g>
      {ZODIAC.map((z, i) => {
        const angle = i * 30 + 15;
        const pos = polarToCart(CX, CY, radius, angle);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="22"
            fontFamily="serif"
            fill="rgba(40,35,30,0.7)"
            transform={`rotate(${angle}, ${pos.x}, ${pos.y})`}
          >
            {z.symbol}
          </text>
        );
      })}
    </g>
  );
}

// ── House division lines ──
function HouseLines({ innerR, outerR }) {
  const lines = [];
  const houseAngles = [0, 30, 55, 90, 120, 150, 180, 210, 240, 270, 300, 335];
  houseAngles.forEach((angle, i) => {
    const inner = polarToCart(CX, CY, innerR, angle);
    const outer = polarToCart(CX, CY, outerR, angle);
    lines.push(
      <line
        key={i}
        x1={inner.x}
        y1={inner.y}
        x2={outer.x}
        y2={outer.y}
        stroke="rgba(40,35,30,0.25)"
        strokeWidth={i % 3 === 0 ? 1.5 : 0.7}
      />
    );
  });
  return <g>{lines}</g>;
}

// ── Aspect lines between planets ──
function AspectLines({ radius }) {
  return (
    <g>
      {ASPECTS.map((a, i) => {
        const p1 = polarToCart(CX, CY, radius, a.from);
        const p2 = polarToCart(CX, CY, radius, a.to);
        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={
              a.type === "opposition"
                ? "rgba(40,35,30,0.12)"
                : "rgba(40,35,30,0.08)"
            }
            strokeWidth={0.8}
            strokeDasharray={a.type === "opposition" ? "none" : "4,3"}
          />
        );
      })}
    </g>
  );
}

// ── Planet glyphs ──
function PlanetGlyphs({ radius }) {
  return (
    <g>
      {PLANETS.map((p, i) => {
        const pos = polarToCart(CX, CY, radius, p.deg);
        return (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={10} fill="rgba(255,252,247,0.85)" />
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontFamily="serif"
              fill="rgba(40,35,30,0.8)"
            >
              {p.symbol}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ── Controls panel for tuning ──
function Controls({ params, setParams, showControls, setShowControls }) {
  if (!showControls) {
    return (
      <button onClick={() => setShowControls(true)} style={styles.toggleBtn}>
        ✏️ Tune Parameters
      </button>
    );
  }

  const sliders = [
    { key: "rotationSpeed", label: "Rotation Speed", min: 0, max: 200, unit: "s", help: "Duration of one full 360° rotation. Higher = slower." },
    { key: "perspectiveDistance", label: "Perspective Distance", min: 200, max: 2000, unit: "px", help: "Camera distance. Lower = more dramatic 3D." },
    { key: "tiltX", label: "Tilt X°", min: 0, max: 80, unit: "°", help: "How tilted the chart is toward you." },
    { key: "tiltY", label: "Tilt Y°", min: -30, max: 30, unit: "°", help: "Side-to-side tilt." },
    { key: "zoom", label: "Zoom", min: 0.8, max: 3.0, step: 0.1, unit: "×", help: "How close the camera is." },
    { key: "bgBlur", label: "Background Blur", min: 0, max: 8, step: 0.5, unit: "px", help: "Blur on the inner/aspect layer (depth of field)." },
    { key: "midBlur", label: "Mid Blur", min: 0, max: 4, step: 0.5, unit: "px", help: "Blur on the middle ring layer." },
    { key: "fgBlur", label: "Foreground Blur", min: 0, max: 4, step: 0.5, unit: "px", help: "Blur on the outermost sharp ring." },
    { key: "brightness", label: "Brightness", min: 0.8, max: 1.5, step: 0.05, unit: "", help: "Overall brightness of the scene." },
  ];

  return (
    <div style={styles.controls}>
      <div style={styles.controlsHeader}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#8a8580" }}>
          Animation Parameters
        </span>
        <button onClick={() => setShowControls(false)} style={styles.closeBtn}>✕</button>
      </div>
      {sliders.map((s) => (
        <div key={s.key} style={styles.sliderRow}>
          <div style={styles.sliderLabel}>
            <span>{s.label}</span>
            <span style={styles.sliderValue}>
              {params[s.key]}{s.unit}
            </span>
          </div>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step || 1}
            value={params[s.key]}
            onChange={(e) =>
              setParams((p) => ({ ...p, [s.key]: parseFloat(e.target.value) }))
            }
            style={styles.slider}
          />
          <div style={styles.helpText}>{s.help}</div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════
export default function MedulaChart() {
  const [params, setParams] = useState({
    rotationSpeed: 90,       // ✏️ TUNE THIS — seconds per full rotation
    perspectiveDistance: 600, // ✏️ TUNE THIS — lower = more dramatic 3D
    tiltX: 62,               // ✏️ TUNE THIS — degrees of tilt toward viewer
    tiltY: -5,               // ✏️ TUNE THIS — side tilt
    zoom: 1.9,               // ✏️ TUNE THIS — scale factor
    bgBlur: 4,               // ✏️ TUNE THIS — blur for deepest layer
    midBlur: 1.5,            // ✏️ TUNE THIS — blur for middle layer
    fgBlur: 0,               // ✏️ TUNE THIS — blur for front layer (0 = sharp)
    brightness: 1.1,         // ✏️ TUNE THIS — overall brightness
  });

  const [showControls, setShowControls] = useState(false);
  const [offsetX, setOffsetX] = useState(80);
  const [offsetY, setOffsetY] = useState(-60);

  // Animate a very slow drift of the framing position
  useEffect(() => {
    let frame;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      // Gentle sinusoidal drift
      setOffsetX(80 + Math.sin(t * 0.03) * 30);
      setOffsetY(-60 + Math.cos(t * 0.04) * 20);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={styles.root}>
      {/* Inject keyframes animation */}
      <style>{`
        @keyframes chartRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes subtleGlow {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.5; }
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: #d5d0cb;
          border-radius: 2px;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #8a8580;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
        }
      `}</style>

      {/* Background with subtle radial gradient */}
      <div style={styles.bgLayer} />

      {/* 3D scene container */}
      <div
        style={{
          ...styles.scene,
          perspective: `${params.perspectiveDistance}px`,
        }}
      >
        {/* The tilted + zoomed plane */}
        <div
          style={{
            ...styles.chartPlane,
            transform: `
              rotateX(${params.tiltX}deg)
              rotateY(${params.tiltY}deg)
              scale(${params.zoom})
              translate(${offsetX}px, ${offsetY}px)
            `,
            filter: `brightness(${params.brightness})`,
          }}
        >
          {/* Rotating chart group */}
          <div
            style={{
              ...styles.rotator,
              animation: `chartRotate ${params.rotationSpeed}s linear infinite`,
            }}
          >
            <svg
              viewBox="0 0 1000 1000"
              width="1000"
              height="1000"
              style={{ overflow: "visible" }}
            >
              {/* ── LAYER 1: DEEPEST — aspect lines + inner circle (most blurred) ── */}
              <g style={{ filter: `blur(${params.bgBlur}px)` }}>
                {/* Inner glow circle */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={150}
                  fill="none"
                  stroke="rgba(40,35,30,0.06)"
                  strokeWidth="1"
                />
                <AspectLines radius={220} />
                <HouseLines innerR={150} outerR={340} />
                <circle
                  cx={CX}
                  cy={CY}
                  r={220}
                  fill="none"
                  stroke="rgba(40,35,30,0.15)"
                  strokeWidth="0.8"
                />
              </g>

              {/* ── LAYER 2: MIDDLE — planet ring + zodiac (slightly blurred) ── */}
              <g style={{ filter: `blur(${params.midBlur}px)` }}>
                <circle
                  cx={CX}
                  cy={CY}
                  r={280}
                  fill="none"
                  stroke="rgba(40,35,30,0.12)"
                  strokeWidth="0.6"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={340}
                  fill="none"
                  stroke="rgba(40,35,30,0.2)"
                  strokeWidth="1"
                />
                <TickRing radius={340} tickCount={360} tickLength={6} opacity={0.4} />
                <PlanetGlyphs radius={310} />
                <ZodiacRing radius={370} />
                {/* Zodiac division lines */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = i * 30;
                  const inner = polarToCart(CX, CY, 280, angle);
                  const outer = polarToCart(CX, CY, 400, angle);
                  return (
                    <line
                      key={`zdiv-${i}`}
                      x1={inner.x}
                      y1={inner.y}
                      x2={outer.x}
                      y2={outer.y}
                      stroke="rgba(40,35,30,0.18)"
                      strokeWidth="0.8"
                    />
                  );
                })}
              </g>

              {/* ── LAYER 3: FOREGROUND — outer ring with degrees (sharpest) ── */}
              <g style={{ filter: `blur(${params.fgBlur}px)` }}>
                <circle
                  cx={CX}
                  cy={CY}
                  r={400}
                  fill="none"
                  stroke="rgba(40,35,30,0.3)"
                  strokeWidth="1.2"
                />
                <circle
                  cx={CX}
                  cy={CY}
                  r={430}
                  fill="none"
                  stroke="rgba(40,35,30,0.25)"
                  strokeWidth="0.8"
                />
                <TickRing radius={430} tickCount={360} tickLength={8} opacity={0.6} />
                <DegreeNumbers radius={445} />
                {/* Outer decorative ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={460}
                  fill="none"
                  stroke="rgba(40,35,30,0.15)"
                  strokeWidth="0.5"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Soft vignette overlay */}
      <div style={styles.vignette} />

      {/* Title watermark */}
      <div style={styles.title}>MEDULA</div>

      {/* Tuning controls */}
      <Controls
        params={params}
        setParams={setParams}
        showControls={showControls}
        setShowControls={setShowControls}
      />
    </div>
  );
}

// ══════════════════════════════════════════
// STYLES
// ══════════════════════════════════════════
const styles = {
  root: {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background: "#f5f2ed",
    fontFamily: "'EB Garamond', Georgia, serif",
  },
  bgLayer: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at 40% 45%, rgba(255,253,248,1) 0%, rgba(240,236,228,0.8) 50%, rgba(225,220,212,0.6) 100%)",
  },
  scene: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspectiveOrigin: "50% 40%",
  },
  chartPlane: {
    transformStyle: "preserve-3d",
    transition: "filter 0.3s ease",
  },
  rotator: {
    width: 1000,
    height: 1000,
    transformOrigin: "center center",
  },
  vignette: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at center, transparent 30%, rgba(240,236,228,0.4) 70%, rgba(225,220,212,0.8) 100%)",
    pointerEvents: "none",
  },
  title: {
    position: "absolute",
    bottom: 32,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 14,
    letterSpacing: "0.35em",
    color: "rgba(120,110,100,0.4)",
    fontFamily: "'EB Garamond', Georgia, serif",
    pointerEvents: "none",
  },
  toggleBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: "8px 16px",
    background: "rgba(255,252,247,0.85)",
    border: "1px solid rgba(40,35,30,0.12)",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 13,
    color: "#6a6560",
    fontFamily: "'EB Garamond', Georgia, serif",
    backdropFilter: "blur(10px)",
    zIndex: 10,
  },
  controls: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 280,
    padding: "16px 20px",
    background: "rgba(255,252,247,0.92)",
    border: "1px solid rgba(40,35,30,0.1)",
    borderRadius: 12,
    backdropFilter: "blur(20px)",
    zIndex: 10,
    maxHeight: "calc(100vh - 48px)",
    overflowY: "auto",
  },
  controlsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(40,35,30,0.08)",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    color: "#8a8580",
    padding: "2px 6px",
  },
  sliderRow: {
    marginBottom: 14,
  },
  sliderLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    color: "#6a6560",
    marginBottom: 4,
  },
  sliderValue: {
    fontVariantNumeric: "tabular-nums",
    color: "#8a8580",
    fontSize: 11,
  },
  slider: {
    width: "100%",
    cursor: "pointer",
  },
  helpText: {
    fontSize: 10,
    color: "#aaa69e",
    marginTop: 2,
    lineHeight: 1.3,
  },
};
