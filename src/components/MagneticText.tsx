
import React, { useState, useRef, useEffect } from 'react';

interface MagneticTextProps {
  text: string;
  className?: string;
  strength?: number;
  disabled?: boolean;
}

const MagneticText: React.FC<MagneticTextProps> = ({
  text,
  className = "",
  strength = 30,
  disabled = false
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  // Skip effect if reduced motion is preferred
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (disabled || prefersReducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Calculate distance from cursor to center of element
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Define a "magnetic field" around the element
      const magneticRadius = Math.max(width, height) * 2;
      
      if (distance < magneticRadius) {
        // Calculate magnetism strength based on distance (stronger when closer)
        const magneticPull = 1 - distance / magneticRadius;
        
        // Apply magnetic effect
        setPosition({
          x: distanceX * magneticPull * (strength / 100),
          y: distanceY * magneticPull * (strength / 100)
        });
      } else {
        // Reset position when cursor is far away
        setPosition({ x: 0, y: 0 });
      }
    };
    
    const handleMouseLeave = () => {
      // Animate back to original position
      setPosition({ x: 0, y: 0 });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, disabled, prefersReducedMotion]);
  
  return (
    <div 
      ref={ref} 
      className={`magnetic-area ${className}`}
      aria-label={text}
      style={{ 
        transform: disabled || prefersReducedMotion 
          ? 'none' 
          : `translate(${position.x / 6}px, ${position.y / 6}px)`,
        transition: 'transform 0.3s ease'
      }}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={`word-${wordIndex}`}>
          {wordIndex > 0 && " "}
          <span 
            className="magnetic-text inline-block"
            style={{
              transform: disabled || prefersReducedMotion
                ? 'none'
                : `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            {word}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MagneticText;
