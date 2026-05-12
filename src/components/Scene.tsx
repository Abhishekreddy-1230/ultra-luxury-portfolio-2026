"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Sphere } from "@react-three/drei";
import { EffectComposer, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1, 64, 64]}>
            <meshStandardMaterial
              color="#333"
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        <Environment preset="city" />

        <EffectComposer enableNormalPass={false}>
          <Noise
            premultiply
            blendFunction={BlendFunction.ADD}
            opacity={0.15}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.002, 0.002)}
            opacity={0.5}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
