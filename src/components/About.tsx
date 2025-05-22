
import React, { useEffect, useRef } from 'react';

const skills = [
  { name: "Figma", icon: "🎨" },
  { name: "Framer", icon: "⚡" },
  { name: "Sketch", icon: "✏️" },
  { name: "Adobe XD", icon: "🎭" },
  { name: "Photoshop", icon: "🖼️" },
  { name: "Unity", icon: "🎮" },
  { name: "Blender", icon: "🧊" },
  { name: "Notion", icon: "📝" }
];

const timelineItems = [
  {
    year: "2021-Actual",
    title: "UX/UI Designer Senior",
    company: "Innovate Design Studio",
    description: "Liderando equipos de diseño para crear experiencias digitales centradas en el usuario."
  },
  {
    year: "2018-2021",
    title: "Game UI Designer",
    company: "GameCraft Studios",
    description: "Diseño de interfaces para videojuegos móviles y de consola, optimizando la experiencia de juego."
  },
  {
    year: "2015-2018",
    title: "UI Designer",
    company: "TechVision",
    description: "Creación de interfaces visuales para aplicaciones web y móviles."
  }
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px 0px',
      }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 md:py-32 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-space font-semibold mb-16 tracking-tight text-brand-blue">
          Sobre mí
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column - Bio text */}
          <div 
            ref={el => elementsRef.current[0] = el}
            className="opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-800">
                Soy Pablo Morro Ibáñez, diseñador UX/UI con más de 7 años de experiencia creando experiencias 
                digitales centradas en el usuario, con un enfoque especial en el prototipado y testing.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-800">
                Mi background en diseño de videojuegos y modelado 3D me permite aportar una visión única 
                sobre interactividad y espacios digitales, creando interfaces intuitivas pero memorables.
              </p>
              
              <h3 className="text-xl font-space font-medium mt-10 mb-3 text-brand-blue">Filosofía de Diseño</h3>
              
              <p className="text-lg leading-relaxed text-gray-800">
                Mi enfoque se basa en entender profundamente las necesidades del usuario final. Creo que el mejor 
                diseño es aquel que resuelve problemas reales de forma elegante, accesible y memorable.
              </p>
            </div>

            {/* Timeline */}
            <div 
              ref={timelineRef}
              className="mt-12 opacity-0 translate-y-10 transition-all duration-700 delay-300"
            >
              <h3 className="text-xl font-space font-medium mb-6 text-brand-blue">Experiencia</h3>
              
              <div className="timeline-container">
                {timelineItems.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="text-sm text-brand-blue font-medium">{item.year}</div>
                    <div className="mt-1 font-space font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.company}</div>
                    <div className="mt-2 text-gray-700">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Image and Skills */}
          <div 
            ref={el => elementsRef.current[1] = el}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="mb-10 aspect-square w-3/4 mx-auto md:w-auto md:h-auto overflow-hidden rounded-2xl bg-gray-100">
              {/* Designer portrait image */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Pablo Morro Ibáñez - UX/UI Designer" 
                className="w-full h-full object-cover"
                width="400"
                height="400"
              />
            </div>
            
            <h3 className="text-xl font-space font-medium mb-6 mt-8 text-brand-blue">Skills & Herramientas</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="group flex flex-col items-center p-4 rounded-lg transition-all hover:bg-brand-light hover:scale-105"
                >
                  <span className="text-3xl mb-2" aria-hidden="true">{skill.icon}</span>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
