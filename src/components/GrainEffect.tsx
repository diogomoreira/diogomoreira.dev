const GrainEffect = () => {
  return (
    <svg className="pointer-events-none fixed isolate z-50 opacity-30 mix-blend-soft-light" width="100%" height="100%">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" stitchTiles="stitch"></feTurbulence>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)"></rect>
    </svg>
  );
};

export default GrainEffect;
