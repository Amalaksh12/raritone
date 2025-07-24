import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.02;
        containerRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Sophisticated Butterfly Wings - Positioned Higher */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(-120px)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '140vw',
            height: '100vh',
            opacity: 0.9,
            filter: 'drop-shadow(0 0 60px rgba(167, 203, 184, 0.4))',
          }}
          animate={{ 
            scale: [1, 1.02, 1],
            y: [0, -6, 0],
            rotateZ: [0, 0.3, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        >
          {/* Enhanced Butterfly SVG with Tech Patterns */}
          <svg
            viewBox="0 0 1400 900"
            className="w-full h-full"
            style={{ filter: 'brightness(1.1) contrast(1.05)' }}
          >
            {/* Butterfly Body - Sharp Vector Style */}
            <motion.ellipse
              cx="700"
              cy="450"
              rx="14"
              ry="200"
              fill="#083C30"
              style={{ 
                filter: 'drop-shadow(0 0 30px rgba(8, 60, 48, 0.6))',
                transformOrigin: '700px 450px'
              }}
            />
            
            {/* Body Segments - Vector Style */}
            <ellipse cx="700" cy="370" rx="10" ry="18" fill="#083C30" opacity="0.9" />
            <ellipse cx="700" cy="410" rx="12" ry="25" fill="#083C30" />
            <ellipse cx="700" cy="460" rx="11" ry="22" fill="#083C30" opacity="0.9" />
            <ellipse cx="700" cy="510" rx="9" ry="18" fill="#083C30" opacity="0.8" />
            <ellipse cx="700" cy="550" rx="7" ry="15" fill="#083C30" opacity="0.7" />
            
            {/* LEFT UPPER WING - Mint Green with Tech Patterns */}
            <motion.path
              d="M700 360 Q460 160 200 220 Q60 280 90 420 Q120 560 230 600 Q370 640 550 590 Q650 540 700 450"
              fill="rgba(167, 203, 184, 0.8)"
              stroke="#083C30"
              strokeWidth="3"
              style={{ 
                filter: 'drop-shadow(0 0 40px rgba(167, 203, 184, 0.7))',
                transformOrigin: '700px 360px'
              }}
              animate={{
                rotateZ: [0, -2, 0],
                scaleY: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* RIGHT UPPER WING - Mint Green with Tech Patterns */}
            <motion.path
              d="M700 360 Q940 160 1200 220 Q1340 280 1310 420 Q1280 560 1170 600 Q1030 640 850 590 Q750 540 700 450"
              fill="rgba(167, 203, 184, 0.8)"
              stroke="#083C30"
              strokeWidth="3"
              style={{ 
                filter: 'drop-shadow(0 0 40px rgba(167, 203, 184, 0.7))',
                transformOrigin: '700px 360px'
              }}
              animate={{
                rotateZ: [0, 2, 0],
                scaleY: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* LEFT LOWER WING - Darker Accent */}
            <motion.path
              d="M700 490 Q550 590 400 630 Q300 670 280 730 Q290 790 350 780 Q420 760 530 710 Q610 660 700 590"
              fill="rgba(8, 60, 48, 0.7)"
              stroke="#083C30"
              strokeWidth="3"
              style={{ 
                filter: 'drop-shadow(0 0 35px rgba(8, 60, 48, 0.6))',
                transformOrigin: '700px 490px'
              }}
              animate={{
                rotateZ: [0, -1.5, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
            
            {/* RIGHT LOWER WING - Darker Accent */}
            <motion.path
              d="M700 490 Q850 590 1000 630 Q1100 670 1120 730 Q1110 790 1050 780 Q980 760 870 710 Q790 660 700 590"
              fill="rgba(8, 60, 48, 0.7)"
              stroke="#083C30"
              strokeWidth="3"
              style={{ 
                filter: 'drop-shadow(0 0 35px rgba(8, 60, 48, 0.6))',
                transformOrigin: '700px 490px'
              }}
              animate={{
                rotateZ: [0, 1.5, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 1.5
              }}
            />

            {/* Tech Pattern Lines in Wings */}
            <motion.g opacity="0.6">
              {/* Left wing tech patterns */}
              <path
                d="M500 320 Q400 340 350 380 M480 360 Q380 380 330 420 M460 400 Q360 420 310 460"
                stroke="#083C30"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M900 320 Q1000 340 1050 380 M920 360 Q1020 380 1070 420 M940 400 Q1040 420 1090 460"
                stroke="#083C30"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
            </motion.g>

            {/* Wing Accent Spots - Tech Style */}
            <motion.circle
              cx="420" cy="380" r="25"
              fill="rgba(8, 60, 48, 0.6)"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            <motion.circle
              cx="980" cy="380" r="25"
              fill="rgba(8, 60, 48, 0.6)"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Enhanced Antennae - Vector Style */}
            <motion.path
              d="M685 340 Q675 315 665 290 Q660 275 655 260"
              stroke="#083C30"
              strokeWidth="4"
              fill="none"
              animate={{ rotate: [0, 2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M715 340 Q725 315 735 290 Q740 275 745 260"
              stroke="#083C30"
              strokeWidth="4"
              fill="none"
              animate={{ rotate: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips */}
            <circle cx="655" cy="260" r="6" fill="#083C30" />
            <circle cx="745" cy="260" r="6" fill="#083C30" />

            {/* Tech Particles in Wings */}
            <motion.g>
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={300 + (i * 80)}
                  cy={350 + (i % 3) * 40}
                  r="3"
                  fill="rgba(167, 203, 184, 0.8)"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    y: [0, -15, 0]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6 + (i * 0.3),
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Tech Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + (i * 4)}%`,
              top: `${20 + (i * 3)}%`,
              background: 'rgba(167, 203, 184, 0.7)',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 20px rgba(167, 203, 184, 0.8)'
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.6, 1.4, 0.6]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + (i * 0.4),
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Radial Background Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 35%, rgba(167, 203, 184, 0.15) 0%, rgba(8, 60, 48, 0.08) 40%, transparent 70%)',
          mixBlendMode: 'multiply'
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.03, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;