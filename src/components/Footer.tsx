import React from 'react';
import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      icon: <Github size={20} />, 
      label: 'GitHub',
      href: 'https://github.com/ScreamingSyntax', 
      ariaLabel: 'GitHub Profile' 
    },
    { 
      icon: <Linkedin size={20} />, 
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aaryanjha/', 
      ariaLabel: 'LinkedIn Profile' 
    },
    { 
      icon: <Mail size={20} />, 
      label: 'Email',
      href: 'mailto:whcloud91@gmail.com', 
      ariaLabel: 'Send Email' 
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Resume',
      href: 'files/resume.pdf', 
      download: true,
      ariaLabel: 'Download Resume' 
    },
    { 
      icon: <ExternalLink size={20} />, 
      label: 'Medium',
      href: 'https://medium.com/@jha.aaryan', 
      ariaLabel: 'Medium Profile' 
    }
  ];

  return (
    <footer className="bg-dark-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing</h2>
          
          <p className="text-gray-300 max-w-2xl text-center mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                download={link.download}
                target={link.download ? '_self' : '_blank'}
                rel={!link.download ? 'noopener noreferrer' : undefined}
                aria-label={link.ariaLabel}
                className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors duration-300"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          
          <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>
          
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} Aaryan Jha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;