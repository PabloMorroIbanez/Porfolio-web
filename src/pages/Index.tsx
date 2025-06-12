
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
  const [progress, setProgress] = useState(0);

  // Update progress based on scroll position between Hero and About sections
  useEffect(() => {
    const handleScroll = () => {
      if (!heroSpacerRef.current || !aboutRef.current) return;
      const spacerRect = heroSpacerRef.current.getBoundingClientRect();
      const aboutRect = aboutRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progreso entre el final del spacer y el inicio de About
      if (spacerRect.bottom > 0 && aboutRect.top < windowHeight) {
        const p = 1 - Math.max(0, Math.min(1, aboutRect.top / windowHeight));
        setProgress(p);
      } else if (spacerRect.bottom <= 0) {
        setProgress(1);
      } else {
        setProgress(0);
      }
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
        <div ref={heroSpacerRef} data-about-spacer style={{ height: '100vh' }} />
        <Hero scrollProgress={progress} />
        {/* Spacer para About */}
        <div ref={aboutRef} style={{ height: '100vh' }} />
        <About scrollProgress={progress} />
        {/*<Projects />
        <Contact />*/}
      </main>
    </div>
  );
};

export default Index;
