import React, { useState, useEffect } from 'react';

const words = [
  "technology.",
  "innovation.",
  "future.",
  "design."
];

const TypewriterText: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = words[currentWordIndex];
      
      if (isDeleting) {
        setText(current.substring(0, text.length - 1));
      } else {
        setText(current.substring(0, text.length + 1));
      }

      if (!isDeleting && text === current) {
        setIsDeleting(true);
        setDelta(2000); // Pausa antes de empezar a borrar
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setDelta(500); // Pausa antes de escribir la siguiente palabra
      } else {
        setDelta(150); // Velocidad de escritura/borrado
      }
    }, delta);

    return () => clearTimeout(timer);
  }, [text, currentWordIndex, isDeleting, delta]);

  return (
    <span className="typewriter-word">
      {text}
      <span className="cursor">|</span>
    </span>
  );
};

export default TypewriterText;