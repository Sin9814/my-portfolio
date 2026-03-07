// src/components/BalatroBackground.jsx
import { memo, useEffect, useRef } from 'react';

const BalatroBackground = memo(() => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS gradient');
      return;
    }

    let width, height;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader - Balatro-style liquid noise with green theme
    const fragmentShaderSource = `
      precision highp float;
      
      uniform vec2 resolution;
      uniform float time;
      uniform vec2 mouse;
      
      // Simplex noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 5; i++) {
          value += amplitude * snoise(p * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        return value;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= resolution.x / resolution.y;
        
        // Mouse influence
        vec2 mousePos = mouse * 2.0 - 1.0;
        mousePos.x *= resolution.x / resolution.y;
        float mouseDist = length(p - mousePos);
        float mouseInfluence = smoothstep(1.5, 0.0, mouseDist) * 0.3;
        
        // Animated coordinates
        float t = time * 0.15;
        vec2 q = vec2(
          fbm(p + t * 0.5 + mouseInfluence),
          fbm(p + vec2(1.0) + t * 0.3)
        );
        
        vec2 r = vec2(
          fbm(p + q + vec2(1.7, 9.2) + t * 0.25),
          fbm(p + q + vec2(8.3, 2.8) + t * 0.35)
        );
        
        float f = fbm(p + r * 2.0 + mouseInfluence);
        
        // Green-tinted color palette (matching your theme)
        // Deep forest green -> Emerald -> Bright mint -> Dark void
        vec3 color1 = vec3(0.06, 0.16, 0.11);  // #0f2a1c - Deep forest
        vec3 color2 = vec3(0.10, 0.30, 0.18);  // #1a4d2e - Rich green
        vec3 color3 = vec3(0.29, 0.87, 0.50);  // #4ade80 - Your accent
        vec3 color4 = vec3(0.04, 0.04, 0.04);  // #0a0a0a - Near black
        
        // Mix colors based on noise
        vec3 col = mix(color1, color2, clamp(f * 2.0, 0.0, 1.0));
        col = mix(col, color3, clamp(length(q) * 0.5, 0.0, 0.4));
        col = mix(col, color4, clamp(length(r.x) * 0.3, 0.0, 0.6));
        
        // Add subtle glow near mouse
        col += vec3(0.2, 0.8, 0.4) * mouseInfluence * 0.5;
        
        // Vignette
        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        col *= vignette;
        
        // Contrast boost
        col = pow(col, vec3(0.9));
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Compile shader
    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create geometry (full-screen quad)
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');
    const mouseLocation = gl.getUniformLocation(program, 'mouse');

    let startTime = Date.now();
    let isActive = true;

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / width,
        y: 1.0 - e.clientY / height
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Visibility handling
    const handleVisibility = () => {
      isActive = document.visibilityState === 'visible';
      if (isActive) {
        startTime = Date.now() - (lastTime || 0);
        animate();
      }
    };

    let lastTime = 0;
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      if (!isActive) return;

      const currentTime = (Date.now() - startTime) * 0.001;
      lastTime = currentTime * 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="balatro-bg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
});

BalatroBackground.displayName = 'BalatroBackground';
export default BalatroBackground;