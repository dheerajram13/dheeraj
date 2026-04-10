import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    // Only show on pointer (mouse) devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // Respect reduced motion — cursor still tracks but skip the ring lag
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      hovered.current = !!e.target.closest('a, button, [data-cursor-hover]');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onMouseOver);

    const animate = () => {
      const dot = dotRef.current;
      const ringEl = ringRef.current;

      if (dot) {
        dot.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }

      if (ringEl) {
        if (prefersReduced) {
          ring.current = { ...mouse.current };
        } else {
          ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
          ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
        }
        const scale = hovered.current ? 1.8 : 1;
        const color = hovered.current ? '#A7BEAE' : '#B85042';
        ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${scale})`;
        ringEl.style.borderColor = color;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = '';
    };
  }, []);

  // Don't render on touch devices (SSR-safe: render but hide via effect)
  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#B85042',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid #B85042',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          transition: 'border-color 0.2s ease, transform 0.08s linear',
        }}
      />
    </>
  );
};

export default CustomCursor;
