
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tools: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Immersive Game UI",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tools: ["Figma", "Framer", "Unity"],
    link: "#",
  },
  {
    id: 2,
    title: "Fintech Mobile App",
    description: "Maecenas egestas arcu quis ligula mattis placerat. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Vestibulum volutpat pretium libero.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    tools: ["Sketch", "Adobe XD", "Zeplin"],
    link: "#",
  },
  {
    id: 3,
    title: "E-commerce Experience",
    description: "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    tools: ["Figma", "Photoshop", "Illustrator"],
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
          Projects
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
                  
                  <a 
                    href={project.link}
                    className="inline-flex items-center px-6 py-2 mt-4 border-2 border-white rounded-full text-white hover:bg-white hover:text-black transition-colors"
                    aria-label={`View more about ${project.title}`}
                  >
                    View More
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
                  </a>
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
