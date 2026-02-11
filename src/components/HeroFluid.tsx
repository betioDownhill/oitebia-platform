import { useEffect, useRef } from "react";

type FluidFactory = (canvas: HTMLCanvasElement, options?: Record<string, unknown>) => void;

function resolveFluidFactory(module: unknown): FluidFactory | null {
  if (typeof module === "function") {
    return module as FluidFactory;
  }
  if (module && typeof module === "object") {
    const maybeObject = module as Record<string, unknown>;
    if (typeof maybeObject.default === "function") {
      return maybeObject.default as FluidFactory;
    }
    if (typeof maybeObject.WebGLFluid === "function") {
      return maybeObject.WebGLFluid as FluidFactory;
    }
  }
  return null;
}

export function HeroFluid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const compactViewport = window.matchMedia("(max-width: 700px)").matches;

    let cancelled = false;
    const boot = async () => {
      try {
        const module = await import("webgl-fluid");
        if (cancelled) {
          return;
        }
        const createFluid = resolveFluidFactory(module);
        if (!createFluid) {
          return;
        }
        createFluid(canvas, {
          IMMEDIATE: true,
          AUTO: true,
          INTERVAL: compactViewport ? 1800 : 2200,
          TRANSPARENT: true,
          SHADING: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 10,
          BLOOM: !compactViewport,
          SUNRAYS: !compactViewport,
          SIM_RESOLUTION: compactViewport ? 96 : 128,
          DYE_RESOLUTION: compactViewport ? 512 : 768
        });
      } catch {
        // If initialization fails, gradient fallback remains visible.
      }
    };

    boot();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="hero-fluid" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-fluid-canvas" />
    </div>
  );
}
