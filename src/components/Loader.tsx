import React from "react";

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <span className="text-3xl font-bold animate-pulse text-brand-blue">Cargando...</span>
  </div>
);

export default Loader;