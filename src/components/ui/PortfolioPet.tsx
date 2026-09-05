import { useCallback, useEffect, useRef, useState } from 'react';

type PetState =
  | 'idle'
  | 'running-right'
  | 'running-left'
  | 'waving'
  | 'jumping'
  | 'failed'
  | 'waiting'
  | 'working'
  | 'review'
  | 'look';

type AnimatedState = Exclude<PetState, 'look'>;

const ROWS: Record<AnimatedState, { row: number; frames: number; frameMs: number }> = {
  idle: { row: 0, frames: 7, frameMs: 260 },
  'running-right': { row: 1, frames: 8, frameMs: 105 },
  'running-left': { row: 2, frames: 8, frameMs: 105 },
  waving: { row: 3, frames: 4, frameMs: 170 },
  jumping: { row: 4, frames: 5, frameMs: 125 },
  failed: { row: 5, frames: 8, frameMs: 180 },
  waiting: { row: 6, frames: 6, frameMs: 210 },
  working: { row: 7, frames: 6, frameMs: 175 },
  review: { row: 8, frames: 6, frameMs: 210 },
};

const EDGE_GAP = 12;
const POSITION_KEY = 'portfolio-pet-position-v1';
const CLICK_REACTIONS: Array<{ state: AnimatedState; message: string; duration: number }> = [
  { state: 'waving', message: 'HEY! 👋', duration: 1450 },
  { state: 'jumping', message: "LET'S GO!", duration: 900 },
  { state: 'working', message: 'SHIP IT.', duration: 1450 },
  { state: 'review', message: 'LOOKS GOOD.', duration: 1450 },
  { state: 'waiting', message: "WHAT'S NEXT?", duration: 1550 },
];

interface PortfolioPetProps {
  visible: boolean;
}

interface DragSession {
  pointerId: number;
  startX: number;
  startLeft: number;
  moved: boolean;
}

const PortfolioPet: React.FC<PortfolioPetProps> = ({ visible }) => {
  const [petState, setPetState] = useState<PetState>('idle');
  const [frame, setFrame] = useState(0);
  const [left, setLeft] = useState(EDGE_GAP);
  const [lookFrame, setLookFrame] = useState(0);
  const [message, setMessage] = useState('');
  const [moveDuration, setMoveDuration] = useState(2200);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [entered, setEntered] = useState(false);
  const [behaviorRestart, setBehaviorRestart] = useState(0);

  const petRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef(EDGE_GAP);
  const stateRef = useRef<PetState>('idle');
  const draggingRef = useRef(false);
  const dragRef = useRef<DragSession | null>(null);
  const messageTimerRef = useRef<number>();
  const interactionTimersRef = useRef<number[]>([]);
  const suppressClickRef = useRef(false);
  const hoverHintShownRef = useRef(false);
  const hasIntroducedRef = useRef(false);

  const changeState = useCallback((next: PetState) => {
    stateRef.current = next;
    setPetState(next);
    setFrame(0);
  }, []);

  const clearInteractionTimers = useCallback(() => {
    interactionTimersRef.current.forEach(window.clearTimeout);
    interactionTimersRef.current = [];
  }, []);

  const showMessage = useCallback((nextMessage: string, duration = 1500) => {
    window.clearTimeout(messageTimerRef.current);
    setMessage(nextMessage);
    messageTimerRef.current = window.setTimeout(() => setMessage(''), duration);
  }, []);

  const getHorizontalBounds = useCallback(() => {
    const petWidth = petRef.current?.getBoundingClientRect().width ?? 132;
    const rightControlReserve = window.innerWidth >= 640 ? 92 : 68;
    return {
      min: EDGE_GAP,
      max: Math.max(EDGE_GAP, window.innerWidth - petWidth - rightControlReserve),
    };
  }, []);

  const clampLeft = useCallback(
    (value: number) => {
      const bounds = getHorizontalBounds();
      return Math.min(bounds.max, Math.max(bounds.min, value));
    },
    [getHorizontalBounds],
  );

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
    if (!visible) return;

    const savedValue = window.localStorage.getItem(POSITION_KEY);
    const savedPosition = savedValue === null ? Number.NaN : Number(savedValue);
    const bounds = getHorizontalBounds();
    if (Number.isFinite(savedPosition)) {
      moveTo(bounds.min + savedPosition * (bounds.max - bounds.min));
    }

    const entranceTimer = window.setTimeout(() => setEntered(true), 50);
    return () => window.clearTimeout(entranceTimer);
  }, [getHorizontalBounds, moveTo, visible]);

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
      const bounds = getHorizontalBounds();
      moveTo(Math.min(bounds.max, Math.max(bounds.min, leftRef.current)));
    };

    window.addEventListener('resize', keepOnScreen);
    return () => window.removeEventListener('resize', keepOnScreen);
  }, [getHorizontalBounds, moveTo]);

  useEffect(() => {
    if (!visible || reducedMotion) return;

    let cancelled = false;
    const timers: number[] = [];
    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
      timers.push(timer);
    };

    function scheduleNext(delay: number) {
      later(() => {
        if (draggingRef.current) {
          scheduleNext(1200);
          return;
        }

        if (stateRef.current !== 'idle' && stateRef.current !== 'look') {
          scheduleNext(1000);
          return;
        }

        if (Math.random() < 0.58) travel();
        else performPose();
      }, delay);
    }

    const returnToIdle = (delay: number) => {
      later(() => {
        changeState('idle');
        scheduleNext(1800 + Math.random() * 2300);
      }, delay);
    };

    const performPose = () => {
      const roll = Math.random();

      if (roll < 0.22) {
        changeState('jumping');
        showMessage('BOING!', 750);
        returnToIdle(820);
      } else if (roll < 0.41) {
        changeState('waving');
        returnToIdle(1450);
      } else if (roll < 0.61) {
        changeState('working');
        showMessage('BUILDING...', 1250);
        returnToIdle(1700);
      } else if (roll < 0.78) {
        changeState('review');
        returnToIdle(1650);
      } else if (roll < 0.92) {
        changeState('waiting');
        showMessage('HMM...', 1100);
        returnToIdle(1700);
      } else {
        changeState('failed');
        showMessage('NEED COFFEE.', 1450);
        returnToIdle(1800);
      }
    };

    const travel = () => {
      const bounds = getHorizontalBounds();
      const range = bounds.max - bounds.min;
      let destination = bounds.min + Math.random() * range;

      if (range > 220 && Math.abs(destination - leftRef.current) < 120) {
        destination = leftRef.current < bounds.min + range / 2 ? bounds.max : bounds.min;
      }

      const distance = Math.abs(destination - leftRef.current);
      const duration = Math.min(4200, Math.max(1250, distance * 7.5));
      setMoveDuration(duration);
      changeState(destination >= leftRef.current ? 'running-right' : 'running-left');
      moveTo(destination);

      later(() => {
        if (Math.random() < 0.34) {
          changeState('jumping');
          later(performPose, 720);
        } else {
          performPose();
        }
      }, duration);
    };

    if (!hasIntroducedRef.current) {
      hasIntroducedRef.current = true;
      changeState('jumping');
      showMessage('HEY, I LIVE HERE! 👋', 2200);
      later(() => changeState('waving'), 760);
      later(() => {
        changeState('idle');
        showMessage('DRAG ME • CLICK ME', 2300);
        scheduleNext(3200);
      }, 2100);
    } else {
      scheduleNext(2400 + Math.random() * 1800);
    }

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [behaviorRestart, changeState, getHorizontalBounds, moveTo, reducedMotion, showMessage, visible]);

  useEffect(() => {
    if (!visible || reducedMotion) return;

    let animationFrame = 0;
    let lookTimer = 0;

    const handlePointerMove = (event: PointerEvent) => {
      if (draggingRef.current || (stateRef.current !== 'idle' && stateRef.current !== 'look')) return;

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

        window.clearTimeout(lookTimer);
        lookTimer = window.setTimeout(() => changeState('idle'), 700);
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(lookTimer);
    };
  }, [changeState, reducedMotion, visible]);

  useEffect(
    () => () => {
      clearInteractionTimers();
      window.clearTimeout(messageTimerRef.current);
    },
    [clearInteractionTimers],
  );

  const runReaction = () => {
    if (!visible || suppressClickRef.current) return;
    clearInteractionTimers();
    setBehaviorRestart((current) => current + 1);
    const reaction = CLICK_REACTIONS[Math.floor(Math.random() * CLICK_REACTIONS.length)];
    changeState(reaction.state);
    showMessage(reaction.message, reaction.duration - 100);
    interactionTimersRef.current.push(window.setTimeout(() => changeState('idle'), reaction.duration));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!visible || event.button !== 0) return;
    clearInteractionTimers();
    const renderedLeft = clampLeft(event.currentTarget.parentElement?.getBoundingClientRect().left ?? leftRef.current);
    moveTo(renderedLeft);
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startLeft: renderedLeft,
      moved: false,
    };
    draggingRef.current = true;
    setDragging(true);
    changeState('idle');
    showMessage('DRAG ME!', 1000);
    setBehaviorRestart((current) => current + 1);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 5) drag.moved = true;
    if (!drag.moved) return;

    const nextLeft = clampLeft(drag.startLeft + delta);
    const direction = nextLeft >= leftRef.current ? 'running-right' : 'running-left';
    if (stateRef.current !== direction) changeState(direction);
    moveTo(nextLeft);
  };

  const finishDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    draggingRef.current = false;
    dragRef.current = null;
    setDragging(false);

    if (!drag.moved) return;

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);

    const bounds = getHorizontalBounds();
    const ratio = bounds.max === bounds.min ? 0 : (leftRef.current - bounds.min) / (bounds.max - bounds.min);
    window.localStorage.setItem(POSITION_KEY, String(Math.min(1, Math.max(0, ratio))));
    changeState('jumping');
    showMessage('NICE SPOT!', 950);
    interactionTimersRef.current.push(
      window.setTimeout(() => {
        changeState('idle');
        setBehaviorRestart((current) => current + 1);
      }, 780),
    );
  };

  const handleHover = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' || hoverHintShownRef.current || draggingRef.current) return;
    hoverHintShownRef.current = true;
    showMessage('GRAB OR CLICK ME!', 1400);
  };

  const row = petState === 'look' ? (lookFrame < 8 ? 9 : 10) : ROWS[petState].row;
  const column = petState === 'look' ? lookFrame % 8 : frame;
  const isTravelling = petState === 'running-left' || petState === 'running-right';

  return (
    <div
      className={`portfolio-pet pointer-events-none fixed bottom-0 z-[60] ${
        visible ? 'portfolio-pet--visible' : ''
      } ${entered ? 'portfolio-pet--entered' : ''} portfolio-pet--${petState} ${
        dragging ? 'portfolio-pet--dragging' : ''
      }`}
      style={{
        left,
        transitionProperty: dragging ? 'opacity' : isTravelling ? 'left, opacity' : 'opacity',
        transitionDuration: dragging ? '100ms' : isTravelling ? `${moveDuration}ms, 200ms` : '200ms',
        transitionTimingFunction: isTravelling ? 'linear' : undefined,
      }}
      aria-hidden={!visible}
    >
      {message && (
        <span
          aria-hidden="true"
          className={`portfolio-pet__message absolute bottom-full mb-1 whitespace-nowrap border-2 border-ink bg-lime px-2.5 py-1.5 label text-on-lime shadow-hard-xs ${
            left < 120 ? 'left-0' : 'left-1/2 -translate-x-1/2'
          }`}
        >
          {message}
        </span>
      )}
      <span className="portfolio-pet__ground" aria-hidden="true" />
      <button
        ref={petRef}
        type="button"
        onClick={runReaction}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onPointerEnter={handleHover}
        tabIndex={visible ? 0 : -1}
        aria-label="Animated Aaryan companion. Click for a reaction or drag to move."
        title="Drag me or click me"
        className="portfolio-pet__button pointer-events-auto block border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-3 focus-visible:outline-violet"
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
