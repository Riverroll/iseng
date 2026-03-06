"use client"
import { useEffect, useRef } from 'react';

// --- Virgo constellation (top-right area, normalized 0-1) ---
const VIRGO_STARS = [
  { name: 'Spica',        x: 0.88, y: 0.55 },
  { name: 'Vindemiatrix', x: 0.78, y: 0.18 },
  { name: 'Porrima',      x: 0.82, y: 0.35 },
  { name: 'Auva',         x: 0.75, y: 0.28 },
  { name: 'Minelauva',    x: 0.72, y: 0.22 },
  { name: 'Zaniah',       x: 0.80, y: 0.42 },
  { name: 'Heze',         x: 0.85, y: 0.48 },
  { name: 'Syrma',        x: 0.90, y: 0.62 },
  { name: 'Kang',         x: 0.93, y: 0.70 },
];
const VIRGO_LINES = [[0,6],[6,5],[5,2],[2,1],[2,3],[3,4],[5,7],[7,8]];

const ASTEROID_COLORS = ['#6b5e4e','#857569','#7a6a5a','#9e8e7e','#5c5048'];

interface Asteroid {
  x: number; y: number; z: number; vz: number;
  rotation: number; rotSpeed: number;
  baseSize: number; color: string; shape: number[];
}
interface Meteoroid {
  x: number; y: number; dx: number; dy: number;
  length: number; opacity: number; speed: number;
}
interface CanvasRocket {
  angle: number; speed: number;
  orbitRx: number; orbitRy: number;
  cx: number; cy: number; size: number;
}

function rng(seed: number) {
  let s = (seed * 16807 + 49297) % 2147483647;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}

function makeAsteroid(i: number): Asteroid {
  const r = rng(i * 9301 + 49297);
  const vcount = Math.floor(r() * 4) + 6;
  return {
    x: (r() - 0.5) * 1.4,
    y: (r() - 0.5) * 1.4,
    z: 1.5 + r() * 5,          // start closer so they're visible sooner
    vz: 0.018 + r() * 0.025,   // faster
    rotation: r() * Math.PI * 2,
    rotSpeed: (r() - 0.5) * 0.04,
    baseSize: 22 + r() * 28,
    color: ASTEROID_COLORS[Math.floor(r() * ASTEROID_COLORS.length)],
    shape: Array.from({ length: vcount }, () => 0.55 + r() * 0.45),
  };
}

function resetAsteroid(ast: Asteroid, i: number): Asteroid {
  const r = rng(i * 1234 + (Date.now() % 99991));
  const angle = r() * Math.PI * 2;
  const radius = 0.3 + r() * 0.5;
  return {
    ...ast,
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    z: 6 + r() * 2,
    rotation: r() * Math.PI * 2,
  };
}

function spawnMeteoroid(W: number, H: number): Meteoroid {
  const edge = Math.floor(Math.random() * 4);
  let x = 0, y = 0;
  if      (edge === 0) { x = Math.random() * W; y = -30; }
  else if (edge === 1) { x = W + 30; y = Math.random() * H; }
  else if (edge === 2) { x = Math.random() * W; y = H + 30; }
  else                 { x = -30; y = Math.random() * H; }
  const angle = Math.random() * Math.PI * 2;
  const speed = 6 + Math.random() * 7;
  return { x, y, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed,
           length: 50 + Math.random() * 90, opacity: 0.6 + Math.random() * 0.4, speed };
}

function makeRocket(i: number): CanvasRocket {
  const r = rng(i * 7919 + 3571);
  return {
    angle: r() * Math.PI * 2,
    speed: (0.001 + r() * 0.0015) * (r() > 0.5 ? 1 : -1),
    orbitRx: 0.22 + r() * 0.2,
    orbitRy: 0.09 + r() * 0.1,
    cx: 0.25 + r() * 0.5,
    cy: 0.25 + r() * 0.5,
    size: 10 + r() * 8,
  };
}

// --- draw helpers ---
function hex(color: string, delta: number) {
  const n = parseInt(color.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + delta);
  const g = clamp(((n >> 8) & 0xff) + delta);
  const b = clamp((n & 0xff) + delta);
  return `rgb(${r},${g},${b})`;
}

function drawAsteroid(ctx: CanvasRenderingContext2D,
  cx: number, cy: number, size: number, rot: number,
  shape: number[], color: string) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.beginPath();
  shape.forEach((r, i) => {
    const a = (i / shape.length) * Math.PI * 2;
    const px = Math.cos(a) * size * r;
    const py = Math.sin(a) * size * r;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  });
  ctx.closePath();
  const g = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size);
  g.addColorStop(0, hex(color, 45));
  g.addColorStop(0.6, color);
  g.addColorStop(1, hex(color, -35));
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = hex(color, -55);
  ctx.lineWidth = 0.7;
  ctx.globalAlpha *= 0.3;
  ctx.stroke();
  ctx.restore();
}

function drawMeteoroid(ctx: CanvasRenderingContext2D, m: Meteoroid) {
  const tx = m.x - (m.dx / m.speed) * m.length;
  const ty = m.y - (m.dy / m.speed) * m.length;
  ctx.save();
  const g = ctx.createLinearGradient(tx, ty, m.x, m.y);
  g.addColorStop(0, 'rgba(255,200,100,0)');
  g.addColorStop(0.7, `rgba(255,220,150,${m.opacity * 0.5})`);
  g.addColorStop(1, `rgba(255,255,240,${m.opacity})`);
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(m.x, m.y);
  ctx.strokeStyle = g;
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(255,160,40,0.9)';
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.restore();
}

function drawRocket(ctx: CanvasRenderingContext2D,
  x: number, y: number, size: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.scale(size / 40, size / 40);
  ctx.globalAlpha = 0.8;
  // body
  ctx.beginPath();
  ctx.moveTo(0,-20); ctx.lineTo(-8,0); ctx.lineTo(-6,14); ctx.lineTo(6,14); ctx.lineTo(8,0);
  ctx.closePath(); ctx.fillStyle='#e2e8f0'; ctx.fill();
  // nose
  ctx.beginPath();
  ctx.moveTo(0,-30); ctx.lineTo(-8,-20); ctx.lineTo(8,-20);
  ctx.closePath(); ctx.fillStyle='#f1f5f9'; ctx.fill();
  // fins
  ctx.fillStyle='#94a3b8';
  ctx.beginPath(); ctx.moveTo(-8,6); ctx.lineTo(-16,18); ctx.lineTo(-6,14); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(8,6); ctx.lineTo(16,18); ctx.lineTo(6,14); ctx.closePath(); ctx.fill();
  // flame
  ctx.beginPath();
  ctx.moveTo(-4,14); ctx.lineTo(0, 22 + Math.random()*5); ctx.lineTo(4,14); ctx.closePath();
  const fg = ctx.createLinearGradient(0,14,0,28);
  fg.addColorStop(0,'rgba(255,180,60,0.9)'); fg.addColorStop(1,'rgba(255,80,20,0)');
  ctx.fillStyle=fg; ctx.fill();
  ctx.globalAlpha=1;
  ctx.restore();
}

function drawVirgo(ctx: CanvasRenderingContext2D, W: number, H: number) {
  ctx.save();
  ctx.globalAlpha = 0.38;
  ctx.strokeStyle = 'rgba(180,160,255,0.45)';
  ctx.lineWidth = 0.9;
  for (const [a, b] of VIRGO_LINES) {
    ctx.beginPath();
    ctx.moveTo(VIRGO_STARS[a].x * W, VIRGO_STARS[a].y * H);
    ctx.lineTo(VIRGO_STARS[b].x * W, VIRGO_STARS[b].y * H);
    ctx.stroke();
  }
  for (const s of VIRGO_STARS) {
    const sx = s.x * W, sy = s.y * H;
    const r = s.name === 'Spica' ? 3 : 1.8;
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3);
    g.addColorStop(0, 'rgba(230,220,255,0.95)');
    g.addColorStop(1, 'rgba(180,160,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(sx, sy, r * 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

export default function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const asteroids: Asteroid[] = Array.from({ length: 8 }, (_, i) => makeAsteroid(i));
    const meteoroids: Meteoroid[] = Array.from({ length: 4 }, () =>
      spawnMeteoroid(window.innerWidth, window.innerHeight));
    const rockets: CanvasRocket[] = [makeRocket(0), makeRocket(1)];

    const resize = () => {
      // Use the canvas's actual rendered size so it fills the container exactly
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const FOV = 280;

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      const CX = W / 2, CY = H / 2;

      drawVirgo(ctx, W, H);

      // asteroids
      for (let i = 0; i < asteroids.length; i++) {
        const ast = asteroids[i];
        ast.z -= ast.vz;
        ast.rotation += ast.rotSpeed;

        if (ast.z < 0.3) { asteroids[i] = resetAsteroid(ast, i); continue; }

        const scale = FOV / (FOV + ast.z * 55);
        const sx = CX + ast.x * W * 0.45 * scale;
        const sy = CY + ast.y * H * 0.45 * scale;
        const size = ast.baseSize * scale;

        // smooth fade in when coming from far, fade out when very close
        const alpha = Math.min(1, (ast.z - 0.3) / 0.8) * Math.min(1, (7 - ast.z) / 1.5);
        if (alpha <= 0) continue;
        ctx.globalAlpha = alpha * 0.9;
        drawAsteroid(ctx, sx, sy, size, ast.rotation, ast.shape, ast.color);
        ctx.globalAlpha = 1;
      }

      // meteoroids
      for (let i = 0; i < meteoroids.length; i++) {
        const m = meteoroids[i];
        m.x += m.dx; m.y += m.dy;
        if (m.x < -250 || m.x > W + 250 || m.y < -250 || m.y > H + 250) {
          meteoroids[i] = spawnMeteoroid(W, H);
          continue;
        }
        drawMeteoroid(ctx, m);
      }

      // rockets
      for (const r of rockets) {
        r.angle += r.speed;
        const rx = r.cx * W + Math.cos(r.angle) * r.orbitRx * W;
        const ry = r.cy * H + Math.sin(r.angle) * r.orbitRy * H;
        const travelAngle = Math.atan2(
          Math.sin(r.angle + r.speed) - Math.sin(r.angle),
          Math.cos(r.angle + r.speed) - Math.cos(r.angle)
        ) + (r.speed < 0 ? Math.PI : 0);
        drawRocket(ctx, rx, ry, r.size, travelAngle);
      }

      animId = requestAnimationFrame(tick);
    }

    tick();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
