import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending, Group } from "three";

type LayerProps = {
  count: number;
  radius: number;
  color: string;
  size: number;
  opacity: number;
  speed: number;
};

function ParticleLayer({ count, radius, color, size, opacity, speed }: LayerProps) {
  const layerRef = useRef<Group>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const spread = radius * (0.25 + Math.random() * 0.75);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[i3] = spread * Math.sin(phi) * Math.cos(theta);
      array[i3 + 1] = spread * Math.sin(phi) * Math.sin(theta) * 0.64;
      array[i3 + 2] = spread * Math.cos(phi);
    }
    return array;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (!layerRef.current) {
      return;
    }
    layerRef.current.rotation.y += delta * speed;
    layerRef.current.rotation.x += delta * speed * 0.32;
  });

  return (
    <group ref={layerRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={size}
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => {
      media.removeEventListener("change", apply);
    };
  }, []);

  return reduced;
}

export function HeroWebGL() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className="hero-webgl-fallback" />;
  }

  return (
    <div className="hero-webgl" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} camera={{ position: [0, 0, 2.5], fov: 54 }}>
        <ParticleLayer count={480} radius={2.25} color="#7ee8c8" size={0.03} opacity={0.48} speed={0.06} />
        <ParticleLayer count={260} radius={1.7} color="#9ce5ff" size={0.025} opacity={0.34} speed={-0.04} />
        <ParticleLayer count={160} radius={1.2} color="#ffd177" size={0.02} opacity={0.32} speed={0.075} />
      </Canvas>
    </div>
  );
}
