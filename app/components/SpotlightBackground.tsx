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
    const container = containerRef.current;
    if (!container) return;

    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let animationFrameId: number | null = null;
    let isAnimating = false;

    const centerSpotlight = () => {
      const rect = container.getBoundingClientRect();
      mousePos.current = { x: rect.width / 2, y: rect.height / 2 };
      spotPos.current = { x: rect.width / 2, y: rect.height / 2 };
      container.style.setProperty('--x', `${spotPos.current.x}px`);
      container.style.setProperty('--y', `${spotPos.current.y}px`);
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = null;
      isAnimating = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (
        !desktopQuery.matches ||
        reducedMotionQuery.matches ||
        document.hidden
      ) {
        return;
      }

      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      if (!isAnimating) {
        isAnimating = true;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      if (
        !desktopQuery.matches ||
        reducedMotionQuery.matches ||
        document.hidden
      ) {
        stopAnimation();
        return;
      }

      const deltaX = mousePos.current.x - spotPos.current.x;
      const deltaY = mousePos.current.y - spotPos.current.y;
      const lerpFactor = 0.1;

      spotPos.current.x += deltaX * lerpFactor;
      spotPos.current.y += deltaY * lerpFactor;

      container.style.setProperty('--x', `${spotPos.current.x}px`);
      container.style.setProperty('--y', `${spotPos.current.y}px`);

      if (Math.abs(deltaX) + Math.abs(deltaY) > 0.2) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        container.style.setProperty('--x', `${mousePos.current.x}px`);
        container.style.setProperty('--y', `${mousePos.current.y}px`);
        spotPos.current = { ...mousePos.current };
        animationFrameId = null;
        isAnimating = false;
      }
    };

    const handleModeChange = () => {
      stopAnimation();
      centerSpotlight();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      }
    };

    centerSpotlight();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleModeChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    desktopQuery.addEventListener('change', handleModeChange);
    reducedMotionQuery.addEventListener('change', handleModeChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleModeChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      desktopQuery.removeEventListener('change', handleModeChange);
      reducedMotionQuery.removeEventListener('change', handleModeChange);
      stopAnimation();
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
