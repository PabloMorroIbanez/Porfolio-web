import React from 'react';

interface AboutProps {
  scrollProgress: number; // valor entre 0 y 1
  maxWidth?: number;
}

const About: React.FC<AboutProps> = ({ scrollProgress, maxWidth }) => {
  // Limita el progress para About entre 0 y 1
  const aboutProgress = Math.min(scrollProgress, 1);
  // Calcula cuánto debe subir el telón (solo cuando scrollProgress > 1)
  const revealProgress = Math.max(0, scrollProgress - 1);

  return (
    <section
      id="about"
      className="fixed inset-0 flex flex-col items-center justify-center bg-background z-40"
      style={{
        // Escala y centra mientras aboutProgress < 1
        // Cuando revealProgress > 0, empieza a subir el telón
        transform: `
          scale(${0.5 + Math.min(aboutProgress, 1) * 0.5})
          translateY(-${Math.max(0, scrollProgress - 1) * 100}vh)
        `,
        opacity: Math.min(1, Math.max(0, aboutProgress * 1.5)),
        transition: "transform 0.7s cubic-bezier(.4,0,.2,1), opacity 0.5s cubic-bezier(.4,0,.2,1)",
        willChange: "transform, opacity",
        pointerEvents: aboutProgress > 0.01 ? "auto" : "none",
      }}
    >
    <div className="w-full text-center px-4 py-12"
    style={{ maxWidth: `${maxWidth}px` }}
    >
      <div className="mb-8 tracking-widest text-xs font-space text-brand-blue font-thin uppercase flex items-center justify-center gap-4">
        <span className="block w-8 h-px bg-border" />
        <span>A B O U T &nbsp; M E</span>
        <span className="block w-8 h-px bg-border" />
      </div>
      <h2 className="text-4xl md:text-5xl font-space font-medium mb-8 tracking-tight font-space text-brand-white max-w-2xl mx-auto">
        I simplify the digital world
      </h2>
      <p className="text-lg text-foreground mb-10 max-w-2xl mx-auto text-muted-foreground font-sans">
        I create clear and functional digital solutions, always looking for maximum excellence and simplicity. <br/> <br/> My experience allows me to find the perfect balance between creativity, usability and results for each client.
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
};

export default About;