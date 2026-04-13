import { Github, Linkedin, Mail, FileText, ArrowUpRight } from 'lucide-react';

const socialLinks = [
  {
    icon: <Github size={18} />,
    label: 'GitHub',
    href: 'https://github.com/ScreamingSyntax',
    external: true,
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aaryanjha/',
    external: true,
  },
  {
    icon: <Mail size={18} />,
    label: 'Email',
    href: 'mailto:whcloud91@gmail.com',
    external: true,
  },
  {
    icon: <FileText size={18} />,
    label: 'Resume',
    href: '/resume.pdf',
    external: false,
    isDownload: true,
  },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Let's Build Something{' '}
              <span className="text-gradient">Amazing</span>
            </h2>
            <p className="text-dark-200 text-lg leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                {...(link.isDownload ? { download: true } : {})}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-2 px-5 py-2.5 bg-dark-800 hover:bg-dark-700 rounded-xl border border-dark-700 hover:border-primary-700 transition-all duration-300"
              >
                <span className="text-dark-300 group-hover:text-primary-400 transition-colors">
                  {link.icon}
                </span>
                <span className="text-sm font-medium">{link.label}</span>
                <ArrowUpRight size={12} className="text-dark-400 group-hover:text-primary-400 transition-colors" />
              </a>
            ))}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-300">
            <p>
              &copy; {currentYear} Aaryan Jha. Built with React & Three.js
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Available for hire</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
