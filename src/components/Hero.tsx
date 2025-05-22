
import React, { useEffect, useRef } from 'react';
import MagneticText from './MagneticText';
import { cn } from '@/lib/utils';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div className="max-w-5xl mx-auto text-center z-10">
        <h1 
          ref={headingRef}
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight transition-all duration-700 text-gray-900",
            "opacity-0 translate-y-10"
          )}
        >
          <MagneticText 
            text="Diseñando experiencias que conectan personas con tecnología." 
            strength={20}
          />
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-gray-700 animate-fade-in opacity-0" style={{ animationDelay: '300ms' }}>
          Diseñador UX/UI especializado en prototipado y experiencia de usuario.
        </p>
        
        <a
          href="#projects"
          className="mt-12 inline-flex items-center px-8 py-3 bg-brand-blue text-white rounded-full font-medium transition-all hover:bg-brand-blue/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 animate-fade-in opacity-0"
          style={{ animationDelay: '600ms' }}
          aria-label="Explorar mis proyectos"
        >
          Explora mis proyectos
          <svg 
            className="ml-2 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-light opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-brand-light opacity-20 blur-3xl"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-gray-500 mb-2">Scroll</span>
        <svg 
          className="w-6 h-6 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
