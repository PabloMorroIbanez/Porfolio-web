import React from "react";

// Azul branding
const BRAND_BLUE = "#0077C8";
const BG_COLOR = "#F8F9FA"; // Gris muy claro

const Loader: React.FC = () => (
  <div
    className="fixed inset-0 flex flex-col items-center justify-center z-50"
    style={{
      background: BG_COLOR,
      fontFamily: "'Inter', 'Space Grotesk', sans-serif",
      minHeight: "100vh",
    }}
    role="status"
    aria-live="polite"
  >
    {/* Círculo giratorio */}
    <div className="mb-8 flex items-center justify-center">
      <span
        className="inline-block"
        style={{
          width: 64,
          height: 64,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="animate-spin-slow"
          style={{
            display: "block",
          }}
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke={BRAND_BLUE}
            strokeWidth="6"
            fill="none"
            strokeDasharray="44 88"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </div>

    {/* Texto con efecto typewriter */}
    <div
      className="text-center text-[1.2rem] md:text-2xl font-bold tracking-wide text-[#222] relative"
      style={{
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        color: "#222",
        letterSpacing: "0.04em",
        maxWidth: 320,
      }}
    >
      <span className="typewriter-loader">
        Pablo Morro Ibáñez | UX/UI Designer
      </span>
    </div>

  </div>
);

export default Loader;