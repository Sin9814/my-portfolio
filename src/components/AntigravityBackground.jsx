// src/components/AntigravityBackground.jsx
import { memo, useEffect, useRef } from 'react';

const AntigravityBackground = memo(() => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const frameCount = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Enhanced particle system - more dramatic antigravity
    const particleCount = 80; // Increased for more density
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1.5,
        alpha: Math.random() * 0.4 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
    
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const animate = () => {
      frameCount.current++;
      
      // Create greenish gradient background
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * 0.8
      );
      gradient.addColorStop(0, 'rgba(10, 20, 15, 1)');
      gradient.addColorStop(0.4, 'rgba(5, 15, 10, 0.95)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Add subtle green vignette
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.3,
        width / 2, height / 2, width * 0.8
      );
      vignette.addColorStop(0, 'rgba(74, 222, 128, 0)');
      vignette.addColorStop(1, 'rgba(74, 222, 128, 0.03)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
      
      const mouse = mouseRef.current;
      
      particlesRef.current.forEach((p, i) => {
        // Pulse effect
        p.pulse += p.pulseSpeed;
        const pulseFactor = 1 + Math.sin(p.pulse) * 0.2;
        
        // Antigravity - strong repulsion from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;
        
        if (dist < maxDist && dist > 0) {
          const force = Math.pow((maxDist - dist) / maxDist, 2) * 2;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }
        
        // Apply velocity with damping
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;
        
        // Gentle floating
        p.x += Math.sin(frameCount.current * 0.01 + i) * 0.2;
        p.y += Math.cos(frameCount.current * 0.01 + i) * 0.2;
        
        // Wrap around edges
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;
        
        // Draw particle with glow
        const glowRadius = p.radius * 3 * pulseFactor;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, `rgba(74, 222, 128, ${p.alpha * 0.8})`);
        glow.addColorStop(0.5, `rgba(74, 222, 128, ${p.alpha * 0.3})`);
        glow.addColorStop(1, 'rgba(74, 222, 128, 0)');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.alpha + 0.2})`;
        ctx.fill();
        
        // Connections - only to nearby particles
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 0.15 * (1 - dist2 / 150);
            ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="antigravity-bg"
      aria-hidden="true"
    />
  );
});

AntigravityBackground.displayName = 'AntigravityBackground';
export default AntigravityBackground;