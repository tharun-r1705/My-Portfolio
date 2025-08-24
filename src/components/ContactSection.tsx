import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  MarchingCubes,
  MarchingCube,
  Points,
  PointMaterial,
  Line,
  OrbitControls,
  Float,
  Text,
  Trail,
} from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';

// AI Brain Visualization Components
function NeuralCore() {
  const meshRef = useRef();
  const [pulse, setPulse] = useState(0);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    meshRef.current.rotation.x = Math.cos(t * 0.15) * 0.2;
    
    // Pulse effect
    setPulse(Math.sin(t * 2) * 0.5 + 0.5);
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color="#00ffff" 
        emissive="#0088ff"
        emissiveIntensity={1.5 + pulse}
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function NeuralNode({ position, connections, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    
    // Gentle floating motion
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.05;
    
    // Pulsing when hovered
    if (hovered) {
      meshRef.current.scale.set(1.2, 1.2, 1.2);
    } else {
      meshRef.current.scale.set(1, 1, 1);
    }
  });
  
  const handlePointerOver = () => {
    setHovered(true);
    onHover(position);
  };
  
  const handlePointerOut = () => {
    setHovered(false);
  };
  
  return (
    <mesh 
      ref={meshRef} 
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color={hovered ? "#ff00ff" : "#00ffff"} 
        emissive={hovered ? "#aa00ff" : "#0088ff"}
        emissiveIntensity={hovered ? 1.5 : 0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}

function NeuralConnection({ start, end, active }) {
  const ref = useRef();
  
  useFrame(() => {
    if (ref.current) {
      ref.current.material.opacity = active ? 0.7 + Math.sin(performance.now() / 200) * 0.3 : 0.3;
    }
  });

  return (
    <Line
      ref={ref}
      points={[start, end]}
      color={active ? "#ff00ff" : "#00ffff"}
      lineWidth={active ? 2 : 1}
      transparent
    />
  );
}

function DataParticle({ path, speed = 1 }) {
  const meshRef = useRef();
  const [progress, setProgress] = useState(0);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    
    // Move along the path
    setProgress((t * speed) % 1);
    
    // Calculate position along the path
    const x = path[0] + (path[3] - path[0]) * progress;
    const y = path[1] + (path[4] - path[1]) * progress;
    const z = path[2] + (path[5] - path[2]) * progress;
    
    meshRef.current.position.set(x, y, z);
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
    </mesh>
  );
}

function AIConceptLabel({ position, text, visible }) {
  return (
    <Text
      position={position}
      fontSize={0.15}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      transparent
      opacity={visible ? 1 : 0}
    >
      {text}
    </Text>
  );
}

function AIBrain() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [activeConcept, setActiveConcept] = useState(null);
  const [pulseTrigger, setPulseTrigger] = useState(0);
  
  // Generate neural network nodes
  const nodes = useMemo(() => {
    const nodeCount = 24;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.5;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      nodes.push({
        position: [x, y, z],
        connections: [], // Will be populated later
        concept: [
          "Machine Learning", "Neural Networks", "Deep Learning", 
          "Computer Vision", "NLP", "Reinforcement Learning",
          "Data Processing", "Pattern Recognition", "Predictive Analytics"
        ][Math.floor(Math.random() * 9)]
      });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
      // Connect to 2-4 other nodes
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      const possibleConnections = [...nodes];
      possibleConnections.splice(i, 1); // Remove self
      
      // Shuffle and take first connectionCount
      for (let j = possibleConnections.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [possibleConnections[j], possibleConnections[k]] = [possibleConnections[k], possibleConnections[j]];
      }
      
      nodes[i].connections = possibleConnections.slice(0, connectionCount);
    }
    
    return nodes;
  }, []);
  
  // Handle click on canvas to trigger pulse
  const handleCanvasClick = () => {
    setPulseTrigger(prev => prev + 1);
    setActiveConcept(null);
  };
  
  return (
    <Canvas 
      dpr={[1, 2]} 
      camera={{ position: [0, 0, 4], fov: 60 }}
      onClick={handleCanvasClick}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ffff" />
      <pointLight position={[-5, -5, 5]} intensity={1.2} color="#ff00ff" />
      <spotLight 
        position={[0, 0, 10]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      
      {/* Neural Core */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <NeuralCore />
        
        {/* Neural Nodes */}
        {nodes.map((node, index) => (
          <NeuralNode 
            key={index} 
            position={node.position} 
            connections={node.connections}
            onHover={(pos) => {
              setHoveredNode(pos);
              setActiveConcept(node.concept);
            }}
          />
        ))}
        
        {/* Neural Connections */}
        {nodes.map((node, index) => (
          node.connections.map((target, targetIndex) => {
            // Only render each connection once
            if (index < nodes.indexOf(target)) {
              return (
                <NeuralConnection 
                  key={`${index}-${targetIndex}`}
                  start={node.position}
                  end={target.position}
                  active={hoveredNode && (
                    hoveredNode[0] === node.position[0] && 
                    hoveredNode[1] === node.position[1] && 
                    hoveredNode[2] === node.position[2]
                  )}
                />
              );
            }
            return null;
          })
        ))}
        
        {/* Data Particles */}
        {nodes.slice(0, 8).map((node, index) => (
          <DataParticle 
            key={`particle-${index}`}
            path={[0, 0, 0, ...node.position]}
            speed={0.3 + index * 0.05}
          />
        ))}
        
        {/* AI Concept Labels */}
        {activeConcept && (
          <AIConceptLabel 
            position={[0, -2.5, 0]} 
            text={activeConcept} 
            visible={!!activeConcept} 
          />
        )}
      </Float>
      
      {/* Controls */}
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
}

// Social links data
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tharun-r1705/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com/tharun-r1705/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl gradient-text mb-6">
            Let's Build the Future Together
          </h2>
          <p className="font-exo text-xl text-cosmic-white/80 max-w-3xl mx-auto">
            Ready to collaborate on cutting-edge AI projects and innovative web solutions
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8 border border-electric-blue/20">
              <h3 className="font-orbitron font-bold text-2xl gradient-text mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center neon-glow">
                    <svg className="w-6 h-6 text-cosmic-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-exo font-medium text-cosmic-white">Email</p>
                    <p className="font-exo text-accent">tharunr1705@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-glow rounded-lg flex items-center justify-center neon-glow">
                    <svg className="w-6 h-6 text-space-dark" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-exo font-medium text-cosmic-white">Location</p>
                    <p className="font-exo text-accent">Erode, Tamilnadu, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="glass-card p-8 border border-vibrant-purple/20">
              <h3 className="font-orbitron font-bold text-xl gradient-text mb-6">
                Connect With Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-cosmic-white hover:bg-gradient-glow transition-all duration-300 hover-lift neon-glow"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* AI Brain Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            
            <div className="h-96 glass-card overflow-hidden relative group border border-electric-blue/30">
              <div className="absolute inset-0 bg-gradient-to-br from-space-dark/50 to-vibrant-purple/20 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-transparent to-vibrant-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-4 left-4 z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="flex items-center space-x-2 bg-space-dark/80 backdrop-blur-sm px-3 py-2 rounded-full border border-electric-blue/30 shadow-lg shadow-electric-blue/20"
                >
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                  <span className="text-xs font-exo text-neon-cyan">Click Here</span>
                </motion.div>
              </div>
              
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-center space-x-2 bg-space-dark/80 backdrop-blur-sm px-3 py-2 rounded-full border border-vibrant-purple/30 shadow-lg shadow-vibrant-purple/20"
                >
                  <div className="w-2 h-2 bg-vibrant-purple rounded-full animate-pulse" />
                  <span className="text-xs font-exo text-vibrant-purple">Interactive</span>
                </motion.div>
              </div>
              
              <AIBrain />
            </div>
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="font-exo text-lg text-cosmic-white/80 mb-6 max-w-2xl mx-auto">
            Whether you're looking to build AI-powered applications, need full-stack development expertise, 
            or want to discuss the future of technology, I'm here to help bring your vision to life.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="mailto:tharunr1705@gmail.com"
              className="inline-flex items-center space-x-2 bg-gradient-primary hover:bg-gradient-glow text-cosmic-white font-exo font-semibold px-8 py-4 rounded-full neon-glow transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Start a Conversation</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Neural Network Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Nodes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 2, delay: i * 0.15 }}
            className="absolute"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${15 + Math.floor(i / 4) * 70}%`,
            }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-electric-blue rounded-lg flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="w-3 h-3 bg-gradient-primary rounded-full"
                />
              </motion.div>
              
              {/* Connection lines to next nodes */}
              {i < 11 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1 + i * 0.15 }}
                  className="absolute top-1/2 left-8 w-16 h-px bg-gradient-to-r from-electric-blue to-transparent origin-left"
                >
                  <motion.div
                    animate={{ x: [0, 60, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className="w-2 h-2 bg-neon-cyan rounded-full -mt-1"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Floating AI Symbols */}
        {['🤖', '🧠', '⚡', '🔬', '💡', '🌐', '🔮', '🎯'].map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3], 
              y: [-20, -100, -20],
              x: [0, 50, 0] 
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              delay: i * 1.2,
              ease: "easeInOut" 
            }}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${8 + i * 12}%`,
              top: `${75 + (i % 2) * 15}%`,
            }}
          >
            {symbol}
          </motion.div>
        ))}
        
        {/* Data Stream Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.path
              key={`stream-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
              d={`M ${20 + i * 15} 10 Q ${50 + i * 10} ${30 + i * 15} ${80 + i * 5} ${60 + i * 10}`}
              stroke="url(#aiGradient)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5,5"
            />
          ))}
          <defs>
            <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--electric-blue))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--vibrant-purple))" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}