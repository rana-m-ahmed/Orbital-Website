"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Group, Shape, MathUtils } from "three";
function Sculpture() {
  const group = useRef<Group>(null);
  const { invalidate } = useThree();
  const shape = useMemo(() => {
    const s = new Shape();
    s.moveTo(1.62, 0.68);
    s.bezierCurveTo(1.12, 2.35, -1.14, 2.27, -2.04, 0.38);
    s.bezierCurveTo(-2.66, -0.96, -1.71, -2.23, -0.94, -2.15);
    s.bezierCurveTo(-1.8, -1.58, -1.4, -0.2, -0.89, 0.69);
    s.bezierCurveTo(-0.1, 2.01, 0.93, 1.83, 1.62, 0.68);
    return s;
  }, []);
  useFrame(({ pointer }) => {
    if (!group.current) return;
    const targetX = 0.14 + pointer.y * 0.055;
    const targetY = -0.23 + pointer.x * 0.09;
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.07,
    );
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      targetY,
      0.07,
    );
    if (
      Math.abs(group.current.rotation.x - targetX) > 0.001 ||
      Math.abs(group.current.rotation.y - targetY) > 0.001
    )
      invalidate();
  });
  return (
    <group
      ref={group}
      rotation={[0.14, -0.23, -0.24]}
      scale={0.95}
      onPointerMove={() => invalidate()}
    >
      <mesh position={[0, 0, -0.15]}>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.24,
              bevelEnabled: true,
              bevelSegments: 4,
              steps: 1,
              bevelSize: 0.07,
              bevelThickness: 0.06,
              curveSegments: 64,
            },
          ]}
        />
        <meshStandardMaterial
          color="#6c809c"
          metalness={0.82}
          roughness={0.28}
        />
      </mesh>
      <mesh
        position={[-0.08, -0.2, -0.36]}
        rotation={[0, 0, Math.PI]}
        scale={0.84}
      >
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.2,
              bevelEnabled: true,
              bevelSegments: 4,
              bevelSize: 0.06,
              bevelThickness: 0.06,
              curveSegments: 64,
            },
          ]}
        />
        <meshStandardMaterial
          color="#344962"
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.6, 0.32, 0.18]}>
        <sphereGeometry args={[0.47, 48, 48]} />
        <meshPhysicalMaterial
          color="#2f5bff"
          roughness={0.18}
          metalness={0.25}
          clearcoat={1}
          emissive="#1035da"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
export default function OrbitalScene({ visible }: { visible: boolean }) {
  const [lost, setLost] = useState(false);
  if (lost) return null;
  return (
    <div className="orbital-canvas">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "demand" : "never"}
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            () => setLost(true),
            { once: true },
          );
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[-3, 5, 5]} intensity={5} color="#e1ecff" />
        <directionalLight position={[4, 0, 3]} intensity={3} color="#4776ff" />
        <pointLight position={[-3, -3, 2]} intensity={15} color="#8ca7cd" />
        <Sculpture />
      </Canvas>
    </div>
  );
}
