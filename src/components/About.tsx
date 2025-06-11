
import React, { useEffect, useRef } from 'react';

const tools = [
  { name: "Figma", logo: "/logos/figma.svg" },
  { name: "Framer", logo: "/logos/framer.svg" },
  { name: "Lovable", logo: "/logos/lovable.svg" },
  { name: "AI", logo: "/logos/ai.svg" },
  { name: "Amplitude", logo: "/logos/amplitude.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Blender", logo: "/logos/blender.svg" },
  { name: "Unreal", logo: "/logos/unreal.svg" }
];

const timelineItems = [
  {
    year: "2025-Present",
    title: "UX and UI Designer at ISYFU in Lanzadera",
    company: "Instituto Seguridad y Futuro (ISYFU)",
    descriptions: [
      "Redesigned core flows (tests, onboarding, dashboards, planning tools) to improve clarity and user success. ",
      "Integrated gamification strategies (streaks, leaderboards, points) to increase engagement and retention. ",
      "Designed paywalls and subscription flows, boosting freemium-to-premium conversion rates.",
      "Collaborated with analytics teams (Amplitude) to identify optimization opportunities using behavioral data. ",
      "Built comprehensive design systems ensuring accessibility, visual consistency, and adaptability.",
      "Led the complete UX/UI overhaul of the CMS (Content Management System), applying advanced prototyping tools and design systems to streamline internal workflows.",
      "Enhanced editor interfaces, dashboards, and data visualizations, ensuring intuitive use and measurable improvements in operational efficiency."
    ]  
  },
  {
    year: "2023-2024",
    title: "Designer and 3D Artist",
    company: "Freelance",
    descriptions: [
      "3D modeling and texturing using Blender and Substance Painter for Unreal Engine projects."
    ]  
  },
  {
    year: "2022-2023",
    title: "Academic Collaborator in VR",
    company: "TECH University",
    descriptions: [
      "Created 3D educational materials for a Master's program in Virtual Reality, designing interactive content to enhance the educational experience and foster immersive learning. "
    ]  
  },
  {
    year: "2020-4 months",
    title: "3D Artist",
    company: "Mindtrips",
    descriptions: [
      "Developed visual assets and textures in collaboration with design teams, focusing on improving visual quality and aesthetic consistency in video game environments."
    ]  
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
          User center UX-UI Designer
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left column - Bio text */}
          <div 
            ref={el => elementsRef.current[0] = el}
            className="opacity-0 translate-y-10 transition-all duration-700"
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-gray-800">
                Passionate about creating intuitive, engaging, and scalable digital experiences.  
                Skilled in user research, prototyping, usability testing, and information architecture, 
                I design solutions that connect user needs with business goals.
                </p>
              
              <p className="text-lg leading-relaxed text-gray-800">
                With experience across mobile, web, and CMS platforms, I thrive in agile, collaborative environments, 
                continuously pushing design boundaries to deliver products that delight and perform.
                </p>
            </div>

            {/* Timeline */}
            <div 
              ref={timelineRef}
              className="mt-12 opacity-0 translate-y-10 transition-all duration-700 delay-300"
            >
              <h3 className="text-xl font-space font-medium mb-6 text-brand-blue">Experience</h3>
              
              <div className="timeline-container">
                {timelineItems.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="text-sm text-brand-blue font-medium">{item.year}</div>
                    <div className="mt-1 font-space font-medium">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.company}</div>
                    <ul className="mt-2 text-gray-700 list-disc list-inside">
                      {item.descriptions.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Image and Tools */}
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
            
            <h3 className="text-xl font-space font-medium mb-6 mt-8 text-brand-blue">Tools</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((skill, index) => (
              <div 
                key={skill.name}
                className="group flex flex-col items-center p-4 rounded-lg transition-all hover:bg-brand-light hover:scale-105"
              >
                <img
                  src={skill.logo}
                  alt={skill.name + " logo"}
                  className="mb-2 w-10 h-10 object-contain"
                />
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
