import { useCallback, useEffect, useRef, useState } from 'react';

type PetState = 'idle' | 'running-right' | 'running-left' | 'waving' | 'look';

const ROWS: Record<Exclude<PetState, 'look'>, { row: number; frames: number; frameMs: number }> = {
  idle: { row: 0, frames: 7, frameMs: 260 },
  'running-right': { row: 1, frames: 8, frameMs: 110 },
  'running-left': { row: 2, frames: 8, frameMs: 110 },
  waving: { row: 3, frames: 4, frameMs: 170 },
};

const PET_WIDTH = 80;
const EDGE_GAP = 16;

interface PortfolioPetProps {
  visible: boolean;
}

const PortfolioPet: React.FC<PortfolioPetProps> = ({ visible }) => {
  const [petState, setPetState] = useState<PetState>('idle');
  const [frame, setFrame] = useState(0);
  const [left, setLeft] = useState(EDGE_GAP);
  const [lookFrame, setLookFrame] = useState(0);
  const [message, setMessage] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const petRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef(EDGE_GAP);
  const stateRef = useRef<PetState>('idle');
  const timersRef = useRef<number[]>([]);

  const changeState = useCallback((next: PetState) => {
    stateRef.current = next;
    setPetState(next);
    setFrame(0);
  }, []);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];
  }, []);

  const moveTo = useCallback((nextLeft: number) => {
    leftRef.current = nextLeft;
    setLeft(nextLeft);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (petState === 'look' || reducedMotion) return;

    const animation = ROWS[petState];
    const interval = window.setInterval(
      () => setFrame((current) => (current + 1) % animation.frames),
      animation.frameMs,
    );

    return () => window.clearInterval(interval);
  }, [petState, reducedMotion]);

  useEffect(() => {
    const keepOnScreen = () => {
      const maxLeft = Math.max(EDGE_GAP, window.innerWidth - PET_WIDTH - EDGE_GAP);
      moveTo(Math.min(leftRef.current, maxLeft));
    };

    window.addEventListener('resize', keepOnScreen);
    return () => window.removeEventListener('resize', keepOnScreen);
  }, [moveTo]);

  useEffect(() => {
    if (!visible || reducedMotion) return;

    let cancelled = false;

    const scheduleWalk = () => {
      const wait = 9000 + Math.random() * 5000;
      const timer = window.setTimeout(() => {
        if (cancelled || stateRef.current !== 'idle') {
          scheduleWalk();
          return;
        }

        const maxLeft = Math.max(EDGE_GAP, window.innerWidth - PET_WIDTH - EDGE_GAP);
        const nextLeft = EDGE_GAP + Math.random() * Math.max(0, maxLeft - EDGE_GAP);
        changeState(nextLeft >= leftRef.current ? 'running-right' : 'running-left');
        moveTo(nextLeft);

        const stopTimer = window.setTimeout(() => {
          changeState('idle');
          scheduleWalk();
        }, 2600);
        timersRef.current.push(stopTimer);
      }, wait);
      timersRef.current.push(timer);
    };

    scheduleWalk();
    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [changeState, clearTimers, moveTo, reducedMotion, visible]);

  useEffect(() => {
    if (!visible || reducedMotion) return;

    let idleTimer = 0;
    let animationFrame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (stateRef.current === 'running-left' || stateRef.current === 'running-right' || stateRef.current === 'waving') {
        return;
      }

      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const bounds = petRef.current?.getBoundingClientRect();
        if (!bounds) return;

        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const degrees = (Math.atan2(event.clientX - centerX, centerY - event.clientY) * 180) / Math.PI;
        const normalized = (degrees + 360) % 360;
        setLookFrame(Math.round(normalized / 22.5) % 16);
        changeState('look');

        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => changeState('idle'), 900);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(idleTimer);
    };
  }, [changeState, reducedMotion, visible]);

  const wave = () => {
    if (!visible) return;
    changeState('waving');
    setMessage('HEY! 👋');

    const messageTimer = window.setTimeout(() => setMessage(''), 1300);
    const idleTimer = window.setTimeout(() => changeState('idle'), 1400);
    timersRef.current.push(messageTimer, idleTimer);
  };

  const row = petState === 'look' ? (lookFrame < 8 ? 9 : 10) : ROWS[petState].row;
  const column = petState === 'look' ? lookFrame % 8 : frame;

  return (
    <div
      className={`pointer-events-none fixed bottom-0 z-40 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left,
        transitionProperty: petState.startsWith('running') ? 'left, opacity' : 'opacity',
        transitionDuration: petState.startsWith('running') ? '2600ms, 200ms' : '200ms',
        transitionTimingFunction: petState.startsWith('running') ? 'linear' : undefined,
      }}
      aria-hidden={!visible}
    >
      {message && (
        <span className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap border-2 border-ink bg-lime px-2 py-1 label text-on-lime shadow-hard-xs">
          {message}
        </span>
      )}
      <button
        ref={petRef}
        type="button"
        onClick={wave}
        tabIndex={visible ? 0 : -1}
        aria-label="Wave to Aaryan's animated companion"
        className="pointer-events-auto block border-0 bg-transparent p-0 transition-transform duration-100 hover:-translate-y-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-violet"
      >
        <span
          className="portfolio-pet__sprite block"
          style={{
            backgroundPosition: `${(column / 7) * 100}% ${(row / 10) * 100}%`,
          }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default PortfolioPet;
