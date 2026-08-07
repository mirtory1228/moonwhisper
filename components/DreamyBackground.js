'use client';
// Living galaxy background: a dense starfield + milky-way band that slowly
// rotates around a center point (celestial-rotation feel), with drifting
// nebula color and dramatic shooting stars. Canvas-based for hundreds of
// stars at 60fps. Behind all content, pauses when tab hidden, and honors
// prefers-reduced-motion (renders a static sky, no animation).
import { useEffect, useRef } from 'react';

export default function DreamyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0, cx = 0, cy = 0, maxR = 0;
    let stars = [], shooting = [], rot = 0, last = 0, shootTimer = 0, raf = 0;
    const BAND = -0.5; // milky-way tilt (radians)

    function resize() {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * 0.5; cy = h * 0.42;
      maxR = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) + 60;
      initStars();
    }

    function initStars() {
      const mobile = w < 640;
      const count = mobile ? 140 : Math.min(460, Math.floor((w * h) / 3800));
      stars = [];
      for (let i = 0; i < count; i++) {
        const inBand = Math.random() < 0.44;         // milky-way density
        const r = Math.pow(Math.random(), 0.75) * maxR;
        let ang = Math.random() * Math.PI * 2;
        if (inBand) {
          // pull angle toward the galactic plane so stars cluster in a band
          const target = BAND + (Math.random() < 0.5 ? 0 : Math.PI);
          ang = target + (Math.random() - 0.5) * 0.5;
        }
        const layer = Math.random();                 // depth 0..1 (parallax)
        const rare = Math.random() < 0.05;
        stars.push({
          r, ang,
          size: (mobile ? 0.5 : 0.6) + layer * (mobile ? 1.0 : 1.7) + (rare ? 1.4 : 0),
          base: 0.35 + Math.random() * 0.6,
          tw: 0.5 + Math.random() * 1.9,
          ph: Math.random() * Math.PI * 2,
          spd: 0.55 + layer * 0.9,                    // outer/deeper stars sweep a touch faster
          hue: inBand
            ? (Math.random() < 0.5 ? '#e3e9ff' : '#f3e0a8')
            : (Math.random() < 0.14 ? '#8fe0c8' : '#f4f5fb'),
        });
      }
    }

    function spawnShoot() {
      const fromLeft = Math.random() < 0.5;
      shooting.push({
        x: fromLeft ? -30 : w + 30,
        y: Math.random() * h * 0.5,
        vx: (fromLeft ? 1 : -1) * (4 + Math.random() * 3),
        vy: 2.5 + Math.random() * 3,
        life: 0, max: 55 + Math.random() * 35,
        len: 140 + Math.random() * 160,
      });
    }

    function render(t) {
      ctx.clearRect(0, 0, w, h);

      // milky-way band glow (rotates with the sky)
      ctx.save();
      ctx.translate(cx, cy); ctx.rotate(BAND + rot); ctx.translate(-cx, -cy);
      const bw = maxR * 1.05;
      const g = ctx.createLinearGradient(0, cy - bw, 0, cy + bw);
      g.addColorStop(0.00, 'rgba(90,100,180,0)');
      g.addColorStop(0.40, 'rgba(120,120,210,0.05)');
      g.addColorStop(0.50, 'rgba(205,195,240,0.13)');
      g.addColorStop(0.60, 'rgba(120,120,210,0.05)');
      g.addColorStop(1.00, 'rgba(90,100,180,0)');
      ctx.fillStyle = g;
      ctx.fillRect(-w, cy - bw, w * 3, bw * 2);
      ctx.restore();

      // stars — rigid-ish rotation around (cx,cy)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const a = s.ang + rot * s.spd;
        const x = cx + s.r * Math.cos(a);
        const y = cy + s.r * Math.sin(a);
        const tw = reduce ? 0.85 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.ph);
        const alpha = s.base * tw;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.hue;
        ctx.beginPath(); ctx.arc(x, y, s.size, 0, 6.283); ctx.fill();
        if (s.size > 1.5) { // soft glow around brighter stars
          ctx.globalAlpha = alpha * 0.22;
          ctx.beginPath(); ctx.arc(x, y, s.size * 2.6, 0, 6.283); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // shooting stars
      if (!reduce) {
        for (let i = shooting.length - 1; i >= 0; i--) {
          const sh = shooting[i];
          sh.x += sh.vx; sh.y += sh.vy; sh.life += 1;
          const p = sh.life / sh.max;
          const fade = p < 0.12 ? p / 0.12 : (1 - p);
          const m = sh.len / Math.hypot(sh.vx, sh.vy);
          const tx = sh.x - sh.vx * m, ty = sh.y - sh.vy * m;
          const lg = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
          lg.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
          lg.addColorStop(0.4, `rgba(243,224,168,${0.4 * fade})`);
          lg.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = lg; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
          ctx.globalAlpha = fade; ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(sh.x, sh.y, 2, 0, 6.283); ctx.fill();
          ctx.globalAlpha = 1;
          if (sh.life >= sh.max) shooting.splice(i, 1);
        }
      }
    }

    function loop(t) {
      const dt = last ? Math.min((t - last) / 16.67, 3) : 1; last = t;
      rot += 0.00046 * dt; // celestial rotation speed (~full turn in ~4 min)
      shootTimer += dt;
      if (shootTimer > 120 + Math.random() * 160 && shooting.length < 2) { spawnShoot(); shootTimer = 0; }
      render(t);
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduce) { render(0); }
    else { raf = requestAnimationFrame(loop); }

    const onVis = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!reduce && !raf) { last = 0; raf = requestAnimationFrame(loop); }
    };
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="dreamy-bg" aria-hidden="true">
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />
      <canvas ref={canvasRef} className="starfield-canvas" />
      <div className="grain" />
    </div>
  );
}
