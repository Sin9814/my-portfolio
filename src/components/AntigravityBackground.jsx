// src/components/AntigravityBackground.jsx
import { memo, useEffect, useRef, useCallback } from 'react';

const AntigravityBackground = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  // Configuration matching ReactBits - optimized for content sections
  const config = {
    count: 300,
    magnetRadius: 10,
    ringRadius: 10,
    waveSpeed: 0.4,
    waveAmplitude: 1,
    particleSize: 2,
    lerpSpeed: 0.1,
    color: '#4ade80', // Your emerald accent
    autoAnimate: true,
    particleVariance: 1,
    rotationSpeed: 0,
    depthFactor: 1,
    pulseSpeed: 3,
    particleShape: 'capsule',
    fieldStrength: 10
  };

  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 74, g: 222, b: 128 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    const rgb = hexToRgb(config.color);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles with random distribution
    particlesRef.current = [];
    for (let i = 0; i < config.count; i++) {
      const angle = (Math.PI * 2 * i) / config.count;
      const variance = 1 + (Math.random() - 0.5) * config.particleVariance;
      
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: 0,
        vy: 0,
        angle: angle,
        variance: variance,
        phase: Math.random() * Math.PI * 2,
        size: config.particleSize * variance,
        rotationOffset: Math.random() * Math.PI * 2
      });
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    let time = 0;
    let isActive = true;
    let rafId = null;

    const handleVisibility = () => {
      isActive = document.visibilityState === 'visible';
      if (isActive) animate();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      if (!isActive) return;
      rafId = requestAnimationFrame(animate);

      // Clear with pure black (content section background)
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      time += config.waveSpeed * 0.016;
      const mouse = mouseRef.current;

      particlesRef.current.forEach((p, i) => {
        // Wave motion - organic floating
        const waveX = Math.sin(time + p.phase) * config.waveAmplitude * 20;
        const waveY = Math.cos(time + p.phase * 0.7) * config.waveAmplitude * 20;

        // Ring rotation effect
        const rotAngle = p.angle + time * config.rotationSpeed + p.rotationOffset;
        const ringX = Math.cos(rotAngle) * config.ringRadius * 10;
        const ringY = Math.sin(rotAngle) * config.ringRadius * 10;

        // Target position
        let targetX = p.baseX + waveX + ringX;
        let targetY = p.baseY + waveY + ringY;

        // Mouse magnet effect (antigravity - repulsion)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const magnetDist = config.magnetRadius * 50;

        if (dist < magnetDist && dist > 0) {
          const force = (1 - dist / magnetDist) * config.fieldStrength * 5;
          const angle = Math.atan2(dy, dx);
          targetX += Math.cos(angle) * force;
          targetY += Math.sin(angle) * force;
        }

        // Smooth lerp to target
        p.x += (targetX - p.x) * config.lerpSpeed;
        p.y += (targetY - p.y) * config.lerpSpeed;

        // Pulse effect on size
        const pulse = 1 + Math.sin(time * config.pulseSpeed + p.phase) * 0.2;
        const finalSize = p.size * pulse;

        // Draw capsule shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(rotAngle);

        // Glow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, finalSize * 3);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        if (config.particleShape === 'capsule') {
          // Draw capsule using roundRect if available, fallback to custom
          if (ctx.roundRect) {
            ctx.roundRect(-finalSize * 0.5, -finalSize * 2, finalSize, finalSize * 4, finalSize * 0.5);
          } else {
            // Fallback: draw rounded capsule manually
            const w = finalSize;
            const h = finalSize * 4;
            const r = finalSize * 0.5;
            ctx.moveTo(-w/2 + r, -h/2);
            ctx.lineTo(w/2 - r, -h/2);
            ctx.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
            ctx.lineTo(w/2, h/2 - r);
            ctx.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
            ctx.lineTo(-w/2 + r, h/2);
            ctx.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
            ctx.lineTo(-w/2, -h/2 + r);
            ctx.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
          }
        } else {
          ctx.arc(0, 0, finalSize, 0, Math.PI * 2);
        }
        ctx.fill();

        // Core bright center
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`;
        ctx.beginPath();
        if (config.particleShape === 'capsule') {
          if (ctx.roundRect) {
            ctx.roundRect(-finalSize * 0.25, -finalSize, finalSize * 0.5, finalSize * 2, finalSize * 0.25);
          } else {
            const w = finalSize * 0.5;
            const h = finalSize * 2;
            const r = finalSize * 0.25;
            ctx.moveTo(-w/2 + r, -h/2);
            ctx.lineTo(w/2 - r, -h/2);
            ctx.quadraticCurveTo(w/2, -h/2, w/2, -h/2 + r);
            ctx.lineTo(w/2, h/2 - r);
            ctx.quadraticCurveTo(w/2, h/2, w/2 - r, h/2);
            ctx.lineTo(-w/2 + r, h/2);
            ctx.quadraticCurveTo(-w/2, h/2, -w/2, h/2 - r);
            ctx.lineTo(-w/2, -h/2 + r);
            ctx.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
          }
        } else {
          ctx.arc(0, 0, finalSize * 0.5, 0, Math.PI * 2);
        }
        ctx.fill();

        ctx.restore();
      });
    };

    if (config.autoAnimate) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [config, hexToRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="antigravity-bg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto', // Enable mouse interaction
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
});

AntigravityBackground.displayName = 'AntigravityBackground';
export default AntigravityBackground;