
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when clicking a link on mobile
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-16",
        isScrolled 
          ? "py-4 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm" 
          : "py-6 bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <a 
          href="#" 
          className="text-xl font-space font-bold"
          aria-label="Home"
        >
          Pablo Morro.
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-10">
          {[
            { name: "Home", href: "#home" },
            { name: "Sobre mí", href: "#about" },
            { name: "Proyectos", href: "#projects" },
            { name: "Contacto", href: "#contact" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="group relative py-2 text-base tracking-wide transition-colors hover:text-brand-blue"
                aria-label={`Ir a la sección ${item.name}`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button
          className="flex md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>
      
      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white dark:bg-black z-40 flex flex-col justify-center items-center transition-transform duration-300 transform md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col items-center space-y-8 text-2xl">
          {[
            { name: "Home", href: "#home" },
            { name: "Sobre mí", href: "#about" },
            { name: "Proyectos", href: "#projects" },
            { name: "Contacto", href: "#contact" },
          ].map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="hover:text-brand-blue transition-colors duration-300"
                onClick={handleNavLinkClick}
                aria-label={`Ir a la sección ${item.name}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navigation;
