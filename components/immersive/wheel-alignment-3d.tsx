"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type AlignmentMode = "pull" | "center" | "wear";

type WheelProps = {
  position: [number, number, number];
  front: boolean;
  left: boolean;
  mode: AlignmentMode;
};

function Tire({ position, front, left, mode }: WheelProps) {
  const assembly = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  const target = useMemo(() => {
    const steer =
      front && mode === "pull" ? 0.18 :
      front && mode === "center" ? -0.11 :
      0;

    const camber =
      mode === "wear"
        ? (left ? 0.12 : -0.12) * (front ? 1 : 0.7)
        : 0;

    return { steer, camber };
  }, [front, left, mode]);

  const treadBlocks = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => {
        const angle = (index / 28) * Math.PI * 2;
        return {
          angle,
          y: Math.cos(angle) * 0.79,
          z: Math.sin(angle) * 0.79,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    if (assembly.current) {
      assembly.current.rotation.y = THREE.MathUtils.damp(
        assembly.current.rotation.y,
        target.steer,
        7,
        delta,
      );
      assembly.current.rotation.z = THREE.MathUtils.damp(
        assembly.current.rotation.z,
        target.camber,
        7,
        delta,
      );

      const pulse =
        mode === "wear"
          ? 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.01
          : 1;

      assembly.current.scale.setScalar(
        THREE.MathUtils.damp(assembly.current.scale.x, pulse, 5, delta),
      );
    }

    if (spin.current) {
      spin.current.rotation.x += delta * 0.13;
    }
  });

  return (
    <group ref={assembly} position={position}>
      <group ref={spin}>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.62, 0.22, 18, 64]} />
          <meshStandardMaterial
            color="#101214"
            roughness={0.94}
            metalness={0.03}
          />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.41, 0.41, 0.18, 48]} />
          <meshStandardMaterial
            color="#adb4b8"
            roughness={0.22}
            metalness={0.94}
          />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.23, 36]} />
          <meshStandardMaterial
            color="#171a1d"
            roughness={0.34}
            metalness={0.76}
          />
        </mesh>

        {Array.from({ length: 5 }).map((_, index) => {
          const angle = (index / 5) * Math.PI * 2;
          return (
            <mesh key={index} rotation={[angle, 0, 0]} castShadow>
              <boxGeometry args={[0.2, 0.53, 0.075]} />
              <meshStandardMaterial
                color="#d0d6d9"
                roughness={0.2}
                metalness={0.96}
              />
            </mesh>
          );
        })}

        {treadBlocks.map((block, index) => {
          const wearHighlight =
            mode === "wear" &&
            ((left && index > 10 && index < 18) ||
              (!left && (index < 4 || index > 24)));

          return (
            <mesh
              key={index}
              position={[0, block.y, block.z]}
              rotation={[block.angle, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.5, 0.14, 0.08]} />
              <meshStandardMaterial
                color={wearHighlight ? "#d7ff34" : "#17191b"}
                roughness={0.96}
                metalness={0}
                emissive={wearHighlight ? "#202b00" : "#000000"}
                emissiveIntensity={wearHighlight ? 0.36 : 0}
              />
            </mesh>
          );
        })}
      </group>

      <mesh
        position={[left ? 0.38 : -0.38, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry args={[0.63, 0.012, 8, 64]} />
        <meshBasicMaterial
          color={mode === "wear" ? "#d7ff34" : "#59636b"}
          transparent
          opacity={mode === "wear" ? 0.68 : 0.2}
        />
      </mesh>
    </group>
  );
}

function AlignmentRig({ mode }: { mode: AlignmentMode }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rig.current) return;

    const targetYaw =
      -0.18 + Math.sin(state.clock.elapsedTime * 0.32) * 0.035;

    rig.current.rotation.y = THREE.MathUtils.damp(
      rig.current.rotation.y,
      targetYaw,
      2.6,
      delta,
    );
  });

  return (
    <group ref={rig} rotation={[-0.06, -0.18, 0]} position={[0, -0.18, 0]}>
      <mesh position={[0, 0.48, 0]} receiveShadow>
        <boxGeometry args={[3.4, 0.18, 3.7]} />
        <meshStandardMaterial
          color="#14181b"
          roughness={0.8}
          metalness={0.32}
        />
      </mesh>

      <mesh position={[0, 0.68, 0.1]} castShadow>
        <boxGeometry args={[2.55, 0.42, 2.75]} />
        <meshStandardMaterial
          color="#252b2f"
          roughness={0.56}
          metalness={0.38}
        />
      </mesh>

      <Tire position={[-1.9, 0.2, -1.35]} front left mode={mode} />
      <Tire position={[1.9, 0.2, -1.35]} front left={false} mode={mode} />
      <Tire position={[-1.9, 0.2, 1.35]} front={false} left mode={mode} />
      <Tire position={[1.9, 0.2, 1.35]} front={false} left={false} mode={mode} />

      {[-1.9, 1.9].map((x) => (
        <mesh key={x} position={[x, -0.56, 0]}>
          <boxGeometry args={[0.025, 0.018, 5.6]} />
          <meshBasicMaterial
            color="#d7ff34"
            transparent
            opacity={0.42}
          />
        </mesh>
      ))}

      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[5.5, 0.015, 0.025]} />
        <meshBasicMaterial
          color="#70808b"
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh
        position={[0, -0.62, 0]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#080a0c" roughness={1} />
      </mesh>
    </group>
  );
}

export function WheelAlignment3D({ mode }: { mode: AlignmentMode }) {
  return (
    <div
      className="aa-v17-wheel3d-canvas"
      aria-label="Interactive 3D wheel alignment visualisation"
    >
      <Canvas
        dpr={[1, 1.45]}
        camera={{
          position: [6.4, 5.4, 7.4],
          fov: 36,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        shadows
      >
        <color attach="background" args={["#080a0c"]} />
        <fog attach="fog" args={["#080a0c", 8.5, 17]} />

        <ambientLight intensity={0.78} />
        <directionalLight
          position={[4.5, 7, 4]}
          intensity={3}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[-5, 3.4, 2]}
          intensity={28}
          distance={11}
          color="#d7ff34"
        />
        <pointLight
          position={[4, 2.5, -4]}
          intensity={18}
          distance={10}
          color="#6f8fa8"
        />

        <AlignmentRig mode={mode} />
      </Canvas>
    </div>
  );
}
