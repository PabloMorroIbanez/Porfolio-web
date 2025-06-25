
import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const heroSpacerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [projectsProgress, setProjectsProgress] = useState(0);

  // Update progress based on scroll position between Hero and About sections
  useEffect(() => {
  const handleScroll = () => {
    if (!heroSpacerRef.current || !aboutRef.current || !projectsRef.current) return;

    const heroTop = heroSpacerRef.current.getBoundingClientRect().top;
    const aboutTop = aboutRef.current.getBoundingClientRect().top;
    const projectsTop = projectsRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // --- About scrollProgress: 0 (empieza About) -> 1 (About centrado) -> 2 (About fuera, Projects revelado) ---
    // Calcula el rango total entre el inicio de About y el inicio de Projects
    const aboutSectionHeight = projectsTop - aboutTop;
    let aboutProgress = 0;

    if (aboutTop <= windowHeight && projectsTop > windowHeight) {
      // Fase 1: About aparece y se escala (0 -> 1)
      aboutProgress = 1 - Math.max(0, Math.min(1, aboutTop / windowHeight));
    } else if (projectsTop <= windowHeight) {
      // Fase 2: About sube como telón (1 -> 2)
      const reveal = 1 - Math.max(0, Math.min(1, (projectsTop - windowHeight) / windowHeight));
      aboutProgress = 1 + reveal;
    } else {
      // Antes de About
      aboutProgress = 0;
    }

    setProgress(aboutProgress);

    // --- Projects scrollProgress: 0 (oculto) -> 1 (completamente revelado) ---
    let projectsProgress = 0;
    if (projectsTop < windowHeight * 2) {
      projectsProgress = 1 - Math.max(0, Math.min(1, (projectsTop - windowHeight) / windowHeight));
    }
    setProjectsProgress(projectsProgress);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id!);
        if (element) {
          e.preventDefault();
          const yOffset = -80; // Account for fixed header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px 0px',
      }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // Apply styles or classes for reduced motion
      document.documentElement.classList.add('reduced-motion');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Spacer para Hero */}
        <div ref={heroSpacerRef} data-about-spacer style={{ height: '100vh' } } />
        <Hero scrollProgress={progress} />
        {/* Spacer para About */}
        <div ref={aboutRef} style={{ height: '150vh' }}/>
        <About scrollProgress={progress} maxWidth={550} />
        {/* Spacer para Projects */}
        <div ref={projectsRef} style={{ height: '100vh' }}/>
        <Projects scrollProgress={projectsProgress} />
      </main>
    </div>
  );
};

export default Index;
