import React from "react";

interface CursorRevealProps {
  x: number;
  y: number;
  visible: boolean;
  diameter?: number;
  text?: string;
}

const CursorReveal: React.FC<CursorRevealProps> = ({
  x,
  y,
  visible,
  diameter = 240,
  text = "Go to the project",
}) => {
  if (!visible) return null;
  const radius = diameter / 2;
  return (
    <div
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: diameter,
        height: diameter,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* Texto circular animado */}
      <div
        className="cursor-reveal-spin"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: diameter,
          height: diameter,
        }}
      >
        <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
          <defs>
            <path
              id="circlePath"
              d={`M${radius},${radius} m-${radius - 20},0 a${radius - 20},${radius - 20} 0 1,1 ${diameter - 40},0 a${radius - 20},${radius - 20} 0 1,1 -${diameter - 40},0`}
            />
          </defs>
          <text
            fontSize="20"
            fill="#fff"
            style={{
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            <textPath href="#circlePath">
              {(text + " • ").repeat(2)}
            </textPath>
          </text>
        </svg>
      </div>
      {/* Círculo central */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: diameter,
          height: diameter,
          borderRadius: "50%",
          border: "2px solid #fff",
          background: "transparent",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CursorReveal;