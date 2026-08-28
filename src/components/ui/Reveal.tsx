import { useEffect, useRef } from 'react';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger index — each step adds 60ms. */
  index?: number;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

/**
 * Scroll reveal that fails visible.
 *
 * The hidden state is applied by CSS only under `html.js` (set by an inline
 * script before first paint), so if scripting is off — or the animation never
 * runs — the content is still on the page. The transition itself is CSS, not
 * a JS rAF loop, so a tab that scrolls past a section while backgrounded
 * still ends up in the correct final state.
 */
const Reveal: React.FC<RevealProps> = ({ children, index = 0, className = '', as = 'div' }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add('reveal--in');

    if (!('IntersectionObserver' in window)) {
      show();
      return;
    }

    // Anything already on screen at mount reveals right away, so a visitor
    // landing on a deep link never waits on an observer callback.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
