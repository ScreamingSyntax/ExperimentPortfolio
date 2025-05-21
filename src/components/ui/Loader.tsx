import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-dark-900 flex flex-col items-center justify-center z-50"
    >
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 mb-8"
        >
          <div className="w-full h-full rounded-full border-t-4 border-b-4 border-primary-500"></div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-gradient"
        >
          Aaryan Jha
        </motion.h1>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
          className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mt-4 rounded-full"
        ></motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-4 text-gray-500 dark:text-gray-400"
        >
          Loading the portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;