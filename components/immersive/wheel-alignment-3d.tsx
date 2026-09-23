"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type AlignmentMode = "pull" | "center" | "wear";

function FrontTyre({ mode }: { mode: AlignmentMode }) {
  const tyre = useRef<THREE.Group>(null);

  const tread = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => {
        const angle = (index / 42) * Math.PI * 2;
        const radius = 1.7;
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
    if (!tyre.current) return;

    const targetY =
      mode === "pull" ? -0.2 :
      mode === "center" ? 0.09 :
      0;

    const targetZ =
      mode === "wear" ? -0.13 :
      mode === "center" ? 0.025 :
      0;

    tyre.current.rotation.y = THREE.MathUtils.damp(
      tyre.current.rotation.y,
      targetY,
      5.5,
      delta,
    );

    tyre.current.rotation.z = THREE.MathUtils.damp(
      tyre.current.rotation.z,
      targetZ,
      5.5,
      delta,
    );

    const float = Math.sin(state.clock.elapsedTime * 0.65) * 0.018;
    tyre.current.position.y = THREE.MathUtils.damp(
      tyre.current.position.y,
      float,
      2.5,
      delta,
    );
  });

  return (
    <group ref={tyre}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1.28, 0.46, 36, 112]} />
        <meshStandardMaterial
          color="#101113"
          roughness={0.92}
          metalness={0.01}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[1.08, 0.055, 20, 112]} />
        <meshStandardMaterial
          color="#252729"
          roughness={0.88}
          metalness={0}
        />
      </mesh>

      <mesh>
        <torusGeometry args={[1.5, 0.026, 14, 112]} />
        <meshStandardMaterial
          color="#303234"
          roughness={0.94}
          metalness={0}
        />
      </mesh>

      {tread.map((block, index) => {
        const wearHighlight =
          mode === "wear" &&
          block.x < -0.42 &&
          block.y > -1.25 &&
          block.y < 1.25;

        return (
          <mesh
            key={index}
            position={[block.x, block.y, block.side * 0.22]}
            rotation={[
              0,
              block.side * 0.17,
              block.angle + Math.PI / 2,
            ]}
            castShadow
          >
            <boxGeometry args={[0.31, 0.115, 0.46]} />
            <meshStandardMaterial
              color={wearHighlight ? "#d7ff34" : "#17191b"}
              roughness={0.97}
              metalness={0}
              emissive={wearHighlight ? "#1f2900" : "#000000"}
              emissiveIntensity={wearHighlight ? 0.24 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function WheelAlignment3D({ mode }: { mode: AlignmentMode }) {
  return (
    <div
      className="aa-v19-tyre-canvas"
      aria-label="Front view 3D tyre alignment visualisation"
    >
      <Canvas
        dpr={[1, 1.35]}
        camera={{
          position: [0, 0.08, 5.9],
          fov: 31,
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

        <ambientLight intensity={1.7} />

        <directionalLight
          position={[4.5, 6, 6]}
          intensity={4.4}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <directionalLight
          position={[-4, 1.5, 4]}
          intensity={1.15}
          color="#d4d9dd"
        />

        <FrontTyre mode={mode} />

        <mesh
          position={[0, -2.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[12, 12]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  );
}
