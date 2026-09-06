'use client';

import React, { useEffect, useRef } from 'react';

export const AstraCosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle Swirl settings matching OpenAI GPT Astra screenshot
    const numParticles = 350;
    const particles: {
      arm: number;
      dist: number;
      angle: number;
      speed: number;
      size: number;
      alpha: number;
      color: string;
    }[] = [];

    // Vibrant Palette colors matching user request (Orange, Amber, Sky Blue, Pink, White, Gold)
    const colors = [
      '#f97316', // Vibrant Orange
      '#f59e0b', // Warm Amber Gold
      '#0ea5e9', // Sky Blue
      '#ec4899', // Bright Pink
      '#ffffff', // Crisp White
      '#10b981', // Emerald Green
    ];

    for (let i = 0; i < numParticles; i++) {
      const arm = Math.floor(Math.random() * 3); // 3 spiral arms
      const dist = Math.pow(Math.random(), 1.5) * Math.min(width, height) * 0.45 + 10;
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.0005 + Math.random() * 0.001) * (1 / (dist * 0.02 + 1));
      const size = Math.random() * 2.2 + 0.6;
      const alpha = Math.random() * 0.8 + 0.2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({ arm, dist, angle, speed, size, alpha, color });
    }

    let globalRotation = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(7, 10, 18, 0.25)'; // Deep cosmic dark charcoal trailing
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.42;

      globalRotation += 0.0015;

      // Draw glowing central core
      const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 180);
      coreGlow.addColorStop(0, 'rgba(249, 115, 22, 0.25)'); // Orange core
      coreGlow.addColorStop(0.4, 'rgba(14, 165, 233, 0.12)'); // Sky blue halo
      coreGlow.addColorStop(1, 'rgba(7, 10, 18, 0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fill();

      // Render cosmic spiral arm particles
      particles.forEach((p) => {
        p.angle += p.speed;

        // Spiral logarithmic curve offset
        const spiralAngle = p.angle + globalRotation + (p.dist * 0.008);
        const x = centerX + Math.cos(spiralAngle) * p.dist;
        const y = centerY + Math.sin(spiralAngle) * (p.dist * 0.65); // Elliptical tilt

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        // Glowing particle effect
        ctx.shadowBlur = p.size > 1.8 ? 10 : 4;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

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
