import React, { useEffect, useRef } from 'react';

export const StarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    let shootingStars: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 1500);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random(),
          speed: (Math.random() * 0.01) + 0.005
        });
      }
    };

    const createShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.01) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          length: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 5,
          opacity: 1
        });
      }
    };

    const draw = () => {
      // Clear with slight trail effect
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Twinkling Stars
      stars.forEach(star => {
        ctx.beginPath();
        const glowSize = star.size * 1.5;
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Slow movement
        star.y -= 0.05;
        if (star.y < 0) star.y = canvas.height;

        // Twinkle
        star.opacity += star.speed;
        if (star.opacity > 0.8 || star.opacity < 0.1) {
          star.speed = -star.speed;
        }
      });

      // Draw Shooting Stars
      createShootingStar();
      shootingStars.forEach((ss, index) => {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.length, ss.y + ss.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.length, ss.y + ss.length);
        ctx.stroke();

        // Move shooting star
        ss.x -= ss.speed;
        ss.y += ss.speed;
        ss.opacity -= 0.01;

        if (ss.opacity <= 0 || ss.x < -100 || ss.y > canvas.height + 100) {
          shootingStars.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};
