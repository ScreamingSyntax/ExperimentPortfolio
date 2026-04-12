import { useEffect, useRef, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hovering = useRef(false);
  const clicking = useRef(false);
  const animRef = useRef<number>();

  const render = useCallback(() => {
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      animRef.current = requestAnimationFrame(render);
      return;
    }

    const isHover = hovering.current;
    const isClick = clicking.current;
    const isVisible = visible.current;

    const dotSize = isHover ? 12 : 8;
    const dotScale = isClick ? 0.5 : isHover ? 1.5 : 1;
    dot.style.width = `${dotSize}px`;
    dot.style.height = `${dotSize}px`;
    dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${dotScale})`;
    dot.style.opacity = isVisible ? '1' : '0';

    const ringSize = isHover ? 50 : 40;
    const ringScale = isClick ? 0.8 : isHover ? 1.5 : 1;
    ring.style.width = `${ringSize}px`;
    ring.style.height = `${ringSize}px`;
    ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${ringScale})`;
    ring.style.borderColor = isHover ? 'rgba(99, 102, 241, 0.8)' : 'rgba(99, 102, 241, 0.35)';
    ring.style.opacity = isVisible ? '1' : '0';

    animRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      const target = e.target as HTMLElement;
      hovering.current = !!target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
    };

    const onEnter = () => { visible.current = true; };
    const onLeave = () => { visible.current = false; };
    const onDown = () => { clicking.current = true; };
    const onUp = () => { clicking.current = false; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [render]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          boxShadow: '0 0 12px 3px rgba(99, 102, 241, 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(99, 102, 241, 0.35)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0,
          transition: 'width 0.25s, height 0.25s, border-color 0.25s, opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
