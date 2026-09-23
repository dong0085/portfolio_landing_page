'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SpotlightBackground.module.css';

export interface ShapeDefinition {
  position: string;       // e.g. "top-[5%] right-[5%]"
  size: string;           // e.g. "w-64 h-64 md:w-96 md:h-96"
  borderRadius: string;   // e.g. "rounded-full" or "rounded-[40%_60%_70%_30%/60%_30%_70%_40%]"
  baseColor: string;      // e.g. "bg-[#1E4D8F]/5"
  spotlightColor: string; // e.g. "bg-[#F58A07]/40"
  extraClasses?: string;  // e.g. "rotate-45 shadow-lg"
  desktopOnly?: boolean;  // if true, add "hidden md:block"
}

interface Props {
  shapes: ShapeDefinition[];
  containerClassName?: string;
  children: React.ReactNode;
}

interface Body {
  elements: HTMLDivElement[];
  reveal: HTMLDivElement;
  active: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  directionX: number;
  directionY: number;
  cruiseSpeed: number;
  cruiseSpin: number;
  lastImpact: number;
  dragging: boolean;
  setX: (value: number) => void;
  setY: (value: number) => void;
  setRotation: (value: number) => void;
}

interface Grab {
  body: Body;
  pointerId: number;
  offsetX: number;
  offsetY: number;
  samples: { t: number; x: number; y: number }[];
}

const RESTITUTION = 0.82;
const DAMPING = 0.9;
const SPIN_DAMPING = 1.2;
const MAX_SPIN = 240;
const MAX_SPEED = 2600;
const IMPACT_MIN_SPEED = 15;
const IMPACT_COOLDOWN = 0.18;
const THROW_SAMPLE_MS = 100;
const NO_GRAB_SELECTOR =
  'a, button, input, textarea, select, label, summary, img, svg, p, h1, h2, h3, h4, h5, h6, li, [role="button"], [data-shape-drag="off"]';

const { random, clamp } = gsap.utils;

export default function SpotlightBackground({
  shapes,
  containerClassName = '',
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const baseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const layer = layerRef.current;
    if (!container || !layer) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const bodies: Body[] = [];
      shapes.forEach((_, i) => {
        const angle = random(0, Math.PI * 2);
        const cruiseSpeed = random(35, 70);
        const base = baseRefs.current[i];
        const spot = spotRefs.current[i];
        const reveal = revealRefs.current[i];
        if (!base || !spot || !reveal) return;
        const elements = [base, spot];
        bodies.push({
          elements,
          reveal,
          active: false,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          vx: Math.cos(angle) * cruiseSpeed,
          vy: Math.sin(angle) * cruiseSpeed,
          rotation: 0,
          spin: 0,
          directionX: Math.cos(angle),
          directionY: Math.sin(angle),
          cruiseSpeed,
          cruiseSpin: random(-12, 12),
          lastImpact: 0,
          dragging: false,
          setX: gsap.quickSetter(elements, 'x', 'px') as (v: number) => void,
          setY: gsap.quickSetter(elements, 'y', 'px') as (v: number) => void,
          setRotation: gsap.quickSetter(elements, 'rotation', 'deg') as (
            v: number,
          ) => void,
        });
      });

      let boundsWidth = layer.clientWidth;
      let boundsHeight = layer.clientHeight;
      let grab: Grab | null = null;

      const limits = (b: Body) => {
        let minX = -b.left;
        let maxX = boundsWidth - b.width - b.left;
        let minY = -b.top;
        let maxY = boundsHeight - b.height - b.top;
        if (maxX < minX) minX = maxX = (minX + maxX) / 2;
        if (maxY < minY) minY = maxY = (minY + maxY) / 2;
        return { minX, maxX, minY, maxY };
      };

      const render = (b: Body) => {
        b.setX(b.x);
        b.setY(b.y);
        b.setRotation(b.rotation);
      };

      const measure = () => {
        boundsWidth = layer.clientWidth;
        boundsHeight = layer.clientHeight;
        for (const b of bodies) {
          const [base] = b.elements;
          b.width = base.offsetWidth;
          b.height = base.offsetHeight;
          b.left = base.offsetLeft;
          b.top = base.offsetTop;
          b.active = b.width > 0;
          const { minX, maxX, minY, maxY } = limits(b);
          b.x = clamp(minX, maxX, b.x);
          b.y = clamp(minY, maxY, b.y);
          render(b);
        }
      };

      // Floods the shape with its color, spreading out from the contact point.
      const revealColor = (
        b: Body,
        x: number,
        y: number,
        strength: number,
      ) => {
        const dx = x - (b.left + b.x + b.width / 2);
        const dy = y - (b.top + b.y + b.height / 2);
        const angle = (-b.rotation * Math.PI) / 180;
        const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
        const localY = dx * Math.sin(angle) + dy * Math.cos(angle);

        gsap.killTweensOf(b.reveal);
        gsap.set(b.reveal, {
          '--rx': `${clamp(0, 100, (localX / b.width + 0.5) * 100)}%`,
          '--ry': `${clamp(0, 100, (localY / b.height + 0.5) * 100)}%`,
        });
        gsap
          .timeline()
          .fromTo(
            b.reveal,
            { '--reveal': '0%', opacity: 0.6 + strength * 0.4 },
            { '--reveal': '130%', duration: 0.5, ease: 'power2.out' },
          )
          .to(b.reveal, {
            opacity: 0,
            duration: 0.8 + strength * 0.8,
            delay: 0.2 + strength * 0.4,
            ease: 'power1.in',
          });
      };

      const squash = (b: Body, axis: 'x' | 'y', strength: number) => {
        const amount = 0.2 * strength;
        gsap
          .timeline()
          .to(b.elements, {
            scaleX: axis === 'x' ? 1 - amount : 1 + amount * 0.6,
            scaleY: axis === 'y' ? 1 - amount : 1 + amount * 0.6,
            duration: 0.12,
            ease: 'sine.out',
            overwrite: 'auto',
          })
          .to(b.elements, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.9,
            ease: 'elastic.out(1, 0.5)',
          });
      };

      const impact = (
        b: Body,
        speed: number,
        x: number,
        y: number,
        axis: 'x' | 'y',
        time: number,
      ) => {
        if (speed < IMPACT_MIN_SPEED || time - b.lastImpact < IMPACT_COOLDOWN) {
          return;
        }
        b.lastImpact = time;
        const strength = clamp(0, 1, speed / 1400);
        revealColor(b, x, y, strength);
        squash(b, axis, strength);
      };

      const collide = (b: Body, time: number) => {
        const { minX, maxX, minY, maxY } = limits(b);
        const centerX = b.left + b.x + b.width / 2;
        const centerY = b.top + b.y + b.height / 2;

        if (b.x < minX || b.x > maxX) {
          const hitLeft = b.x < minX;
          b.x = hitLeft ? minX : maxX;
          if (hitLeft ? b.vx < 0 : b.vx > 0) {
            impact(b, Math.abs(b.vx), hitLeft ? 0 : boundsWidth, centerY, 'x', time);
            b.vx = -b.vx * RESTITUTION;
            b.spin += b.vy * (hitLeft ? -0.08 : 0.08);
          }
        }

        if (b.y < minY || b.y > maxY) {
          const hitTop = b.y < minY;
          b.y = hitTop ? minY : maxY;
          if (hitTop ? b.vy < 0 : b.vy > 0) {
            impact(b, Math.abs(b.vy), centerX, hitTop ? 0 : boundsHeight, 'y', time);
            b.vy = -b.vy * RESTITUTION;
            b.spin += b.vx * (hitTop ? 0.08 : -0.08);
          }
        }
      };

      // Throws ease back to each shape's steady drift instead of stopping.
      const tick = (time: number, deltaTime: number) => {
        const dt = Math.min(deltaTime / 1000, 1 / 30);
        const damping = Math.exp(-DAMPING * dt);
        const spinDamping = Math.exp(-SPIN_DAMPING * dt);

        for (const b of bodies) {
          if (!b.active || b.dragging) continue;

          let speed = Math.hypot(b.vx, b.vy);
          if (speed < 1) {
            b.vx = b.directionX;
            b.vy = b.directionY;
            speed = 1;
          }
          const nextSpeed = Math.min(
            b.cruiseSpeed + (speed - b.cruiseSpeed) * damping,
            MAX_SPEED,
          );
          b.vx *= nextSpeed / speed;
          b.vy *= nextSpeed / speed;
          b.spin = clamp(
            -MAX_SPIN,
            MAX_SPIN,
            b.cruiseSpin + (b.spin - b.cruiseSpin) * spinDamping,
          );

          b.x += b.vx * dt;
          b.y += b.vy * dt;
          b.rotation += b.spin * dt;
          collide(b, time);
          const travel = Math.hypot(b.vx, b.vy);
          if (travel > 0) {
            b.directionX = b.vx / travel;
            b.directionY = b.vy / travel;
          }
          render(b);
        }
      };

      const hitTest = (px: number, py: number) => {
        for (let i = bodies.length - 1; i >= 0; i--) {
          const b = bodies[i];
          if (!b.active) continue;
          const dx = px - (b.left + b.x + b.width / 2);
          const dy = py - (b.top + b.y + b.height / 2);
          const angle = (-b.rotation * Math.PI) / 180;
          const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
          const localY = dx * Math.sin(angle) + dy * Math.cos(angle);
          if (
            (localX / (b.width / 2)) ** 2 + (localY / (b.height / 2)) ** 2 <=
            1
          ) {
            return b;
          }
        }
        return null;
      };

      const canGrab = (e: PointerEvent) =>
        e.isPrimary &&
        (e.pointerType !== 'mouse' || e.button === 0) &&
        !(e.target as Element).closest(NO_GRAB_SELECTOR);

      const spotlight = { x: boundsWidth / 2, y: boundsHeight / 2 };
      const applySpotlight = () => {
        layer.style.setProperty('--x', `${spotlight.x}px`);
        layer.style.setProperty('--y', `${spotlight.y}px`);
      };
      const spotlightX = gsap.quickTo(spotlight, 'x', {
        duration: 0.6,
        ease: 'power3.out',
        onUpdate: applySpotlight,
      });
      const spotlightY = gsap.quickTo(spotlight, 'y', {
        duration: 0.6,
        ease: 'power3.out',
        onUpdate: applySpotlight,
      });

      const handlePointerDown = (e: PointerEvent) => {
        if (grab || !canGrab(e)) return;
        const b = hitTest(e.clientX, e.clientY);
        if (!b) return;

        e.preventDefault();
        grab = {
          body: b,
          pointerId: e.pointerId,
          offsetX: e.clientX - b.x,
          offsetY: e.clientY - b.y,
          samples: [{ t: performance.now(), x: e.clientX, y: e.clientY }],
        };
        b.dragging = true;
        b.vx = 0;
        b.vy = 0;
        container.style.cursor = 'grabbing';
        gsap.to(b.elements, {
          scale: 1.06,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const handleHover = (e: PointerEvent) => {
        if (grab || e.pointerType !== 'mouse') return;
        container.style.cursor =
          canGrab(e) && hitTest(e.clientX, e.clientY) ? 'grab' : '';
      };

      const handlePointerMove = (e: PointerEvent) => {
        if (e.pointerType === 'mouse') {
          spotlightX(e.clientX);
          spotlightY(e.clientY);
        }
        if (!grab || e.pointerId !== grab.pointerId) return;

        const b = grab.body;
        const { minX, maxX, minY, maxY } = limits(b);
        b.x = clamp(minX, maxX, e.clientX - grab.offsetX);
        b.y = clamp(minY, maxY, e.clientY - grab.offsetY);
        render(b);

        grab.samples.push({ t: performance.now(), x: e.clientX, y: e.clientY });
        if (grab.samples.length > 8) grab.samples.shift();
      };

      const handlePointerUp = (e: PointerEvent) => {
        if (!grab || e.pointerId !== grab.pointerId) return;

        const { body: b, samples } = grab;
        const now = performance.now();
        const last = samples[samples.length - 1];
        const first =
          samples.find((s) => s.t >= now - THROW_SAMPLE_MS) ?? last;
        const elapsed = Math.max((last.t - first.t) / 1000, 1 / 60);
        const heldStill = now - last.t > 80;

        // A shape set down without a throw keeps drifting the way it was dragged.
        const dragX = last.x - samples[0].x;
        const dragY = last.y - samples[0].y;
        const dragDistance = Math.hypot(dragX, dragY);
        if (dragDistance > 4) {
          b.directionX = dragX / dragDistance;
          b.directionY = dragY / dragDistance;
        }
        b.vx = heldStill ? 0 : (last.x - first.x) / elapsed;
        b.vy = heldStill ? 0 : (last.y - first.y) / elapsed;
        b.spin = clamp(-MAX_SPIN, MAX_SPIN, b.spin + b.vx * 0.1);
        b.dragging = false;
        grab = null;

        container.style.cursor = '';
        gsap.to(b.elements, {
          scale: 1,
          duration: 0.4,
          ease: 'back.out(3)',
          overwrite: 'auto',
        });
      };

      // Stops touch scrolling while a finger holds a shape.
      const blockTouchScroll = (e: TouchEvent) => {
        if (grab) e.preventDefault();
      };

      measure();
      applySpotlight();
      gsap.ticker.add(tick);
      window.addEventListener('resize', measure);
      container.addEventListener('pointerdown', handlePointerDown);
      container.addEventListener('pointermove', handleHover);
      container.addEventListener('touchstart', blockTouchScroll, {
        passive: false,
      });
      container.addEventListener('touchmove', blockTouchScroll, {
        passive: false,
      });
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('resize', measure);
        container.removeEventListener('pointerdown', handlePointerDown);
        container.removeEventListener('pointermove', handleHover);
        container.removeEventListener('touchstart', blockTouchScroll);
        container.removeEventListener('touchmove', blockTouchScroll);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);

        const elements = bodies.flatMap((b) => b.elements);
        gsap.killTweensOf(elements);
        gsap.set(elements, { clearProps: 'transform' });
        const reveals = bodies.map((b) => b.reveal);
        gsap.killTweensOf(reveals);
        gsap.set(reveals, { clearProps: 'opacity,--reveal,--rx,--ry' });
        layer.style.removeProperty('--x');
        layer.style.removeProperty('--y');
        container.style.cursor = '';
      };
    });

    return () => mm.revert();
  }, [shapes]);

  return (
    <div ref={containerRef} className={containerClassName}>
      {/* Background Shapes Layer */}
      <div
        ref={layerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base Layer */}
        <div className="absolute inset-0">
          {shapes.map((shape, i) => (
            <div
              key={`base-${i}`}
              ref={(el) => {
                baseRefs.current[i] = el;
              }}
              className={`absolute ${shape.position} ${shape.size} ${shape.baseColor} ${shape.borderRadius} ${shape.extraClasses ?? ''} ${shape.desktopOnly ? 'hidden md:block' : ''} will-change-transform`}>
              <div
                ref={(el) => {
                  revealRefs.current[i] = el;
                }}
                className={`${styles.reveal} absolute inset-0 rounded-[inherit] ${shape.spotlightColor}`}
              />
            </div>
          ))}
        </div>

        {/* Spotlight Layer */}
        <div className={`${styles.spotlightMask} absolute inset-0`}>
          {shapes.map((shape, i) => (
            <div
              key={`spot-${i}`}
              ref={(el) => {
                spotRefs.current[i] = el;
              }}
              className={`absolute ${shape.position} ${shape.size} ${shape.spotlightColor} ${shape.borderRadius} ${shape.extraClasses ?? ''} ${shape.desktopOnly ? 'hidden md:block' : ''} will-change-transform`}
            />
          ))}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
