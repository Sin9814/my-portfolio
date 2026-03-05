// src/components/SilkBackground.jsx
import { memo, useEffect, useRef } from 'react';

const SilkBackground = memo(() => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Configuration matching ReactBits
  const config = {
    speed: 5,
    scale: 1,
    color: '#4ade80', // Green to match theme, or use '#7B7481' for gray
    noiseIntensity: 1.5,
    rotation: 0
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;
    
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
    
    // Parse color
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 123, g: 116, b: 129 };
    };
    
    const rgb = hexToRgb(config.color);
    
    // Simplex noise implementation
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const n = Math.floor(Math.random() * (i + 1));
      [p[i], p[n]] = [p[n], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    
    const grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];
    
    const dot = (g, x, y) => g[0] * x + g[1] * y;
    
    const noise = (xin, yin) => {
      let n0, n1, n2;
      const F2 = 0.5 * (Math.sqrt(3) - 1);
      const s = (xin + yin) * F2;
      const i = Math.floor(xin + s);
      const j = Math.floor(yin + s);
      const G2 = (3 - Math.sqrt(3)) / 6;
      const t = (i + j) * G2;
      const X0 = i - t;
      const Y0 = j - t;
      const x0 = xin - X0;
      const y0 = yin - Y0;
      let i1, j1;
      if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
      const x1 = x0 - i1 + G2;
      const y1 = y0 - j1 + G2;
      const x2 = x0 - 1 + 2 * G2;
      const y2 = y0 - 1 + 2 * G2;
      const ii = i & 255;
      const jj = j & 255;
      const gi0 = perm[ii + perm[jj]] % 12;
      const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
      const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
      let t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 < 0) n0 = 0;
      else {
        t0 *= t0;
        n0 = t0 * t0 * dot(grad3[gi0], x0, y0);
      }
      let t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 < 0) n1 = 0;
      else {
        t1 *= t1;
        n1 = t1 * t1 * dot(grad3[gi1], x1, y1);
      }
      let t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 < 0) n2 = 0;
      else {
        t2 *= t2;
        n2 = t2 * t2 * dot(grad3[gi2], x2, y2);
      }
      return 70 * (n0 + n1 + n2);
    };
    
    const animate = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      time += config.speed * 0.001;
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      const scale = config.scale * 0.002;
      const rotationRad = (config.rotation * Math.PI) / 180;
      const cos = Math.cos(rotationRad);
      const sin = Math.sin(rotationRad);
      
      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const rx = x * cos - y * sin;
          const ry = x * sin + y * cos;
          
          const n = noise(rx * scale + time, ry * scale);
          const intensity = (n + 1) * 0.5 * config.noiseIntensity;
          
          const idx = (y * width + x) * 4;
          const alpha = Math.min(255, intensity * 80);
          
          data[idx] = rgb.r;
          data[idx + 1] = rgb.g;
          data[idx + 2] = rgb.b;
          data[idx + 3] = alpha;
          
          // Fill 2x2 block for performance
          if (x + 1 < width) {
            data[idx + 4] = rgb.r;
            data[idx + 5] = rgb.g;
            data[idx + 6] = rgb.b;
            data[idx + 7] = alpha;
          }
          if (y + 1 < height) {
            const idx2 = ((y + 1) * width + x) * 4;
            data[idx2] = rgb.r;
            data[idx2 + 1] = rgb.g;
            data[idx2 + 2] = rgb.b;
            data[idx2 + 3] = alpha;
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [config]);

  return (
    <canvas 
      ref={canvasRef} 
      className="silk-bg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.6
      }}
      aria-hidden="true"
    />
  );
});

SilkBackground.displayName = 'SilkBackground';
export default SilkBackground;