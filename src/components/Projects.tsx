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
  },
  {
    id: 2,
    title: "Game UI Suite",
    description: "Sistema completo de UI para videojuegos, con componentes modulares adaptables a diferentes géneros y plataformas. Diseñado para maximizar la inmersión del jugador sin sacrificar usabilidad.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tools: ["Figma", "Framer", "Unity"],
    link: "#",
  },
  {
    id: 3,
    title: "FinTech App",
    description: "Aplicación financiera para jóvenes inversores que simplifica conceptos complejos mediante visualizaciones interactivas y una experiencia educativa integrada en el flujo principal.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    tools: ["Sketch", "Principle", "Zeplin"],
    link: "#",
  },
];

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      projectRefs.current.forEach((projectRef, index) => {
        if (!projectRef) return;

        const rect = projectRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // When project section is in view
        if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
          setActiveProject(index);
          
          // Add visible class to content
          if (contentRefs.current[index]) {
            contentRefs.current[index]?.classList.add('visible');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="projects" className="bg-black text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-space font-semibold mb-16 tracking-tight">
          Proyectos
        </h2>
        
        {projects.map((project, index) => (
          <div 
            key={project.id}
            ref={el => projectRefs.current[index] = el}
            className="project-section min-h-screen py-20 md:py-32"
          >
            {/* Full-screen title that shrinks on scroll */}
            <div 
              ref={el => titleRefs.current[index] = el}
              className={cn(
                "sticky top-0 h-screen flex items-center justify-center transition-all duration-700",
                index === activeProject ? "opacity-100" : "opacity-0"
              )}
            >
              <h3 className="text-4xl md:text-6xl lg:text-8xl font-space font-bold text-white project-title">
                {project.title}
              </h3>
            </div>
            
            {/* Project content that appears as you scroll */}
            <div 
              ref={el => contentRefs.current[index] = el}
              className="project-content mt-[-40vh] md:mt-[-30vh] relative z-10"
            >
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    width="800"
                    height="600"
                  />
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-2xl md:text-3xl font-space font-medium">{project.title}</h4>
                  
                  <p className="text-base md:text-lg text-gray-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span 
                        key={tool} 
                        className="px-3 py-1 text-sm bg-gray-800 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to={project.link}
                      className="inline-flex items-center px-6 py-2 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition-colors"
                      aria-label={`Ver más sobre ${project.title}`}
                    >
                      Ver prototipo
                      <svg 
                        className="ml-2 w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                    
                    {project.case_study && (
                      <Link 
                        to={project.case_study}
                        className="inline-flex items-center px-6 py-2 bg-brand-blue rounded-full text-white hover:bg-brand-blue/90 transition-colors"
                        aria-label={`Ver caso de estudio de ${project.title}`}
                      >
                        Caso de estudio
                        <svg 
                          className="ml-2 w-5 h-5" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
