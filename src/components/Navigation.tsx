import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Número de secciones (incluyendo Hero, About, Projects, etc.)
  const SECTION_COUNT = 3; // Actualiza según tus secciones

  const scrollToSection = (sectionIndex: number) => {
    // Calcula la altura total scrollable de la página
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    // Calcula el scrollTop para el inicio de la sección deseada
    const top = (scrollHeight / (SECTION_COUNT - 1)) * sectionIndex;
    window.scrollTo({ top, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinkClass ="text-4xl md:text-6xl font-thin text-brand-white hover:text-[hsl(var(--brand-blue))] transition-colors duration-300";
  const navLinkStyle = { letterSpacing: "0.04em" };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] px-6 lg:px-16 py-10"
        )}
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Usa tu icono hamburger-menu */}
          <button
            className={cn("hamburger-menu ml-auto", isMenuOpen && "open")}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="fullscreen-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* Menú fullscreen */}
      <div
        id="fullscreen-menu"
        className={cn(
          "fixed inset-0 z-[50] bg-background transition-all duration-500 flex flex-col items-center justify-center",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isMenuOpen}
        style={{
          transitionProperty: "opacity, transform",
        }}
      >

        {/* Navegación centrada */}
        <ul className="flex flex-col items-center justify-center gap-12 md:gap-16">
        <li>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              scrollToSection(0); // Hero
            }}
            className={navLinkClass}
            style={navLinkStyle}
            aria-label="Ir a la sección Home"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              scrollToSection(1); // About
            }}                     
            className={navLinkClass}
            style={navLinkStyle}
            aria-label="Ir a la sección About me"
          >
            About me
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              scrollToSection(2); // Projects (ejemplo)
            }}
            className={navLinkClass}
            style={navLinkStyle}
            aria-label="Ir a la sección Projects"
          >
            Projects
          </a>
        </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;