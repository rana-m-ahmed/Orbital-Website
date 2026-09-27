"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import geometry from "./brand-geometry.json";
type SceneProps = {
  active: boolean;
  onReady: () => void;
  onStage: (stage: number) => void;
  onFailure: () => void;
};
function Mark({ active, onReady, onStage, onFailure }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const node = useRef<THREE.Mesh>(null);
  const { invalidate, gl, pointer } = useThree();
  const elapsed = useRef(0),
    scrollDepth = useRef(0),
    settled = useRef(false),
    stage = useRef(-1),
    shown = useRef(false);
  const meshes = useMemo(
    () =>
      geometry.contours.map((points) => {
        const shape = new THREE.Shape();
        const last = points.at(-2)!;
        shape.moveTo(
          (last[0] + points[0][0]) / 2,
          (last[1] + points[0][1]) / 2,
        );
        points.slice(0, -1).forEach((p, i) => {
          const next = points[(i + 1) % (points.length - 1)];
          shape.quadraticCurveTo(
            p[0],
            p[1],
            (p[0] + next[0]) / 2,
            (p[1] + next[1]) / 2,
          );
        });
        shape.closePath();
        return new THREE.ExtrudeGeometry(shape, {
          depth: 0.24,
          bevelEnabled: true,
          bevelSegments: 3,
          steps: 1,
          bevelSize: 0.034,
          bevelThickness: 0.036,
          curveSegments: 5,
        });
      }),
    [],
  );
  useEffect(() => () => meshes.forEach((mesh) => mesh.dispose()), [meshes]);
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  useEffect(() => {
    if (active) invalidate();
  }, [active, invalidate]);
  useEffect(() => {
    const scroll = () => {
      scrollDepth.current = Math.min(
        1,
        Math.max(0, window.scrollY / window.innerHeight),
      );
      if (active) invalidate();
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    const move = (event: PointerEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();
      pointer.set(
        THREE.MathUtils.clamp(
          ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
          -1,
          1,
        ),
        THREE.MathUtils.clamp(
          -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
          -1,
          1,
        ),
      );
      if (active) invalidate();
    };
    const leave = () => {
      pointer.set(0, 0);
      if (active) invalidate();
    };
    gl.domElement.addEventListener("pointermove", move);
    gl.domElement.addEventListener("pointerleave", leave);
    return () => {
      gl.domElement.removeEventListener("pointermove", move);
      gl.domElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, [active, gl, invalidate, pointer]);
  useFrame((_state, delta) => {
    if (!active || !group.current || !node.current) return;
    elapsed.current += Math.min(delta, 0.04);
    const t = Math.min(elapsed.current / 2.2, 1);
    const eased = t * t * (3 - 2 * t);
    // Keep the active node registered to the original mark's handoff notch.
    const depth = scrollDepth.current;
    const tx = 0.14 + (1 - eased) * 0.2 - pointer.y * 0.14 + depth * 0.38;
    const ty = -0.24 - (1 - eased) * 0.45 + pointer.x * 0.22 - depth * 0.18;
    const tz = -0.13 + (1 - eased) * 0.065 + pointer.x * 0.025;
    const scale = THREE.MathUtils.damp(
      group.current.scale.x,
      1 - depth * 0.08,
      7,
      delta,
    );
    group.current.scale.setScalar(scale);
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      tx,
      7,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      ty,
      7,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      tz,
      7,
      delta,
    );
    node.current.position.z = 0.23 + Math.sin(eased * Math.PI) * 0.32;
    const next = t < 0.3 ? 0 : t < 0.68 ? 1 : 2;
    if (next !== stage.current) {
      stage.current = next;
      onStage(next);
    }
    if (!shown.current) {
      shown.current = true;
      onReady();
    }
    const distance =
      Math.abs(group.current.rotation.x - tx) +
      Math.abs(group.current.rotation.y - ty) +
      Math.abs(group.current.rotation.z - tz);
    settled.current =
      t === 1 &&
      distance < 0.0005 &&
      Math.abs(scale - (1 - depth * 0.08)) < 0.0005;
    if (!settled.current) invalidate();
  });
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[-4, 6, 8]} intensity={4.2} />
      <directionalLight position={[5, 1, 4]} color="#b9d0ff" intensity={2} />
      <directionalLight position={[-1, -5, 2]} intensity={0.9} />
      <group ref={group} rotation={[0.34, -0.69, -0.065]}>
        {meshes.map((mesh, i) => (
          <mesh key={i} geometry={mesh} position={[0, 0, -0.12]}>
            <meshStandardMaterial
              attach="material-0"
              color="#1b2d47"
              metalness={0.3}
              roughness={0.42}
            />
            <meshStandardMaterial
              attach="material-1"
              color="#1a2c45"
              metalness={0.58}
              roughness={0.28}
            />
          </mesh>
        ))}
        <mesh
          ref={node}
          position={[geometry.node.center[0], geometry.node.center[1], 0.23]}
        >
          <sphereGeometry args={[geometry.node.radius * 0.97, 48, 32]} />
          <meshPhysicalMaterial
            color="#3264ff"
            metalness={0.08}
            roughness={0.42}
            clearcoat={0.15}
            clearcoatRoughness={0.5}
          />
        </mesh>
      </group>
    </>
  );
}
export default function RelayCanvas(props: SceneProps) {
  return (
    <div className="relay-canvas" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 12], zoom: 77, near: 0.1, far: 40 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        fallback={null}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
        }}
      >
        <Mark {...props} />
      </Canvas>
    </div>
  );
}
