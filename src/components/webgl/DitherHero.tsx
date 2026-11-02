'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { onIntroDone } from '@/lib/motion';

// Raw WebGL (no three.js): a single full-screen triangle is enough for this shader.
const vertex = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Organic raymarched sphere + ordered dithering (Bayer 8x8).
// The pointer acts as a magnifier: the dither gets finer around the cursor.
const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uScroll;
  uniform float uPixel;
  uniform float uIntro;
  uniform float uCenter;
  uniform vec3 uFocus;
  uniform vec3 uInk;
  uniform vec3 uPaper;

  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  float bayer2(vec2 a){a=floor(a);return fract(a.x/2.0+a.y*a.y*0.75);}
  float bayer4(vec2 a){return bayer2(0.5*a)*0.25+bayer2(a);}
  float bayer8(vec2 a){return bayer4(0.5*a)*0.25+bayer2(a);}

  mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}

  float map(vec3 p){
    p.xz*=rot(uTime*0.12+uMouse.x*0.9);
    p.yz*=rot(uMouse.y*0.6-0.2);
    float n=snoise(p*1.25+vec3(0.0,0.0,uTime*0.18));
    n+=0.5*snoise(p*2.6-vec3(uTime*0.1));
    float radius=mix(0.08,0.62,uIntro)*(1.0-uScroll*0.3);
    return length(p)-radius-0.11*n*(0.6+uHover*0.7);
  }

  vec3 normalAt(vec3 p){
    const vec2 k=vec2(1.0,-1.0);
    const float h=0.0015;
    return normalize(k.xyy*map(p+k.xyy*h)+k.yyx*map(p+k.yyx*h)+k.yxy*map(p+k.yxy*h)+k.xxx*map(p+k.xxx*h));
  }

  void main(){
    vec2 frag=gl_FragCoord.xy;
    vec2 mousePx=(uMouse*0.5+0.5)*uRes;
    float dm=length(frag-mousePx)/uRes.y;
    float px=floor(uPixel*mix(0.34,1.0,smoothstep(0.04,0.22,dm/(0.4+uHover*0.6))));
    px=max(px,1.0);
    vec2 cell=floor(frag/px);
    vec2 c=(cell+0.5)*px;
    vec2 uv=(c-0.5*uRes)/min(uRes.x,uRes.y);

    float aspect=uRes.x/uRes.y;
    bool portrait=aspect<1.2;
    if(portrait&&uFocus.z>0.0&&uCenter<0.5){
      uv=(uv-uFocus.xy)*uFocus.z;
    }else if(portrait){
      uv.y-=0.2*(uRes.y/uRes.x)*(1.0-uCenter);
      uv*=mix(1.3,1.0,uCenter);
    }else{
      uv.x-=(0.5*aspect-0.62)*(1.0-uCenter);
      uv.y-=0.1*(1.0-uCenter);
    }
    uv.y+=uScroll*0.45;

    vec3 ro=vec3(0.0,0.0,3.1);
    vec3 rd=normalize(vec3(uv,-1.75));
    float t=0.0;
    float hit=0.0;
    for(int i=0;i<44;i++){
      vec3 p=ro+rd*t;
      float d=map(p);
      if(d<0.002){hit=1.0;break;}
      t+=d*0.9;
      if(t>6.0)break;
    }

    float lum;
    if(hit>0.5){
      vec3 p=ro+rd*t;
      vec3 n=normalAt(p);
      vec3 l=normalize(vec3(uMouse.x*1.4-0.6,uMouse.y*1.2+0.7,0.9));
      float diff=max(dot(n,l),0.0);
      float rim=pow(1.0-max(dot(n,-rd),0.0),3.0);
      float bands=0.08*sin(dot(p,vec3(9.0,7.0,5.0))+uTime*0.6);
      lum=0.03+diff*0.8+rim*0.3+bands;
    } else {
      float r=length(uv);
      lum=max(0.0,0.14*exp(-r*2.2)-0.06);
      if(uFocus.z>0.0) lum*=0.35;
      float star=step(0.997,fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453));
      lum+=star*0.6*(0.5+0.5*sin(uTime*2.0+cell.x));
    }
    lum*=(1.0-uScroll*0.55)*(portrait&&uCenter<0.5?0.85:1.0);

    float threshold=bayer8(cell);
    float on=step(threshold,clamp(lum,0.0,1.0)*0.98);
    gl_FragColor=vec4(mix(uInk,uPaper,on),1.0);
  }
`;

type Uniforms = {
  uTime: number;
  uRes: [number, number];
  uMouse: [number, number];
  uHover: number;
  uScroll: number;
  uPixel: number;
  uIntro: number;
  uCenter: number;
  uFocus: [number, number, number];
};

const INK: [number, number, number] = [5 / 255, 5 / 255, 5 / 255];
const PAPER: [number, number, number] = [242 / 255, 242 / 255, 238 / 255];

const parseHexColor = (value: string): [number, number, number] | null => {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return null;

  const raw =
    match[1].length === 3
      ? match[1]
          .split('')
          .map((character) => character + character)
          .join('')
      : match[1];
  const parsed = Number.parseInt(raw, 16);

  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
};

const readPalette = () => {
  const styles = getComputedStyle(document.documentElement);
  return {
    ink: parseHexColor(styles.getPropertyValue('--color-ink')) ?? INK,
    paper: parseHexColor(styles.getPropertyValue('--color-paper')) ?? PAPER,
  };
};

/**
 * Compiles the program without reading its status: reading COMPILE/LINK_STATUS
 * blocks the main thread until compilation finishes (hundreds of ms).
 */
const compileProgram = (gl: WebGLRenderingContext) => {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };

  const vertexShader = compile(gl.VERTEX_SHADER, vertex);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!vertexShader || !fragmentShader || !program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
};

/**
 * Hero WebGL background: an interactive, dithered organic sphere.
 */
const DitherHero: React.FC<{
  className?: string;
  intro?: boolean;
  centered?: boolean;
  scrollLinked?: boolean;
}> = ({ className = '', intro = true, centered = false, scrollLinked = true }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [fallback, setFallback] = useState(false);
  const introRef = useRef(intro);

  useEffect(() => {
    introRef.current = intro;
  }, [intro]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', {
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });

    if (!gl) {
      const timer = window.setTimeout(() => setFallback(true), 0);
      return () => window.clearTimeout(timer);
    }

    /** Starts rendering once the program is ready; returns the cleanup function. */
    const run = (program: WebGLProgram): (() => void) => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const lowRes = isMobile || window.matchMedia('(hover: none)').matches;
      const CELL = 4;
      const dpr = lowRes ? 1 / CELL : Math.min(window.devicePixelRatio || 1, 1.75);

      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      if (lowRes) canvas.style.imageRendering = 'pixelated';
      wrap.appendChild(canvas);

      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

      const location = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);

      const uniform = (name: string) => gl.getUniformLocation(program, name);
      const uniforms = {
        uTime: uniform('uTime'),
        uRes: uniform('uRes'),
        uMouse: uniform('uMouse'),
        uHover: uniform('uHover'),
        uScroll: uniform('uScroll'),
        uPixel: uniform('uPixel'),
        uIntro: uniform('uIntro'),
        uCenter: uniform('uCenter'),
        uFocus: uniform('uFocus'),
      };

      const inkLocation = uniform('uInk');
      const paperLocation = uniform('uPaper');
      const palette = readPalette();
      gl.uniform3fv(inkLocation, palette.ink);
      gl.uniform3fv(paperLocation, palette.paper);

      const values: Uniforms = {
        uTime: 0,
        uRes: [1, 1],
        uMouse: [0.2, 0.1],
        uHover: 0,
        uScroll: 0,
        uPixel: lowRes ? 1 : 4 * dpr,
        uIntro: 0,
        uCenter: centered ? 1 : 0,
        uFocus: [0, 0, 0],
      };

      const draw = () => {
        gl.uniform1f(uniforms.uTime, values.uTime);
        gl.uniform2fv(uniforms.uRes, values.uRes);
        gl.uniform2fv(uniforms.uMouse, values.uMouse);
        gl.uniform1f(uniforms.uHover, values.uHover);
        gl.uniform1f(uniforms.uScroll, values.uScroll);
        gl.uniform1f(uniforms.uPixel, values.uPixel);
        gl.uniform1f(uniforms.uIntro, values.uIntro);
        gl.uniform1f(uniforms.uCenter, values.uCenter);
        gl.uniform3fv(uniforms.uFocus, values.uFocus);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const resize = () => {
        const { width, height } = wrap.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
        values.uRes = [canvas.width, canvas.height];

        values.uFocus = [0, 0, 0];
        const marker = wrap.parentElement?.querySelector<HTMLElement>('[data-sphere-bottom]');

        if (!centered && marker && width / height < 1.2) {
          const bandTop = 16;
          const band =
            marker.getBoundingClientRect().top - wrap.getBoundingClientRect().top - 12 - bandTop;

          if (band > 90) {
            const minimum = Math.min(width, height);
            const visible = Math.min(band * 0.4, width * 0.3);
            values.uFocus = [
              0,
              (0.5 * height - (bandTop + band / 2)) / minimum,
              0.32 / (visible / minimum),
            ];
          } else {
            values.uFocus = [0, 10, 1];
          }
        }
      };

      resize();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(wrap);
      void document.fonts?.ready.then(resize);

      let remeasure = 0;
      const offIntro = onIntroDone(() => {
        remeasure = window.setTimeout(resize, 1600);
      });

      const target: [number, number] = [0.2, 0.1];
      let hoverTarget = 0;

      const onMove = (event: PointerEvent) => {
        const rect = wrap.getBoundingClientRect();
        target[0] = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        target[1] = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        hoverTarget = 1;
      };

      const onLeave = () => {
        hoverTarget = 0;
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);

      let visible = true;
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      intersectionObserver.observe(wrap);

      const scrollRatio = () =>
        scrollLinked ? Math.min(1, Math.max(0, window.scrollY / (wrap.offsetHeight || 1))) : 0;

      const applyPalette = () => {
        const next = readPalette();
        gl.uniform3fv(inkLocation, next.ink);
        gl.uniform3fv(paperLocation, next.paper);
      };

      window.addEventListener('color-mode-change', applyPalette);

      const cleanup = () => {
        offIntro();
        window.clearTimeout(remeasure);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('color-mode-change', applyPalette);
        document.removeEventListener('pointerleave', onLeave);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        canvas.remove();
      };

      if (prefersReducedMotion) {
        values.uIntro = 1;
        values.uTime = 4;
        draw();

        const onScroll = () => {
          values.uScroll = scrollRatio();
          draw();
        };
        const onPaletteChange = () => {
          applyPalette();
          draw();
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('color-mode-change', onPaletteChange);

        return () => {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('color-mode-change', onPaletteChange);
          cleanup();
        };
      }

      let frame = 0;
      const start = performance.now();
      let last = 0;

      const render = (now: number) => {
        frame = requestAnimationFrame(render);
        if (!visible) return;
        if (lowRes && now - last < 32) return;
        last = now;

        values.uTime = (now - start) / 1000;
        values.uMouse = [
          values.uMouse[0] + (target[0] - values.uMouse[0]) * 0.06,
          values.uMouse[1] + (target[1] - values.uMouse[1]) * 0.06,
        ];
        values.uHover += (hoverTarget - values.uHover) * 0.04;
        values.uIntro += ((introRef.current ? 1 : 0) - values.uIntro) * 0.035;
        values.uScroll = scrollRatio();
        draw();
      };

      frame = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(frame);
        cleanup();
      };
    };

    let disposed = false;
    let stop: (() => void) | undefined;
    let poll = 0;
    const parallel = gl.getExtension('KHR_parallel_shader_compile');

    const boot = () => {
      if (disposed) return;

      const program = compileProgram(gl);
      if (!program) {
        setFallback(true);
        return;
      }

      const ready = () => {
        if (disposed) return;

        if (parallel && !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) {
          poll = requestAnimationFrame(ready);
          return;
        }

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          setFallback(true);
          return;
        }

        stop = run(program);
      };

      ready();
    };

    const hasIdle = typeof window.requestIdleCallback === 'function';
    let booted = false;

    const bootOnce = () => {
      if (booted || disposed) return;
      booted = true;

      if (hasIdle) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      window.clearTimeout(fallbackHandle);

      boot();
    };

    const idleHandle = hasIdle
      ? window.requestIdleCallback(bootOnce, { timeout: 1500 })
      : window.setTimeout(bootOnce, 300);
    // Background tabs can starve requestIdleCallback; boot anyway after a beat.
    const fallbackHandle = window.setTimeout(bootOnce, 1200);

    return () => {
      disposed = true;
      if (hasIdle) window.cancelIdleCallback(idleHandle);
      else window.clearTimeout(idleHandle);
      window.clearTimeout(fallbackHandle);
      cancelAnimationFrame(poll);
      if (stop) stop();
      else gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [prefersReducedMotion, centered, scrollLinked]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      {fallback && (
        <Image
          src="/assets/art/globe-halftone.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-70"
        />
      )}
    </div>
  );
};

export default DitherHero;
