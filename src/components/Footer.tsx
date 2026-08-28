import { Github, Linkedin, BookOpen, Mail } from 'lucide-react';

const socials = [
  { href: 'https://github.com/ScreamingSyntax', label: 'GitHub', icon: Github },
  { href: 'https://www.linkedin.com/in/aaryanjha/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://medium.com/@jha.aaryan', label: 'Medium', icon: BookOpen },
  { href: 'mailto:whcloud91@gmail.com', label: 'Email', icon: Mail },
];

const Footer: React.FC = () => (
  <footer className="no-grid mt-8 border-t-3 border-ink bg-ink text-paper">
    <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-5 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
      <a href="#" className="font-display text-base">
        <span aria-hidden="true">{'</> '}</span>AARYAN JHA
      </a>

      <p className="label text-center opacity-70">
        © {new Date().getFullYear()} Aaryan Jha · Built with React &amp; Tailwind
      </p>

      <div className="flex gap-3">
        {socials.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="grid h-10 w-10 place-items-center border-3 border-paper transition-colors duration-100 hover:bg-lime hover:text-on-lime"
          >
            <Icon size={17} strokeWidth={2.5} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
