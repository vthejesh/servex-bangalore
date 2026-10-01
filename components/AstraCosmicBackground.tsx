'use client';

import React, { useEffect, useRef } from 'react';

export const AstraCosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Optimized particle count for butter-smooth 60FPS performance
    const numParticles = 140;
    const colors = ['#f97316', '#f59e0b', '#0ea5e9', '#ec4899', '#ffffff', '#10b981'];

    const particles = Array.from({ length: numParticles }, () => {
      const dist = Math.pow(Math.random(), 1.6) * Math.min(width, height) * 0.45 + 15;
      return {
        dist,
        angle: Math.random() * Math.PI * 2,
        speed: (0.0006 + Math.random() * 0.0008) * (1 / (dist * 0.015 + 1)),
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    let globalRotation = 0;

    const render = () => {
      ctx.fillStyle = '#070a12'; // Deep space background fill
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.4;

      globalRotation += 0.0012;

      // Render glow core
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 200);
      coreGlow.addColorStop(0, 'rgba(249, 115, 22, 0.22)');
      coreGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.1)');
      coreGlow.addColorStop(1, 'rgba(7, 10, 18, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();

      // Render high-performance cosmic particles
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        p.angle += p.speed;

        const spiralAngle = p.angle + globalRotation + p.dist * 0.006;
        const x = centerX + Math.cos(spiralAngle) * p.dist;
        const y = centerY + Math.sin(spiralAngle) * (p.dist * 0.65);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
      style={{ background: '#070a12' }}
    />
  );
};
