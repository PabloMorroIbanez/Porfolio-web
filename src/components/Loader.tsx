import React, { useEffect, useRef, useState } from "react";
import styles from  "@/styles/Loader.module.css";

const Loader: React.FC<{ onFinish?: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState<"loading" | "animating" | "done">("loading");
  const [heroRect, setHeroRect] = useState<{top: number, left: number, width: number, height: number} | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("animating"), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "animating") {
      const hero = document.getElementById("hero-title");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setHeroRect(rect);
      }
      const timer = setTimeout(() => {
        setPhase("done");
        if (onFinish) onFinish();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onFinish]);

  let style: React.CSSProperties = {};
  let className = styles["loader-root"];
  if (phase === "done") className += "done";
  if (phase === "animating" && heroRect && loaderRef.current) {
    const loaderRect = loaderRef.current.getBoundingClientRect();
    const scaleX = heroRect.width / loaderRect.width;
    const scaleY = heroRect.height / loaderRect.height;
    style = {
      left: heroRect.left,
      top: heroRect.top,
      width: heroRect.width,
      height: heroRect.height,
      transform: `scale(${scaleX}, ${scaleY})`,
    };
    className += ` ${styles["loader-animating"]}`;
  }

  // Animación: centrado y grande -> posición y tamaño del Hero
  return (
    <div style={style} ref={loaderRef} className={className}>
      <span
        className="text-2xl md:text-3xl tracking-widest font-space font-thin uppercase text-brand-white"
        style={{
          letterSpacing: "0.18em",
        }}
      >
        Pablo Morro Ibáñez
      </span>
      <div className="mb-4 text-xs tracking-widest flex items-center justify-center font-space text-brand-blue font-thin uppercase gap-4 mt-2">
        <span className="block w-8 h-px bg-border" />
        <span>User-Centered UX/UI Designer</span>
        <span className="block w-8 h-px bg-border" />
      </div>
    </div>
  );
};

export default Loader;