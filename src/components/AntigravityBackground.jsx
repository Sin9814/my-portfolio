// src/components/AntigravityBackground.jsx
import { memo, useEffect, useRef, useCallback } from 'react';

const AntigravityBackground = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // Start off-screen
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const frameSkipRef = useRef(0);

  // REDUCED: Particle count from 300 to 80 for performance
  const config = {
    count: 80,
    magnetRadius: 8,
    ringRadius: 6,
    waveSpeed: 0.2, // REDUCED: from 0.4
    waveAmplitude: 0.8, // REDUCED: from 1
    particleSize: 1.5, // REDUCED: from 2
    lerpSpeed: 0.08, // SMOOTHER: slightly reduced
    color: '#4ade80',
    autoAnimate: true,
    particleVariance: 0.8, // REDUCED variance
    rotationSpeed: 0.05, // REDUCED: from 0
    depthFactor: 1,
    pulseSpeed: 2, // REDUCED: from 3
    particleShape: 'circle', // CHANGED: simpler shape than capsule
    fieldStrength: 8 // REDUCED: from 10
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

    const ctx = canvas.getContext('2d', { alpha: false }); // OPTIMIZED: no alpha channel
    let width, height;
    const rgb = hexToRgb(config.color);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // CAP: max 1.5x

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
    window.addEventListener('resize', resize, { passive: true });

    // Initialize particles - simpler distribution
    particlesRef.current = [];
    for (let i = 0; i < config.count; i++) {
      const angle = (Math.PI * 2 * i) / config.count;
      
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        vx: 0,
        vy: 0,
        angle: angle,
        phase: Math.random() * Math.PI * 2,
        size: config.particleSize * (0.8 + Math.random() * 0.4),
        rotationOffset: Math.random() * Math.PI * 2
      });
    }

    // THROTTLED: Mouse tracking - update less frequently
    let mouseTimeout;
    const handleMouseMove = (e) => {
      if (mouseTimeout) return;
      mouseTimeout = setTimeout(() => {
        mouseTimeout = null;
      }, 50); // 50ms throttle
      
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
    let lastFrameTime = 0;
    const targetFPS = 30; // CAP: 30fps instead of 60
    const frameInterval = 1000 / targetFPS;

    const handleVisibility = () => {
      isActive = document.visibilityState === 'visible';
      if (!isActive && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (isActive && !rafId) {
        animate(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = (currentTime) => {
      if (!isActive) return;
      
      rafId = requestAnimationFrame(animate);

      // FRAME SKIP: Only render at target FPS
      const delta = currentTime - lastFrameTime;
      if (delta < frameInterval) return;
      lastFrameTime = currentTime - (delta % frameInterval);

      // Clear with pure black
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      time += config.waveSpeed * 0.016;
      const mouse = mouseRef.current;

      // BATCH DRAWING: Set styles once outside loop
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;

      particlesRef.current.forEach((p) => {
        // SIMPLIFIED: Wave motion
        const waveX = Math.sin(time + p.phase) * config.waveAmplitude * 15;
        const waveY = Math.cos(time + p.phase * 0.7) * config.waveAmplitude * 15;

        // SIMPLIFIED: Ring rotation
        const rotAngle = p.angle + time * config.rotationSpeed + p.rotationOffset;
        const ringX = Math.cos(rotAngle) * config.ringRadius * 8;
        const ringY = Math.sin(rotAngle) * config.ringRadius * 8;

        // Target position
        let targetX = p.baseX + waveX + ringX;
        let targetY = p.baseY + waveY + ringY;

        // OPTIMIZED: Mouse repulsion - only calculate if mouse moved recently
        if (mouse.x > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy; // Use squared distance (faster)
          const magnetDistSq = (config.magnetRadius * 40) ** 2;

          if (distSq < magnetDistSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / Math.sqrt(magnetDistSq)) * config.fieldStrength * 3;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * force;
            targetY += Math.sin(angle) * force;
          }
        }

        // Smooth lerp
        p.x += (targetX - p.x) * config.lerpSpeed;
        p.y += (targetY - p.y) * config.lerpSpeed;

        // SIMPLIFIED: Pulse
        const pulse = 1 + Math.sin(time * config.pulseSpeed + p.phase) * 0.15;
        const finalSize = p.size * pulse;

        // FAST DRAWING: Simple circle instead of complex capsule
        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    if (config.autoAnimate) {
      animate(performance.now());
    }

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (mouseTimeout) clearTimeout(mouseTimeout);
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
        pointerEvents: 'none', // CHANGED: disable mouse interaction for performance
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
});

AntigravityBackground.displayName = 'AntigravityBackground';
export default AntigravityBackground;