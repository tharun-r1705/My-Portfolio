import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.jpg';

export default function HeroSection() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Placeholder for resume download
    window.open('https://drive.google.com/file/d/your-resume-link', '_blank');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <img
              src={profilePhoto}
              alt="Tharun R - AI Developer"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-4 border-electric-blue neon-glow"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse-glow"></div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
        >
          <span className="gradient-text">Tharun R</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="font-orbitron text-xl md:text-3xl lg:text-4xl text-accent mb-4">
            AI Developer & Fullstack Engineer
          </h2>
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-exo text-lg md:text-xl text-cosmic-white/80 leading-relaxed mb-2"
            >
              Crafting intelligent solutions at the intersection of artificial intelligence and full-stack development.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-exo text-lg md:text-xl text-cosmic-white/80 leading-relaxed mb-2"
            >
              Building tomorrow's technology with neural networks, machine learning, and modern web architectures.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
              className="font-exo text-lg md:text-xl text-cosmic-white/80 leading-relaxed"
            >
              Passionate about creating AI-powered applications that solve real-world problems.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-glow text-cosmic-white font-exo font-semibold px-8 py-4 rounded-full neon-glow hover-lift border-0"
          >
            View Projects
          </Button>
          <Button
            onClick={downloadResume}
            variant="outline"
            size="lg"
            className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-cosmic-white font-exo font-semibold px-8 py-4 rounded-full hover-lift transition-all duration-300"
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Floating Circuit Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 2, delay: 2 + i * 0.3 }}
              className="absolute neural-node w-2 h-2"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}