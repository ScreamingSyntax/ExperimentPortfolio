import { motion } from 'framer-motion';

const codeLines = [
  { text: 'const developer = {', color: '#c792ea' },
  { text: '  name: "Aaryan Jha",', color: '#82aaff' },
  { text: '  role: "Software Engineer",', color: '#82aaff' },
  { text: '  passion: "Building things",', color: '#82aaff' },
  { text: '};', color: '#c792ea' },
  { text: '', color: '' },
  { text: 'await portfolio.initialize();', color: '#f78c6c' },
];

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-dark-900 flex flex-col items-center justify-center z-50"
    >
      <div className="flex flex-col items-center max-w-md w-full px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full bg-dark-800 rounded-xl border border-dark-600 overflow-hidden shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-dark-700 border-b border-dark-600">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-dark-300 font-mono">portfolio.ts</span>
          </div>

          <div className="p-5 font-mono text-sm space-y-1">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
                className="flex items-center"
              >
                <span className="text-dark-400 w-6 text-right mr-4 select-none text-xs">
                  {i + 1}
                </span>
                <span style={{ color: line.color }}>{line.text}</span>
                {i === codeLines.length - 1 && (
                  <span className="typing-cursor ml-0.5 text-primary-400">&nbsp;</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
          className="h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mt-6 rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 text-dark-300 text-sm font-mono"
        >
          Compiling awesomeness...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
