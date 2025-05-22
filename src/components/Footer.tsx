
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a 
              href="#" 
              className="text-xl font-space font-bold"
              aria-label="Back to top"
            >
              Pablo Morro.
            </a>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Privacy policy"
            >
              Privacidad
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Terms of service"
            >
              Términos
            </a>
            <a 
              href="#contact" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Contact me"
            >
              Contacto
            </a>
          </div>
          
          <div className="mt-6 md:mt-0">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Pablo Morro Ibáñez. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
