import { useState } from 'react';
import { Send, AlertCircle, ArrowUpRight, MapPin, Clock, Phone, Mail, Github, Linkedin, BookOpen } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Reveal from './ui/Reveal';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const socialLinks = [
  { name: 'GitHub', handle: '@ScreamingSyntax', href: 'https://github.com/ScreamingSyntax', icon: Github },
  { name: 'LinkedIn', handle: '/in/aaryanjha', href: 'https://www.linkedin.com/in/aaryanjha/', icon: Linkedin },
  { name: 'Medium', handle: '@jha.aaryan', href: 'https://medium.com/@jha.aaryan', icon: BookOpen },
  {
    name: 'Stack Overflow',
    handle: 'aaryan-jha',
    href: 'https://stackoverflow.com/users/19063017/aaryan-jha',
    icon: ArrowUpRight,
  },
];

const Contact: React.FC = () => {

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const validateForm = () => {
    const newErrors = {
      name: formState.name ? '' : 'Enter your name so I know who I am replying to',
      email: formState.email
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
          ? ''
          : 'That email address is missing an @ or a domain'
        : 'Enter an email address so I can reply',
      message: formState.message ? '' : 'Add a message. A sentence is plenty.',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        { from_name: formState.name, from_email: formState.email, message: formState.message },
        publicKey
      );
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="container py-12 sm:py-16">
      <Reveal
        className="border-3 border-ink shadow-hard-lg"
      >
        {/* The big violet statement panel */}
        <div className="no-grid relative flex flex-wrap items-center justify-between gap-6 overflow-hidden border-b-3 border-ink bg-violet p-6 text-on-violet sm:p-10">
          <div>
            <h2 className="text-2xl">
              Let's build
              <br />
              something.
            </h2>
            <p className="measure mt-4 text-2xs">
              Backend work, platform architecture, or mentoring. I read everything
              that lands here.
            </p>
          </div>
          <div className="starburst hidden h-32 w-32 shrink-0 border-ink p-4 text-2xs sm:grid">
            Open to work
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Details */}
          <div className="no-grid flex flex-col gap-6 border-b-3 border-ink bg-cream p-6 sm:p-8 lg:col-span-2 lg:border-b-0 lg:border-r-3">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Direct</span>
              <a href="mailto:whcloud91@gmail.com" className="flex items-center gap-2.5 text-base hover:text-violet">
                <Mail size={16} strokeWidth={2.5} /> whcloud91@gmail.com
              </a>
              <a href="tel:+9779745471881" className="flex items-center gap-2.5 text-2xs hover:text-violet">
                <Phone size={15} strokeWidth={2.5} /> +977 9745471881
              </a>
              <p className="flex items-center gap-2.5 text-2xs text-ink-soft">
                <MapPin size={15} strokeWidth={2.5} /> Kathmandu, Nepal
              </p>
              <p className="flex items-center gap-2.5 text-2xs text-ink-soft">
                <Clock size={15} strokeWidth={2.5} /> Usually replies within 24 hours
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t-3 border-ink pt-6">
              <span className="eyebrow">Elsewhere</span>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ name, handle, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1.5 border-3 border-ink bg-paper p-3 shadow-hard-xs transition-all duration-100 ease-snap hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-lime hover:text-on-lime hover:shadow-none"
                  >
                    <Icon size={17} strokeWidth={2.5} />
                    <span className="label">{name}</span>
                    <span className="text-2xs text-ink-soft">{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="no-grid bg-paper p-6 sm:p-8 lg:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`field ${errors.name ? 'border-pink' : ''}`}
                />
                {errors.name && (
                  <p id="name-error" className="flex items-center gap-1.5 text-2xs text-pink">
                    <AlertCircle size={13} strokeWidth={3} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`field ${errors.email ? 'border-pink' : ''}`}
                />
                {errors.email && (
                  <p id="email-error" className="flex items-center gap-1.5 text-2xs text-pink">
                    <AlertCircle size={13} strokeWidth={3} /> {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="What are you building?"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`field resize-y ${errors.message ? 'border-pink' : ''}`}
                />
                {errors.message && (
                  <p id="message-error" className="flex items-center gap-1.5 text-2xs text-pink">
                    <AlertCircle size={13} strokeWidth={3} /> {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary self-start disabled:opacity-60">
                {isSubmitting ? 'Sending…' : 'Send message'}
                <Send size={17} />
              </button>

              <div aria-live="polite">
                {submitStatus === 'success' && (
                  <p className="border-3 border-ink bg-lime px-4 py-3 text-2xs text-on-lime">
                    Message sent. I'll get back to you within a day.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="border-3 border-ink bg-pink px-4 py-3 text-2xs text-on-pink">
                    That didn't send. Email me directly at whcloud91@gmail.com instead.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Contact;
