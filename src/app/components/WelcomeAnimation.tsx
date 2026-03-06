"use client"
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface WarpStar {
  x: number; y: number;
  px: number; py: number;
  angle: number; speed: number;
  brightness: number; hue: number;
}

function spawnStar(): WarpStar {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.04;
  return {
    x: Math.cos(angle) * r, y: Math.sin(angle) * r,
    px: Math.cos(angle) * r, py: Math.sin(angle) * r,
    angle, speed: 0.004 + Math.random() * 0.008,
    brightness: 0.5 + Math.random() * 0.5,
    hue: 200 + Math.random() * 40,
  };
}

interface LandParams { y: number; scale: number; }

export default function WelcomeAnimation() {
  const [mounted,    setMounted]    = useState(false);
  const [showText,   setShowText]   = useState(false);
  const [leaving,    setLeaving]    = useState(false);
  const [done,       setDone]       = useState(false);
  const [landParams, setLandParams] = useState<LandParams | null>(null);

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const welcomeH1Ref = useRef<HTMLHeadingElement>(null);
  const starsRef     = useRef<WarpStar[]>(Array.from({ length: 320 }, spawnStar));
  const speedTarget  = useRef(1);
  const speedCur     = useRef(1);

  useEffect(() => {
    setMounted(true);

    const t1 = setTimeout(() => setShowText(true),               1400);
    const t2 = setTimeout(() => { speedTarget.current = 0.12; }, 2000);

    // Measure both elements right before the landing fires
    const t3 = setTimeout(() => {
      const welcomeEl = welcomeH1Ref.current;
      const heroEl    = document.querySelector('[data-hero-val]') as HTMLElement | null;

      if (welcomeEl && heroEl) {
        const wRect = welcomeEl.getBoundingClientRect();
        const hRect = heroEl.getBoundingClientRect();

        const wCY = wRect.top  + wRect.height  / 2;
        const hCY = hRect.top  + hRect.height  / 2;
        const hCX = hRect.left + hRect.width   / 2;
        const wCX = wRect.left + wRect.width   / 2;

        setLandParams({
          y:     hCY - wCY,
          // x offset in case hero h1 isn't perfectly centered
          scale: hRect.height / wRect.height,
        });
        // store x delta for later — fold it into y only; x should be ~0 (both centered)
        void hCX; void wCX;
      }

      setLeaving(true);
    }, 2500);

    const t4 = setTimeout(() => setDone(true), 3600);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Canvas warp loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function tick() {
      if (!ctx || !canvas) return;
      const W = canvas.width, H = canvas.height, CX = W / 2, CY = H / 2;

      speedCur.current += (speedTarget.current - speedCur.current) * 0.04;
      const spd = speedCur.current;

      ctx.fillStyle = `rgba(0,0,8,${0.18 + (1 - spd) * 0.28})`;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < starsRef.current.length; i++) {
        const s = starsRef.current[i];
        s.px = s.x; s.py = s.y;

        const dist  = Math.sqrt(s.x * s.x + s.y * s.y);
        const accel = 1 + dist * 9;
        s.x += Math.cos(s.angle) * s.speed * accel * spd;
        s.y += Math.sin(s.angle) * s.speed * accel * spd;

        if (Math.abs(s.x) > 1.3 || Math.abs(s.y) > 1.3) {
          starsRef.current[i] = spawnStar(); continue;
        }

        const sx = CX + s.x  * W * 0.5, sy = CY + s.y  * H * 0.5;
        const px = CX + s.px * W * 0.5, py = CY + s.py * H * 0.5;
        if (Math.hypot(sx - px, sy - py) < 0.3) continue;

        const alpha = Math.min(1, dist * 3) * s.brightness * Math.min(1, spd + 0.3);
        const grad  = ctx.createLinearGradient(px, py, sx, sy);
        grad.addColorStop(0, `hsla(${s.hue},80%,90%,0)`);
        grad.addColorStop(1, `hsla(${s.hue},80%,95%,${alpha})`);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.5 + dist * 2 * spd;
        ctx.stroke();
      }
      animId = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (done) return null;

  const lp = landParams ?? { y: 0, scale: 0.35 };

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 999 }}>

      {/* Dark background + warp canvas — fades away to reveal hero */}
      <motion.div
        className="absolute inset-0"
        animate={leaving ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[#000008]" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* "Val" text — measured landing onto hero h1 */}
      {showText && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.82, y: 0 }}
          animate={
            leaving
              ? { opacity: 0, scale: lp.scale, y: lp.y }
              : { opacity: 1, scale: 1,        y: 0    }
          }
          transition={
            leaving
              ? { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
              : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className="text-center select-none">
            <h1
              ref={welcomeH1Ref}
              className="text-[5rem] md:text-[9rem] font-bold text-white leading-none tracking-tight"
              style={{
                textShadow:
                  '0 0 40px rgba(120,180,255,0.9), 0 0 100px rgba(80,140,255,0.5), 0 0 200px rgba(60,100,255,0.2)',
              }}
            >
              Val
            </h1>
            <motion.p
              className="text-white/45 text-sm md:text-base mt-3 tracking-[0.4em] uppercase"
              animate={{ opacity: leaving ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              Developer · Photographer
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
