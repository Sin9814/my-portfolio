// src/components/AntigravityBackground.jsx
import { memo, useEffect, useRef, useCallback } from 'react';

const AntigravityBackground = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  
  // Configuration matching ReactBits
  const config = {
    count: 300,
    magnetRadius: 6,
    ringRadius: 7,
    waveSpeed: 0.4,
    waveAmplitude: 1,
    particleSize: 1.5,
    lerpSpeed: 0.05,
    color: '#4ade80', // Changed to green to match your theme
    particleVariance: 1,
    rotationSpeed: 0,
    depthFactor: 1,
    pulseSpeed: 3,
    particleShape: 'capsule',
    fieldStrength: 10,
    autoAnimate: true
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
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
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
    
    // Initialize particles
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
        size: config.particleSize * variance
      });
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    let time = 0;
    
    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      time += config.waveSpeed * 0.016;
      const mouse = mouseRef.current;
      
      particlesRef.current.forEach((p, i) => {
        // Wave motion
        const waveX = Math.sin(time + p.phase) * config.waveAmplitude * 20;
        const waveY = Math.cos(time + p.phase * 0.7) * config.waveAmplitude * 20;
        
        // Rotation
        const rotAngle = p.angle + time * config.rotationSpeed;
        const ringX = Math.cos(rotAngle) * config.ringRadius * 10;
        const ringY = Math.sin(rotAngle) * config.ringRadius * 10;
        
        // Target position with wave and ring
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
        
        // Pulse effect
        const pulse = 1 + Math.sin(time * config.pulseSpeed + p.phase) * 0.2;
        const finalSize = p.size * pulse;
        
        // Draw capsule shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(rotAngle);
        
        // Glow
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, finalSize * 3);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        if (config.particleShape === 'capsule') {
          ctx.roundRect(-finalSize * 0.5, -finalSize * 2, finalSize, finalSize * 4, finalSize * 0.5);
        } else {
          ctx.arc(0, 0, finalSize, 0, Math.PI * 2);
        }
        ctx.fill();
        
        // Core
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
        ctx.beginPath();
        if (config.particleShape === 'capsule') {
          ctx.roundRect(-finalSize * 0.25, -finalSize, finalSize * 0.5, finalSize * 2, finalSize * 0.25);
        } else {
          ctx.arc(0, 0, finalSize * 0.5, 0, Math.PI * 2);
        }
        ctx.fill();
        
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (config.autoAnimate) {
      animate();
    }
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
});

AntigravityBackground.displayName = 'AntigravityBackground';
export default AntigravityBackground;