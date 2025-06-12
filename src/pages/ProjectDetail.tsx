
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Sample project data
const projectDetails = {
  greencare: {
    title: "GreenCare - Plant Care App",
    heroImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    overview: "GreenCare es una aplicación móvil diseñada para ayudar a los usuarios a cuidar sus plantas con una interfaz clara, visual y calmada.",
    problem: "Muchos entusiastas de las plantas tienen dificultades para recordar los horarios de riego y cuidados específicos para cada tipo de planta, lo que resulta en plantas descuidadas o cuidados incorrectos.",
    solution: "Diseñamos una aplicación simple pero completa que proporciona información esencial sobre el cuidado de plantas, incluyendo horarios de riego y alimentación adaptados a cada tipo de planta.",
    processSteps: [
      {
        title: "Investigación",
        description: "Realizamos entrevistas con usuarios y estudios de mercado para entender las necesidades de los propietarios de plantas.",
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f","https://images.unsplash.com/photo-1531297484001-80022131f5a1"],
        multi_image: true
      },
      {
        title: "Wireframes",
        description: "Desarrollamos wireframes de baja fidelidad para establecer la estructura y flujo de la aplicación.",
        images: ["https://images.unsplash.com/photo-1531297484001-80022131f5a1"]
      },
      {
        title: "UI Design",
        description: "Creamos una interfaz visual limpia con fondos claros, acentos verdes y una tipografía legible para garantizar una experiencia de usuario calmada y agradable.",
        images: ["https://images.unsplash.com/photo-1483058712412-4245e9b90334"]
      }
    ],
    results: "La aplicación GreenCare ha recibido una respuesta positiva de los usuarios, con comentarios destacando su facilidad de uso, diseño visual atractivo y utilidad para el cuidado de plantas.",
    technologies: ["Figma", "Adobe XD", "After Effects", "Illustrator"],
    gallery: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ]
  },
  appopn: {
    title: "App OPN",
    heroImage: "URL_DE_LA_IMAGEN",
    overview: "Descripción general de App OPN.",
    problem: "Problema que resuelve App OPN.",
    solution: "Solución que aporta App OPN.",
    processSteps: [
      {
        title: "Investigación",
        description: "Descripción del proceso de investigación.",
        images: ["URL_IMAGEN_1", "URL_IMAGEN_2"],
        multi_image: true
      },
      // ...otros pasos...
    ],
    results: "Resultados del proyecto App OPN.",
    technologies: ["Figma", "React", "Node.js"],
    gallery: [
      "URL_IMAGEN_1",
      "URL_IMAGEN_2"
    ]
  }
};

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const project = projectId && projectDetails[projectId as keyof typeof projectDetails];
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}, [project]);
    
  useEffect(() => {
    if (!project) return;
    
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

    const refsSnapshot = [...sectionRefs.current];

    refsSnapshot.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      refsSnapshot.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
    
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Proyecto no encontrado</p>
      </div>
    );
  }

  


  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero section */}
        <section className="w-full h-[60vh] bg-gray-100 relative overflow-hidden">
          <img 
            src={project.heroImage} 
            alt={project.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="max-w-7xl mx-auto px-6 py-12 w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-space font-bold text-white mb-4">
                {project.title}
              </h1>
            </div>
          </div>
        </section>
        
        {/* Overview section */}
        <section className="py-16 px-6">
          <div 
            ref={el => sectionRefs.current[0] = el}
            className="max-w-3xl mx-auto opacity-0 translate-y-10 transition-all duration-700"
          >
            <h2 className="text-2xl md:text-3xl font-space font-semibold mb-8 text-brand-blue">
              Resumen del proyecto
            </h2>
            <p className="text-xl leading-relaxed text-gray-800">
              {project.overview}
            </p>
          </div>
        </section>
        
        {/* Problem & Solution section */}
        <section className="py-16 px-6 bg-brand-light">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            <div 
              ref={el => sectionRefs.current[1] = el}
              className="opacity-0 translate-y-10 transition-all duration-700"
            >
              <h2 className="text-2xl md:text-3xl font-space font-semibold mb-8 text-brand-blue">
                El problema
              </h2>
              <p className="text-lg leading-relaxed text-gray-800">
                {project.problem}
              </p>
            </div>
            
            <div 
              ref={el => sectionRefs.current[2] = el}
              className="opacity-0 translate-y-10 transition-all duration-700 delay-200"
            >
              <h2 className="text-2xl md:text-3xl font-space font-semibold mb-8 text-brand-blue">
                La solución
              </h2>
              <p className="text-lg leading-relaxed text-gray-800">
                {project.solution}
              </p>
            </div>
          </div>
        </section>
        
        {/* Process section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 
              ref={el => sectionRefs.current[3] = el}
              className="text-2xl md:text-3xl font-space font-semibold mb-12 text-brand-blue opacity-0 translate-y-10 transition-all duration-700"
            >
              Proceso de diseño
            </h2>
            
            <div className="space-y-24">
              {project.processSteps.map((step, index) => (
                <div 
                  key={index}
                  ref={el => sectionRefs.current[4 + index] = el}
                  className="grid md:grid-cols-2 gap-12 items-center opacity-0  transition-all duration-700"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                    <h3 className="text-xl md:text-2xl font-space font-medium mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-800">
                      {step.description}
                    </p>
                  </div>
                  
                  <div className={`${index % 2 !== 0 ? 'md:order-1' : ''} aspect-video bg-gray-100 rounded-lg overflow-hidden`}>
                    {step.multi_image ? (
                      <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={step.images[0]} alt={`${step.title} 1`} />}
                        itemTwo={<ReactCompareSliderImage src={step.images[1]} alt={`${step.title} 2`} />}
                      />
                    ) : (
                      <img
                        src={step.images[0]}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery section */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 
              ref={el => sectionRefs.current[7] = el}
              className="text-2xl md:text-3xl font-space font-semibold mb-12 text-brand-blue opacity-0 translate-y-10 transition-all duration-700"
            >
              Galería
            </h2>
            
            <div 
              ref={el => sectionRefs.current[8] = el}
              className="flex overflow-x-auto pb-8 space-x-6 opacity-0 translate-y-10 transition-all duration-700 delay-200"
            >
              {project.gallery.map((image, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-72 md:w-96 bg-white rounded-lg overflow-hidden"
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - imagen ${index + 1}`}
                    className="w-full h-56 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Results section */}
        <section className="py-16 px-6 bg-black text-white">
          <div 
            ref={el => sectionRefs.current[9] = el}
            className="max-w-3xl mx-auto text-center opacity-0 translate-y-10 transition-all duration-700"
          >
            <h2 className="text-2xl md:text-3xl font-space font-semibold mb-8">
              Resultados
            </h2>
            <p className="text-xl leading-relaxed">
              {project.results}
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {project.technologies.map(tech => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-white/10 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <a
              href="#projects"
              className="mt-16 inline-flex items-center px-8 py-3 bg-brand-blue text-white rounded-full font-medium transition-all hover:bg-brand-blue/90 hover:scale-105"
            >
              Ver todos los proyectos
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
