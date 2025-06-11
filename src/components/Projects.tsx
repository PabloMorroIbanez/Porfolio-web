import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tools: string[];
  link: string;
  case_study?: string;
  bgColor?: string; 
}

const projects: Project[] = [
  {
    id: 1,
    title: "GreenCare",
    description: "GreenCare fue diseñada para ayudar a usuarios a cuidar sus plantas con una interfaz clara, visual y calmada. La aplicación proporciona información esencial sobre el cuidado de plantas, incluyendo horarios de riego y alimentación adaptados a cada tipo de planta.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    tools: ["Figma", "Adobe XD", "Illustrator"],
    link: "#",
    case_study: "/projects/greencare",
    bgColor: "bg-green-100",
  },
  {
    id: 2,
    title: "App OPN",
    description: "Sistema completo de UI para videojuegos, con componentes modulares adaptables a diferentes géneros y plataformas. Diseñado para maximizar la inmersión del jugador sin sacrificar usabilidad.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tools: ["Figma", "Lovable", "Notion"],
    link: "/projects/appopn",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "FinTech App",
    description: "Aplicación financiera para jóvenes inversores que simplifica conceptos complejos mediante visualizaciones interactivas y una experiencia educativa integrada en el flujo principal.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    tools: ["Sketch", "Principle", "Zeplin"],
    link: "#",
    bgColor: "bg-yellow-100",
  },
];

const Projects: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectsSectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsSectionRef.current) return;
      const rect = projectsSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Empieza a encoger cuando la sección entra en viewport
      const start = windowHeight * 0.1;
      const end = windowHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (end - start)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Detect if section is in view
        if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
          setActiveIndex(idx);
          // Calcula el progreso de scroll dentro de la sección (0 a 1)
          const progress = Math.min(
            1,
            Math.max(0, (windowHeight * 0.5 - rect.top) / rect.height)
          );
          setScrollProgress(progress);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="projects"
      className="relative"
      ref={projectsSectionRef}
    >
      {projects.map((project, idx) => {
        const isActive = idx === activeIndex;

        return (
           <div
            key={project.id}
            ref={el => (sectionRefs.current[idx] = el)}
            className={`relative min-h-screen flex flex-col justify-center items-center transition-colors duration-500 ${project.bgColor}`}
            style={{ zIndex: isActive ? 20 : 1 }}
          >
            {/* Overlay y texto solo si la sección de proyectos es visible */}
            {isProjectsVisible && (
              <>
                {/* Texto grande y transparente */}
                <div
                  className="fixed inset-0 flex items-center justify-center pointer-events-none transition-all duration-500"
                  style={{
                    zIndex: 20,
                    transform: `scale(${1 - 0.7 * scrollProgress})`,
                    top: scrollProgress === 1 ? '10vh' : '0',
                    opacity: 1,
                    transition: 'transform 0.3s, opacity 0.3s',
                    fontWeight: 'bold',
                    fontSize: scrollProgress === 1 ? '3rem' : 'clamp(2rem, 16vw, 12rem)',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: 'transparent',
                    WebkitTextStroke: '2px #fff', // Opcional para dar borde blanco
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'white',
                    backgroundClip: 'text',
                  }}
                >
                  {project.title}
                </div>
              </>
            )}
            {/* Contenido revelado */}
            <div
              className={cn(
                "transition-all duration-500 w-full max-w-5xl mx-auto px-6",
                isActive && scrollProgress > 0.4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{
                zIndex: 30,
                marginTop: '60vh',
                pointerEvents: isActive && scrollProgress > 0.4 ? 'auto' : 'none',
              }}
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl md:text-3xl font-space font-medium">{project.title}</h4>
                  <p className="text-base md:text-lg text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="px-3 py-1 text-sm bg-gray-800 rounded-full">{tool}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/projects/${project.title.toLowerCase().replace(/\s+/g, '')}`}
                      className="inline-flex items-center px-6 py-2 bg-brand-blue rounded-full text-white hover:bg-brand-blue/90 transition-colors"
                      aria-label={`Ver caso de estudio de ${project.title}`}
                    >
                      Caso de estudio
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Projects;
