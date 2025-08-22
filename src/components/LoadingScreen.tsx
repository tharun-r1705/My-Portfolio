import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-space-dark flex items-center justify-center"
    >
      <div className="text-center">
        {/* AI Circuit Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 mx-auto relative">
            {/* Central Node */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 bg-gradient-primary rounded-full neon-glow flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 bg-cosmic-white rounded-full"
              />
            </motion.div>

            {/* Orbiting Nodes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 3 + i * 0.5, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: i * 0.2 
                }}
                className="absolute inset-0"
                style={{ transform: `rotate(${i * 60}deg)` }}
              >
                <div className="w-4 h-4 bg-accent rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2 neon-glow" />
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(6)].map((_, i) => (
                <motion.line
                  key={i}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + 40 * Math.cos((i * 60 * Math.PI) / 180)}%`}
                  y2={`${50 + 40 * Math.sin((i * 60 * Math.PI) / 180)}%`}
                  stroke="url(#loadingGradient)"
                  strokeWidth="2"
                />
              ))}
              <defs>
                <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--electric-blue))" />
                  <stop offset="100%" stopColor="hsl(var(--neon-cyan))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-orbitron font-bold text-3xl gradient-text mb-2">
            Initializing AI Systems
          </h1>
          <p className="font-exo text-cosmic-white/80">
            Loading portfolio neural network...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-80 max-w-full mx-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-exo text-sm text-cosmic-white/60">Progress</span>
            <span className="font-exo text-sm text-accent font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-space-gray rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-primary relative"
            >
              <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse-glow"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center space-x-2 mt-8"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5] 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: i * 0.2 
              }}
              className="w-2 h-2 bg-accent rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}