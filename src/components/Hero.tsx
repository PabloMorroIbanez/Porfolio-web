import React from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  scrollProgress: number; // valor entre 0 y 1
}

// Cambia los colores directos por clases y CSS variables
const Hero: React.FC<HeroProps> = ({scrollProgress}) => (
  <section
    id="home"
    className="fixed inset-0 flex flex-col items-center justify-center bg-background px-6 z-30"
    style={{
      pointerEvents: scrollProgress < 0.99 ? "auto" : "none",
      willChange: "transform, opacity",
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
      className="w-full flex flex-col items-center justify-center mt-6 z-10"
      style={{
        transform: `translateY(${-scrollProgress * 40}px)`,
        opacity: 1 - scrollProgress,
        transition: "transform 0.4s, opacity 0.4s",
      }}
    >
      <span
        className="text-2xl md:text-3xl font-thin tracking-widest uppercase text-brand-white"
        style={{
          letterSpacing: "0.18em",
        }}
      >
        Pablo Morro Ibáñez
      </span>
      {/* Subtítulo estilo sección About */}
      <div className="mb-4 tracking-widest text-xs text-brand-blue flex items-center justify-center gap-4 mt-2">
        <span className="block w-8 h-px bg-border" />
        <span>User-Centered UX/UI Designer</span>
        <span className="block w-8 h-px bg-border" />
      </div>
    </div>

    {/* Grid principal */}
    <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 z-10">
      {/* CTA izquierda */}
      <div 
        className="flex-1 flex flex-col items-start justify-center md:pl-24 mt-16 md:mt-0"
        style={{
          transform: `translateX(${-scrollProgress * 100}vw)`,
          opacity: 1 - scrollProgress,
          transition: "transform 0.4s, opacity 0.4s",
        }}
        >
        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight",
            "text-brand-white mb-8"
          )}
          style={{
            letterSpacing: "0.01em",
            lineHeight: 1.1,
            maxWidth: 520,
          }}
        >
          Diseñando experiencias <br /> que conectan personas <br /> con tecnología.
        </h1>
      </div>
      {/* Párrafo derecha */}
      <div 
        className="flex-1 flex flex-col items-end justify-end md:pr-24 mb-12 md:mb-0"
        style={{
          transform: `translateX(${scrollProgress * 100}vw)`,
          opacity: 1 - scrollProgress,
          transition: "transform 0.4s, opacity 0.4s",
        }}
        >
        <p
          className="text-base md:text-lg text-muted-foreground max-w-xs text-right"
          style={{
            letterSpacing: "0.01em",
          }}
        >
          UX/UI Designer especializado en prototipado y experiencia de usuario. Arquitectura digital, lujo y precisión en cada detalle.
        </p>
      </div>
    </div>
  </section>
);

// ...existing code...

export default Hero;