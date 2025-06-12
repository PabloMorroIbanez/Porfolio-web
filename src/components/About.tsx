import React from 'react';

interface AboutProps {
  scrollProgress: number; // valor entre 0 y 1
}

const About: React.FC<AboutProps> = ({ scrollProgress }) => (
  <section
    id="about"
    className="fixed inset-0 flex flex-col items-center justify-center bg-background z-40"
    style={{
      transform: `scale(${0.5 + scrollProgress * 0.5})`,
      opacity: Math.min(1, Math.max(0, scrollProgress * 1.5)),
      transition: "transform 0.5s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)",
      willChange: "transform, opacity",
      pointerEvents: scrollProgress > 0.01 ? "auto" : "none",
    }}
  >
    <div className="w-full text-center px-4 py-12">
      <div className="mb-8 tracking-widest text-xs text-brand-blue flex items-center justify-center gap-4">
        <span className="block w-8 h-px bg-border" />
        <span>A B O U T &nbsp; M E</span>
        <span className="block w-8 h-px bg-border" />
      </div>
      <h2 className="text-4xl md:text-5xl font-space font-medium mb-8 tracking-tight text-brand-white max-w-2xl mx-auto">
        Simplifico el mundo digital
      </h2>
      <p className="text-lg text-foreground mb-10 max-w-2xl mx-auto text-muted-foreground">
        Creo soluciones digitales claras y funcionales, siempre buscando la máxima excelencia y sencillez. Mi experiencia me permite encontrar el equilibrio perfecto entre creatividad, usabilidad y resultados para cada cliente.
      </p>
      <a
        href="#projects"
        className="inline-block px-8 py-3 border-2 border-brand-blue text-brand-blue text-lg font-semibold rounded-full hover:bg-brand-blue hover:text-background transition-colors"
      >
        More about me
      </a>
    </div>
  </section>
);

export default About;