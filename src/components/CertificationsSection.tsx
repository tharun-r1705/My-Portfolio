import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

const certifications = [
  {
    id: 1,
    title: 'Oracle Apex Developer',
    organization: 'Oracle Corporation',
    date: '2024',
    description: 'Advanced certification in Oracle Application Express development and low-code application building.',
    icon: '🎖️',
  },
  {
    id: 2,
    title: 'MongoDB Developer',
    organization: 'MongoDB University',
    date: '2024',
    description: 'Comprehensive certification covering MongoDB database design, development, and optimization.',
    icon: '🍃',
  },
];

const achievements = [
  {
    id: 1,
    title: 'SIH Internal Hackathon Participant',
    description: 'Participated in Smart India Hackathon internal selection, developing innovative solutions for government challenges.',
    date: '2024',
    icon: '🏆',
  },
  {
    id: 2,
    title: 'ISTE Project Presentation Winner',
    description: 'Won first place in ISTE technical project presentation for AI-powered educational solutions.',
    date: '2024',
    icon: '🥇',
  },
];

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl gradient-text mb-6">
            Certifications & Achievements
          </h2>
          <p className="font-exo text-xl text-cosmic-white/80 max-w-3xl mx-auto">
            Professional credentials and recognition in technology and innovation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-orbitron font-bold text-2xl gradient-text mb-8 text-center lg:text-left">
              Professional Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  className="glass-card p-6 hover-lift"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{cert.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-orbitron font-bold text-xl text-accent mb-2">
                        {cert.title}
                      </h4>
                      <p className="font-exo text-cosmic-white font-semibold mb-2">
                        {cert.organization}
                      </p>
                      <p className="font-exo text-cosmic-white/80 text-sm mb-3">
                        {cert.description}
                      </p>
                      <span className="inline-block bg-gradient-primary text-cosmic-white text-xs px-3 py-1 rounded-full">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-orbitron font-bold text-2xl gradient-text mb-8 text-center lg:text-left">
              Achievements & Recognition
            </h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  className="glass-card p-6 hover-lift"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-orbitron font-bold text-xl text-accent mb-2">
                        {achievement.title}
                      </h4>
                      <p className="font-exo text-cosmic-white/80 text-sm mb-3">
                        {achievement.description}
                      </p>
                      <span className="inline-block bg-gradient-glow text-space-dark text-xs px-3 py-1 rounded-full">
                        {achievement.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* View Credentials Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-glow text-cosmic-white font-exo font-semibold px-8 py-4 rounded-full neon-glow hover-lift"
          >
            <a href="https://www.linkedin.com/in/tharun-r1705/" target="_blank" rel="noopener noreferrer">
              View All Credentials
            </a>
          </Button>
        </motion.div>

        {/* Timeline Connection Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <motion.line
                key={i}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                transition={{ duration: 2, delay: 0.5 + i * 0.3 }}
                x1={`${20 + i * 15}%`}
                y1="20%"
                x2={`${30 + i * 15}%`}
                y2="80%"
                stroke="url(#gradient)"
                strokeWidth="1"
                className="neural-connection"
              />
            ))}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--electric-blue))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}