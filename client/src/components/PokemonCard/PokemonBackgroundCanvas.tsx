import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  alpha: number;
};

type PokemonBackgroundCanvasProps = {
  accentColor: string;
};

export function PokemonBackgroundCanvas({ accentColor }: PokemonBackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const accentRef = useRef(accentColor);

  useEffect(() => {
    accentRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: Particle[] = [];
    let frameId = 0;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const spawnParticle = () => {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 6,
        radius: Math.random() * 2 + 0.6,
        speed: Math.random() * 0.55 + 0.2,
        alpha: Math.random() * 0.45 + 0.2,
      });
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.y -= particle.speed;
        particle.alpha -= 0.001;

        if (particle.y < -10 || particle.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = withAlpha(accentRef.current, particle.alpha);
        context.fill();
      }

      if (Math.random() < 0.28) {
        spawnParticle();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />;
}

function withAlpha(hexColor: string, alpha: number) {
  const hex = hexColor.replace("#", "").slice(0, 6);

  if (hex.length !== 6) {
    return `rgba(255, 59, 59, ${alpha})`;
  }

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
