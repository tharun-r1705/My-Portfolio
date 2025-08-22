import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const aiSkills = [
  { name: 'Machine Learning', level: 90 },
  { name: 'Deep Learning', level: 85 },
  { name: 'Langchain', level: 88 },
  { name: 'TensorFlow', level: 82 },
  { name: 'LLMs', level: 92 },
  { name: 'AI Agents', level: 85 },
];

const fullstackSkills = [
  { name: 'React', level: 95 },
  { name: 'Node.js', level: 88 },
  { name: 'Python', level: 92 },
  { name: 'MongoDB', level: 86 },
  { name: 'Express', level: 90 },
  { name: 'TypeScript', level: 89 },
];

interface SkillBarProps {
  skill: { name: string; level: number };
  index: number;
  delay: number;
}

function SkillBar({ skill, index, delay }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-exo font-medium text-cosmic-white">{skill.name}</span>
        <span className="font-exo text-accent font-semibold">{skill.level}%</span>
      </div>
      <div className="w-full bg-space-gray rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          className="h-full bg-gradient-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-pulse-glow"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl gradient-text mb-6">
            Skills & Expertise
          </h2>
          <p className="font-exo text-xl text-cosmic-white/80 max-w-3xl mx-auto">
            Bridging the gap between artificial intelligence and full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* AI Skills */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 hover-lift"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-4 neon-glow">
                <svg className="w-6 h-6 text-cosmic-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-orbitron font-bold text-2xl gradient-text">AI Skills</h3>
            </div>
            <div className="space-y-4">
              {aiSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>

          {/* Fullstack Skills */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 hover-lift"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-glow rounded-lg flex items-center justify-center mr-4 neon-glow">
                <svg className="w-6 h-6 text-cosmic-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="font-orbitron font-bold text-2xl gradient-text">Fullstack Skills</h3>
            </div>
            <div className="space-y-4">
              {fullstackSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  index={index}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Neural Network Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 2, delay: 1 + i * 0.2 }}
              className="absolute neural-connection h-px"
              style={{
                left: `${10 + i * 10}%`,
                top: `${20 + (i % 3) * 30}%`,
                width: `${5 + i * 2}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}