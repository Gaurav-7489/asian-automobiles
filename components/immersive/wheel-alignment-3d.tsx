"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type AlignmentMode = "pull" | "center" | "wear";

function SingleTyre({ mode }: { mode: AlignmentMode }) {
  const tyre = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const tread = useMemo(
    () =>
      Array.from({ length: 38 }, (_, index) => {
        const angle = (index / 38) * Math.PI * 2;
        const radius = 1.72;
        return {
          angle,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          side: index % 2 === 0 ? -1 : 1,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!tyre.current || !spin.current) return;

    const targetY =
      mode === "pull" ? -0.22 :
      mode === "center" ? 0.08 :
      -0.08;

    const targetZ =
      mode === "wear" ? -0.16 :
      mode === "center" ? 0.035 :
      0.02;

    tyre.current.rotation.y = THREE.MathUtils.damp(
      tyre.current.rotation.y,
      targetY,
      5,
      delta,
    );

    tyre.current.rotation.z = THREE.MathUtils.damp(
      tyre.current.rotation.z,
      targetZ,
      5,
      delta,
    );

    spin.current.rotation.z += delta * 0.05;

    const float = Math.sin(state.clock.elapsedTime * 0.7) * 0.035;
    tyre.current.position.y = THREE.MathUtils.damp(
      tyre.current.position.y,
      float,
      2.5,
      delta,
    );
  });

  return (
    <group
      ref={tyre}
      rotation={[-0.08, -0.16, -0.04]}
      position={[0, 0, 0]}
    >
      <group ref={spin}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.28, 0.46, 32, 96]} />
          <meshStandardMaterial
            color="#111214"
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>

        <mesh>
          <torusGeometry args={[1.08, 0.055, 18, 96]} />
          <meshStandardMaterial
            color="#242628"
            roughness={0.85}
            metalness={0.01}
          />
        </mesh>

        <mesh>
          <torusGeometry args={[1.49, 0.025, 12, 96]} />
          <meshStandardMaterial
            color="#2f3133"
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {tread.map((block, index) => {
          const highlight =
            mode === "wear" &&
            ((block.side < 0 && index > 5 && index < 16) ||
              (block.side > 0 && index > 24 && index < 35));

          return (
            <mesh
              key={index}
              position={[
                block.x,
                block.y,
                block.side * 0.22,
              ]}
              rotation={[
                0,
                block.side * 0.18,
                block.angle + Math.PI / 2,
              ]}
              castShadow
            >
              <boxGeometry args={[0.34, 0.12, 0.46]} />
              <meshStandardMaterial
                color={highlight ? "#d7ff34" : "#181a1c"}
                roughness={0.96}
                metalness={0}
                emissive={highlight ? "#1c2500" : "#000000"}
                emissiveIntensity={highlight ? 0.22 : 0}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function WheelAlignment3D({ mode }: { mode: AlignmentMode }) {
  return (
    <div
      className="aa-v18-tyre-canvas"
      aria-label="Interactive 3D tyre alignment visualisation"
    >
      <Canvas
        dpr={[1, 1.4]}
        camera={{
          position: [4.4, 2.8, 5.8],
          fov: 34,
          near: 0.1,
          far: 40,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        shadows
      >
        <color attach="background" args={["#f1efe8"]} />

        <ambientLight intensity={1.6} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={4.3}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <directionalLight
          position={[-3, 2, -4]}
          intensity={1.5}
          color="#cfd4d8"
        />

        <SingleTyre mode={mode} />

        <mesh
          position={[0, -2.03, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[12, 12]} />
          <shadowMaterial
            transparent
            opacity={0.22}
          />
        </mesh>
      </Canvas>
    </div>
  );
}
