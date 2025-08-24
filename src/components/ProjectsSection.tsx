import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import eduAssistImage from '@/assets/edu-assist.jpg';
import interviewHelperImage from '@/assets/interview-helper.jpg';
import dataCollectionImage from '@/assets/data-collection.jpg';

const projects = [
  {
    id: 1,
    title: 'Edu Assist',
    description: 'AI-powered educational assistant that helps students with personalized learning experiences, homework assistance, and study planning.',
    image: eduAssistImage,
    technologies: ['React', 'Node.js', 'Langchain', 'OpenAI', 'MongoDB'],
    category: 'AI',
    //liveUrl: '#',
    githubUrl: 'https://github.com/tharun-r1705/EduAssist',
  },
  {
    id: 2,
    title: 'Interview Helper Chatbot',
    description: 'Intelligent chatbot that conducts mock interviews, provides feedback, and helps candidates prepare for technical interviews.',
    image: interviewHelperImage,
    technologies: ['Python', 'TensorFlow', 'React', 'Express', 'NLP'],
    category: 'AI',
    //liveUrl: '#',
    githubUrl: 'https://github.com/tharun-r1705/Code-Trio',
  },
  {
    id: 3,
    title: 'Smart Data Collection System',
    description: 'Automated data collection and analysis platform with role-based access control for students and teachers.',
    image: dataCollectionImage,
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'],
    category: 'Fullstack',
    liveUrl: 'https://smart-data-collection.vercel.app/',
    githubUrl: 'https://github.com/tharun-r1705/data-frontend-new',
  },
];

const categories = ['All', 'AI Projects', 'Fullstack Projects'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AI Projects') return project.category === 'AI';
    if (activeFilter === 'Fullstack Projects') return project.category === 'Fullstack';
    return true;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="font-exo text-xl text-cosmic-white/80 max-w-3xl mx-auto mb-12">
            Innovative solutions combining AI intelligence with modern web technologies
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveFilter(category)}
                variant={activeFilter === category ? "default" : "outline"}
                className={`font-exo font-medium px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-primary text-cosmic-white neon-glow'
                    : 'border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-cosmic-white'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-card p-6 hover-lift group"
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Badge 
                  className={`absolute top-4 right-4 ${
                    project.category === 'AI' 
                      ? 'bg-vibrant-purple text-cosmic-white' 
                      : 'bg-neon-cyan text-space-dark'
                  }`}
                >
                  {project.category}
                </Badge>
              </div>

              <h3 className="font-orbitron font-bold text-xl gradient-text mb-3">
                {project.title}
              </h3>

              <p className="font-exo text-cosmic-white/80 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-electric-blue text-electric-blue">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-4">
  {project.liveUrl ? (
    <>
      <Button
        asChild
        size="sm"
        className="bg-gradient-primary hover:bg-gradient-glow text-cosmic-white font-exo flex-1"
      >
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          Live Demo
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-cosmic-white font-exo flex-1"
      >
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Button>
    </>
  ) : (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-cosmic-white font-exo w-full"
    >
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
      </Button>
    )}
  </div>
            </motion.div>
          ))}
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 2, delay: 1 + i * 0.2 }}
              className="absolute neural-node w-1 h-1"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}