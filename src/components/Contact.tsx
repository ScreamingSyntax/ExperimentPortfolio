import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './ui/SectionHeading';
import { Send, Mail, AlertCircle, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@ScreamingSyntax',
    href: 'https://github.com/ScreamingSyntax',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: '/in/aaryanjha',
    href: 'https://www.linkedin.com/in/aaryanjha/',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Medium',
    handle: '@jha.aaryan',
    href: 'https://medium.com/@jha.aaryan',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    name: 'Stack Overflow',
    handle: 'aaryan-jha',
    href: 'https://stackoverflow.com/users/19063017/aaryan-jha',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.4H4.021v-6.4H1.89zm4.265 2.133v1.067h10.66v-1.067H6.154Z" />
      </svg>
    ),
  },
];

const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors = {
      name: formState.name ? '' : 'Name is required',
      email: formState.email
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
          ? ''
          : 'Please enter a valid email'
        : 'Email is required',
      message: formState.message ? '' : 'Message is required',
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
      await emailjs.send(serviceId, templateId, {
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
      }, publicKey);
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-600 transition-all duration-300 outline-none ${
      errors[field as keyof typeof errors]
        ? 'border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500/20'
        : focused === field
        ? 'border-primary-400 dark:border-primary-500 ring-2 ring-primary-500/20'
        : 'border-gray-200 dark:border-dark-500 hover:border-gray-300 dark:hover:border-dark-400'
    }`;

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind? Let's build something amazing together"
          label="Contact"
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-500">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-bold font-display">Let's Talk</h3>
                  <a href="mailto:whcloud91@gmail.com" className="text-sm text-primary-500 hover:text-primary-600 transition-colors">
                    whcloud91@gmail.com
                  </a>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-300">
                  <MapPin size={14} /> Nepal
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-300">
                  <Clock size={14} /> Usually responds within 24 hours
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 dark:bg-dark-600 mb-6" />

              <h4 className="text-sm font-semibold mb-4">Connect with me</h4>
              <div className="space-y-2">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500 dark:text-dark-300 group-hover:text-primary-500 transition-colors">
                        {link.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{link.name}</div>
                        <div className="text-xs text-gray-400 dark:text-dark-300">{link.handle}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-gray-300 group-hover:text-primary-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl bg-white dark:bg-dark-700 border border-gray-100 dark:border-dark-600 shadow-lg"
            >
              <h3 className="text-xl font-bold font-display mb-6">Send a Message</h3>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                    submitStatus === 'success'
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}
                >
                  {submitStatus === 'success'
                    ? 'Message sent successfully! I\'ll get back to you soon.'
                    : 'Something went wrong. Please try again or email me directly.'}
                </motion.div>
              )}

              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className={inputClasses('name')}
                    placeholder="What's your name?"
                  />
                  {errors.name && (
                    <div className="mt-1.5 flex items-center text-red-500 text-xs gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={inputClasses('email')}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <div className="mt-1.5 flex items-center text-red-500 text-xs gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    className={inputClasses('message')}
                    placeholder="Tell me about your project or idea..."
                  />
                  {errors.message && (
                    <div className="mt-1.5 flex items-center text-red-500 text-xs gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full py-3.5 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 font-medium ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
