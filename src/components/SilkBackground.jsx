// src/components/SilkBackground.jsx
import { memo, useEffect, useRef } from 'react';

const SilkBackground = memo(() => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  
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
    
    // Noise function for silk effect
    const noise = (x, y, t) => {
      const sin = Math.sin;
      const cos = Math.cos;
      return (
        sin(x * 0.01 + t) * 0.5 +
        sin(y * 0.01 + t * 0.5) * 0.3 +
        sin((x + y) * 0.005 + t * 0.3) * 0.2 +
        sin(x * 0.02 - y * 0.01 + t * 0.7) * 0.15
      );
    };
    
    const animate = () => {
      timeRef.current += 0.005;
      const t = timeRef.current;
      
      // Create silk-like gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#0f0f0f');
      gradient.addColorStop(1, '#0a0a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw silk waves
      const waves = 5;
      const amplitude = height * 0.15;
      
      for (let w = 0; w < waves; w++) {
        ctx.beginPath();
        const waveOffset = (w / waves) * height;
        
        for (let x = 0; x <= width; x += 5) {
          const nx = x * 0.003;
          const ny = waveOffset * 0.005;
          const n = noise(x, waveOffset, t + w * 0.5);
          
          const y = waveOffset + n * amplitude + Math.sin(x * 0.01 + t + w) * 30;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Silk-like gradient stroke
        const alpha = 0.03 - (w * 0.005);
        const strokeGradient = ctx.createLinearGradient(0, 0, width, 0);
        strokeGradient.addColorStop(0, `rgba(74, 222, 128, 0)`);
        strokeGradient.addColorStop(0.5, `rgba(74, 222, 128, ${alpha})`);
        strokeGradient.addColorStop(1, `rgba(74, 222, 128, 0)`);
        
        ctx.strokeStyle = strokeGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add flowing fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const fillGradient = ctx.createLinearGradient(0, waveOffset - amplitude, 0, waveOffset + amplitude);
        fillGradient.addColorStop(0, `rgba(74, 222, 128, 0)`);
        fillGradient.addColorStop(0.5, `rgba(74, 222, 128, ${alpha * 0.3})`);
        fillGradient.addColorStop(1, `rgba(74, 222, 128, 0)`);
        ctx.fillStyle = fillGradient;
        ctx.fill();
      }
      
      // Subtle noise overlay
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noiseVal = (Math.random() - 0.5) * 8;
        data[i] = Math.max(0, Math.min(255, data[i] + noiseVal));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noiseVal));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noiseVal));
      }
      ctx.putImageData(imageData, 0, 0);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="silk-bg"
      aria-hidden="true"
    />
  );
});

SilkBackground.displayName = 'SilkBackground';
export default SilkBackground;