'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;

export default function HeroPeptideScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const activeFrameRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState('Loading molecular sequence…');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context || !container) {
      return;
    }

    let loadedCount = 0;

    const drawFrame = (index: number) => {
      const image = framesRef.current[index];
      if (!image || !image.complete) {
        return;
      }

      const ratio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const scale = Math.max(width / image.width, height / image.height);
      const x = (width - image.width * scale) / 2;
      const y = (height - image.height * scale) / 2;

      context.clearRect(0, 0, width, height);
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
      activeFrameRef.current = index;
    };

    const queueDraw = (index: number) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        drawFrame(index);
      });
    };

    const handleLoad = () => {
      loadedCount += 1;
      if (loadedCount === 1) {
        drawFrame(0);
        setReady(true);
      }

      if (loadedCount % 30 === 0) {
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadingLabel(`Rendering sequence ${progress}%`);
      }
    };

    for (let index = 0; index < frameCount; index += 1) {
      const frame = new Image();
      const frameIndex = (index + 1).toString().padStart(4, '0');
      frame.src = `/frames/frame_${frameIndex}.jpg`;
      frame.onload = handleLoad;
      framesRef.current[index] = frame;
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.35,
      onUpdate: (self) => {
        const frameIndex = Math.min(frameCount - 1, Math.floor(self.progress * (frameCount - 1)));
        queueDraw(frameIndex);
      },
    });

    gsap.to('.hero-content', {
      opacity: 0,
      y: -40,
      scrollTrigger: {
        trigger: container,
        start: '75% top',
        end: 'bottom top',
        scrub: true,
      },
    });

    const onResize = () => {
      drawFrame(activeFrameRef.current);
    };

    window.addEventListener('resize', onResize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', onResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[var(--bg-0)]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(7,17,26,0.2),rgba(7,17,26,0.75))]" />

      <div className="hero-content relative z-20 section-shell flex h-full flex-col items-center justify-center text-center">
        {!isMobile ? (
          <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
            <span className="glass-card rounded-full px-4 py-2 text-sm text-[var(--text-0)]">Clinical-grade aesthetic</span>
            <span className="glass-card rounded-full px-4 py-2 text-sm text-[var(--text-0)]">240-frame molecule loop</span>
          </div>
        ) : null}

        <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--text-1)]">Research-first peptide supply</p>
        <h1 className="font-display text-balance text-5xl font-semibold leading-[0.9] text-[var(--text-0)] md:text-7xl">
          Premium peptide storefront,
          <br />
          engineered for trust.
        </h1>
        <p className="mt-6 max-w-2xl text-balance text-base text-[var(--text-1)] md:text-lg">
          Explore placeholder SKUs with volume-aware cart logic, subscription cadences, and compliance-centered
          presentation. Built for research workflows, not therapeutic claims.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/catalog"
            className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-0)]"
          >
            Browse Catalog
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-6 py-3 text-sm text-[var(--text-0)]"
          >
            View Quality Framework
          </Link>
        </div>

        <p className="mt-6 text-xs text-[var(--warning)]">Research use only. No clinical use claims.</p>
      </div>

      {!ready ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[var(--bg-0)] text-sm text-[var(--text-1)]">
          {loadingLabel}
        </div>
      ) : null}
    </section>
  );
}
