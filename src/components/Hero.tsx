import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail, BookOpen } from 'lucide-react';
import CharacterArt from './ui/CharacterArt';

const roles = [
  'Backend Engineer',
  '.NET & ASP.NET Core',
  'Microservices',
  'Event-Driven Systems',
  'Tech Mentor',
];

const socials = [
  { href: 'https://github.com/ScreamingSyntax', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/aaryanjha/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://medium.com/@jha.aaryan', label: 'Medium', icon: BookOpen },
  { href: 'mailto:whcloud91@gmail.com', label: 'Email', icon: Mail },
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const typeText = useCallback(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else if (displayText.length > 0) {
      setDisplayText(displayText.slice(0, -1));
    } else {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const timeout = setTimeout(typeText, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [typeText, isDeleting]);

  return (
    <section className="container pb-8 pt-10 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
        className="border-3 border-ink shadow-hard-lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* --- Left: the pitch ------------------------------------------ */}
          <div className="no-grid flex flex-col gap-6 border-b-3 border-ink bg-paper p-6 sm:p-9 lg:col-span-3 lg:border-b-0 lg:border-r-3">
            {/* The sticker sits inside the h1 so the page's one top-level
                heading actually carries the name — "Hey, I'm Aaryan Jha,
                Backend Engineer" — rather than a job title on its own. */}
            <h1 className="flex flex-col items-start gap-6">
              <span className="sticker font-sans">Hey, I'm Aaryan Jha 👋</span>
              <span className="text-3xl">
                Backend{' '}
                <br />
                Engineer
              </span>
            </h1>

            <p className="measure text-base text-ink-soft">
              I build secure fintech and enterprise platforms with .NET, distributed
              microservices, and event-driven architecture. I work across the whole
              thing, from database schema to production deploy.
            </p>

            <div className="flex min-h-[2.2em] items-center gap-2 border-y-3 border-ink py-2">
              <span className="label shrink-0 text-violet">./role</span>
              <span className="text-base">
                {displayText}
                <span className="caret" aria-hidden="true" />
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#experience" className="btn btn-primary">
                View my work <ArrowUpRight size={18} />
              </a>
              <a href="/resume.pdf" download className="btn btn-ghost">
                Download resume <Download size={18} />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow">Connect with me</span>
              <div className="flex gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center border-3 border-ink bg-paper shadow-hard-xs transition-all duration-100 ease-snap hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-lime hover:text-on-lime hover:shadow-none"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right: photo + code card --------------------------------- */}
          <div className="relative bg-pink p-6 sm:p-9 lg:col-span-2">
            <CharacterArt
              name="coding"
              widths={[480, 768, 1024]}
              width={1024}
              height={820}
              sizes="(min-width: 1024px) 36vw, (min-width: 640px) 70vw, 100vw"
              alt="Illustration of Aaryan coding at a laptop"
              className="h-64 w-full border-3 border-ink bg-lime object-contain object-bottom shadow-hard sm:h-80"
              loading="eager"
              fetchPriority="high"
            />

            <div className="terminal relative -mt-10 ml-auto w-full max-w-[19rem] border-3 border-ink p-4 shadow-hard sm:-mt-12">
              <pre className="overflow-x-auto text-2xs leading-relaxed">
                <code>
                  <span className="tok-key">const</span> engineer = {'{'}
                  {'\n  '}writes: <span className="tok-str">'C#'</span>,
                  {'\n  '}reads: <span className="tok-str">'stack traces'</span>,
                  {'\n  '}deploys: <span className="tok-str">'on Fridays'</span>,
                  {'\n  '}regrets: <span className="tok-key">null</span>,
                  {'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            <div className="mt-6 flex items-center gap-3 border-3 border-ink bg-paper px-4 py-2.5">
              <span className="h-3 w-3 shrink-0 bg-lime ring-2 ring-ink" aria-hidden="true" />
              <span className="label">Available for opportunities</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
