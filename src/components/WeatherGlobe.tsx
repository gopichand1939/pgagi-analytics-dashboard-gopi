// src/components/WeatherGlobe.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGetWeatherByCityQuery } from '@/services/weatherApi';

interface WeatherGlobeProps {
  city: string;
}

const WeatherGlobe: React.FC<WeatherGlobeProps> = ({ city }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { data: weatherData } = useGetWeatherByCityQuery(city || 'Hyderabad');

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Globe
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/earth-texture.jpg'); // Add a globe texture in public/
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Weather effect (simplified particle system for rain/snow)
    const weatherCondition = weatherData?.weather[0]?.main.toLowerCase();
    let particles: THREE.Points;
    if (weatherCondition === 'rain') {
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 500;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = Math.random() * 20 - 10;
        positions[i * 3 + 1] = Math.random() * 20 - 10;
        positions[i * 3 + 2] = Math.random() * 20 - 10;
      }
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({ color: 0x00b7eb, size: 0.1 });
      particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);
    }

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      if (particles) {
        particles.rotation.y += 0.005;
        const positions = particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] -= 0.1; // Simulate falling
          if (positions[i] < -10) positions[i] = 10; // Reset to top
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, [weatherData]);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0 opacity-50" />;
};

export default WeatherGlobe;