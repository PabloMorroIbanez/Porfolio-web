import React from "react";
import { cn } from "@/lib/utils";
import TypewriterText from "./ui/typewriter-text";

interface HeroProps {
  scrollProgress: number; // valor entre 0 y 1
}

// Cambia los colores directos por clases y CSS variables
const Hero: React.FC<HeroProps> = ({scrollProgress}) => (
  <section
    id="home"
    className="fixed inset-0 flex flex-col items-center justify-center bg-background px-6 z-30"
    style={{
      opacity: scrollProgress < 1 ? 1 : 0,
      pointerEvents: scrollProgress < 0.99 ? "auto" : "none",
      willChange: "transform, opacity",
      transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)",
    }}
  >
    {/* SVG líneas arriba izquierda */}
    <div 
      className="absolute top-0 left-0 z-0 pointer-events-none"
      style={{
        transform: `translateX(${-scrollProgress * 100}vw)`,
        opacity: 1 - scrollProgress,
        transition: "transform 0.4s, opacity 0.4s",
      }}
    >
      <svg width="420" height="320" viewBox="0 0 420 320" fill="none">
        {[...Array(10)].map((_, i) => (
          <path
            key={i}
            d={`
              M0,${40 + i * 18}
              Q120,${10 + i * 12} 240,${60 + i * 20}
              T420,${40 + i * 18}
            `}
            stroke="var(--brand-cyan, #00E6FB)" // Usa variable CSS
            strokeWidth="1"
            fill="none"
            opacity={0.18 + i * 0.03}
          />
        ))}
      </svg>
    </div>

    {/* SVG líneas abajo derecha */}
    <div className="absolute bottom-0 right-0 z-0 pointer-events-none"
      style={{
        transform: `translateX(${scrollProgress * 100}vw)`,
        opacity: 1 - scrollProgress,
        transition: "transform 0.4s, opacity 0.4s",
      }}
      >
      <svg width="480" height="340" viewBox="0 0 480 340" fill="none">
        {[...Array(10)].map((_, i) => (
          <path
            key={i}
            d={`
              M0,${300 - i * 18}
              Q240,${320 - i * 20} 480,${320 - i * 18}
            `}
            stroke="var(--brand-cyan, #00E6FB)"
            strokeWidth="1"
            fill="none"
            opacity={0.18 + i * 0.03}
          />
        ))}
      </svg>
    </div>

    {/* Nombre centrado arriba */}
    <div 
      className="w-full flex flex-col items-center justify-center mt-6 z-30"
      style={{
        transform: `translateY(${-scrollProgress * 40}px)`,
        opacity: 1 - scrollProgress,
        transition: "transform 0.4s, opacity 0.4s",
      }}
    >
      <span
        id="hero-title"
        className="text-2xl md:text-3xltracking-widest  font-space font-thin uppercase text-brand-white"
        style={{
          letterSpacing: "0.18em",
        }}
      >
        Pablo Morro Ibáñez
      </span>
      {/* Subtítulo estilo sección About */}
      <div className="mb-4 text-xs tracking-widest flex items-center justify-center font-space text-brand-blue font-thin uppercase gap-4 mt-2">
        <span className="block w-8 h-px bg-border" />
        <span>User-Centered UX/UI Designer</span>
        <span className="block w-8 h-px bg-border" />
      </div>
    </div>

    {/* Grid principal */}
    <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 z-30 pb-24">
      {/* Título principal izquierda */}
      <div 
        className="flex-1 flex flex-col items-start justify-center md:pl-24"
        style={{
          transform: `translateX(${-scrollProgress * 100}vw)`,
          opacity: 1 - scrollProgress,
          transition: "transform 0.4s, opacity 0.4s",
        }}
      >
        <h1
          className={cn(
            "text-5xl md:text-8xl font-space font-medium tracking-tight",
            "text-brand-white"
          )}
          style={{
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          Designing experiences that connect people with {""}
          <TypewriterText />
        </h1>
      </div>
    </div>
  </section>
);


export default Hero;