"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0a');

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    containerRef.current.appendChild(renderer.domElement);

    // Objects
    const geometry = new THREE.IcosahedronGeometry(2, 0); // Premium abstract shape
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.9,
      wireframe: true,
    });

    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Secondary shape
    const geometry2 = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
    const material2 = new THREE.MeshPhysicalMaterial({
      color: 0xcccccc,
      metalness: 0.1,
      roughness: 0.5,
    });
    const shape2 = new THREE.Mesh(geometry2, material2);
    shape2.position.set(4, -2, -5);
    scene.add(shape2);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener("mousemove", onDocumentMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow rotation
      shape.rotation.x = elapsedTime * 0.2;
      shape.rotation.y = elapsedTime * 0.3;

      shape2.rotation.x = elapsedTime * -0.1;
      shape2.rotation.y = elapsedTime * -0.2;

      // Mouse parallax with easing
      targetX = mouseX * 2;
      targetY = mouseY * 2;

      shape.position.x += 0.05 * (targetX - shape.position.x);
      shape.position.y += 0.05 * (-targetY - shape.position.y);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0a0a0a]"
    />
  );
}
