
import React, { useEffect, useRef } from 'react';

const skills = [
  { name: "Figma", icon: "🎨" },
  { name: "Notion", icon: "📝" },
  { name: "Framer", icon: "⚡" },
  { name: "Sketch", icon: "✏️" },
  { name: "Adobe XD", icon: "🎭" },
  { name: "Photoshop", icon: "🖼️" },
  { name: "After Effects", icon: "🎬" },
  { name: "Unity", icon: "🎮" }
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 md:py-32 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-space font-semibold mb-16 tracking-tight">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column - Bio text */}
          <div 
            ref={el => elementsRef.current[0] = el}
            className="opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae justo vitae erat tincidunt fringilla. 
                Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-800">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam eu 
                libero eget eros maximus consequat. Praesent ut dolor vel orci ultricies volutpat.
              </p>
              
              <h3 className="text-xl font-space font-medium mt-10 mb-3">Design Philosophy</h3>
              
              <p className="text-lg leading-relaxed text-gray-800">
                Suspendisse ut elementum quam. Sed vel turpis non libero malesuada auctor. Class aptent taciti 
                sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent efficitur purus vitae 
                felis scelerisque, nec commodo metus mattis.
              </p>
            </div>
          </div>
          
          {/* Right column - Image and Skills */}
          <div 
            ref={el => elementsRef.current[1] = el}
            className="opacity-0 translate-y-10 transition-all duration-700 delay-200"
          >
            <div className="mb-10 aspect-square w-3/4 mx-auto md:w-auto md:h-auto overflow-hidden rounded-2xl bg-gray-100">
              {/* Replace with your actual image */}
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Designer portrait" 
                className="w-full h-full object-cover"
                width="400"
                height="400"
              />
            </div>
            
            <h3 className="text-xl font-space font-medium mb-6 mt-8">Skills & Tools</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="group flex flex-col items-center p-4 rounded-lg transition-all hover:bg-green-soft hover:scale-105"
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
