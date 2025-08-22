import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ParticleBackground />
          <div className="relative z-10">
            <Navigation />
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <HeroSection />
              <SkillsSection />
              <ProjectsSection />
              <CertificationsSection />
              <ContactSection />
            </motion.main>
            
            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="py-8 text-center border-t border-electric-blue/20 bg-space-dark/50 backdrop-blur-md"
            >
              <div className="container mx-auto px-6">
                <p className="font-exo text-cosmic-white/60">
                  © 2024 Tharun R. Crafted with AI and passion.
                </p>
                <p className="font-exo text-cosmic-white/40 text-sm mt-2">
                  Building the future, one algorithm at a time.
                </p>
              </div>
            </motion.footer>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
