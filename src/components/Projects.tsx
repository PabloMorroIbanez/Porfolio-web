import React, { useRef, useState } from 'react';
import CursorReveal from "./ui/cursorreveal";
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  image: string;
  hoverImage: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "OPN CMS",
    image: "/Images/OldCMS_todoslostest.png",
    hoverImage: "/Images/NewCMS_todoslostest.png",
  }
];

interface ProjectsProps {
  scrollProgress: number;
}

const Projects: React.FC<ProjectsProps> = ({ scrollProgress }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((m) => ({ ...m, inside: false }));
  };

  return (
  <section
    id="projects"
    className="fixed inset-0 flex items-center justify-center bg-background z-20"
  >
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full group overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: "none" }}
    >
      {/* Imagen inferior (hover) */}
      <img
        src={projects[0].hoverImage}
        alt={projects[0].title + " nuevo"}
        className="w-full h-full object-cover absolute inset-0"
        style={{ pointerEvents: "none" }}
        draggable={false}
      />
      {/* Imagen superior (normal) */}
      <img
        src={projects[0].image}
        alt={projects[0].title + " antiguo"}
        className="w-full h-full object-cover absolute inset-0"
        style={{
          maskImage: mouse.inside
            ? `radial-gradient(circle 120px at ${mouse.x}px ${mouse.y}px, transparent 0 100px, black 120px)`
            : "none",
          WebkitMaskImage: mouse.inside
            ? `radial-gradient(circle 120px at ${mouse.x}px ${mouse.y}px, transparent 0 100px, black 120px)`
            : "none",
          transition: "mask-image 0.2s, -webkit-mask-image 0.2s",
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* Cursor personalizado */}
      <CursorReveal
        x={mouse.x}
        y={mouse.y}
        visible={mouse.inside}
        diameter={240}
        text="Go to the project"
      />

      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
    <h2 className="relative z-10 text-7xl md:text-9xl font-space font-medium text-white text-center pointer-events-none">
      {projects[0].title}
    </h2>
  </section>
  );
};

export default Projects;