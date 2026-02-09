'use client';

import { useEffect, useRef } from 'react';
import styles from './SpotlightBackground.module.css';

export interface ShapeDefinition {
  position: string;       // e.g. "top-[5%] right-[5%]"
  size: string;           // e.g. "w-64 h-64 md:w-96 md:h-96"
  borderRadius: string;   // e.g. "rounded-full" or "rounded-[40%_60%_70%_30%/60%_30%_70%_40%]"
  baseColor: string;      // e.g. "bg-[#1E4D8F]/5"
  spotlightColor: string; // e.g. "bg-[#F58A07]/40"
  animation: string;      // e.g. "animate-float-slow"
  extraClasses?: string;  // e.g. "rotate-45 shadow-lg [animation-delay:1s]"
  desktopOnly?: boolean;  // if true, add "hidden md:block"
}

interface Props {
  shapes: ShapeDefinition[];
  containerClassName?: string;
  children: React.ReactNode;
}

export default function SpotlightBackground({
  shapes,
  containerClassName = '',
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const spotPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = { x: rect.width / 2, y: rect.height / 2 };
      spotPos.current = { x: rect.width / 2, y: rect.height / 2 };
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768 || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    let animationFrameId: number;

    const animate = () => {
      if (window.innerWidth >= 768 && containerRef.current) {
        const lerpFactor = 0.1;

        spotPos.current.x +=
          (mousePos.current.x - spotPos.current.x) * lerpFactor;
        spotPos.current.y +=
          (mousePos.current.y - spotPos.current.y) * lerpFactor;

        containerRef.current.style.setProperty('--x', `${spotPos.current.x}px`);
        containerRef.current.style.setProperty('--y', `${spotPos.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={containerClassName}>
      {/* Background Shapes Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Base Layer */}
        <div className="absolute inset-0 w-full h-full">
          {shapes.map((shape, i) => (
            <div
              key={`base-${i}`}
              className={`absolute ${shape.position} ${shape.size} ${shape.baseColor} ${shape.borderRadius} ${shape.animation} ${shape.extraClasses ?? ''} ${shape.desktopOnly ? 'hidden md:block' : ''}`}
            />
          ))}
        </div>

        {/* Spotlight Layer */}
        <div
          className={`${styles.spotlightMask} absolute inset-0 w-full h-full`}>
          {shapes.map((shape, i) => (
            <div
              key={`spot-${i}`}
              className={`absolute ${shape.position} ${shape.size} ${shape.spotlightColor} ${shape.borderRadius} ${shape.animation} ${shape.extraClasses ?? ''} ${shape.desktopOnly ? 'hidden md:block' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
