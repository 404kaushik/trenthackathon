import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Stars = ({ starCount = 500, shootingStarCount = 5 }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

        for (let i = 0; i < starCount; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000)
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        const shootingStars = [];

        const createShootingStar = () => {
            const start = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000),
                THREE.MathUtils.randFloatSpread(2000)
            );

            const end = new THREE.Vector3(
                start.x - 2000 * Math.random(),
                start.y - 2000 * Math.random(),
                start.z
            );

            const curve = new THREE.CatmullRomCurve3([start, end]);
            const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.5, 8, false);
            const shaderMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    color: { value: new THREE.Color(0xffffff) },
                    time: { value: 0 }
                },
                vertexShader: `
                    varying vec3 vPosition;
                    void main() {
                        vPosition = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 color;
                    uniform float time;
                    varying vec3 vPosition;
                    void main() {
                        float alpha = 1.0 - (vPosition.z / 1000.0);
                        gl_FragColor = vec4(color, alpha);
                    }
                `,
                transparent: true
            });
            const shootingStarLine = new THREE.Mesh(tubeGeometry, shaderMaterial);
            scene.add(shootingStarLine);

            return { line: shootingStarLine, speed: 5 + Math.random() * 5, start, end };
        };

        const activeShootingStars = [];

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            stars.rotation.x += 0.001;
            stars.rotation.y += 0.001;

            activeShootingStars.forEach((star, index) => {
                star.line.position.x += star.speed * (star.end.x - star.start.x) / 1000;
                star.line.position.y += star.speed * (star.end.y - star.start.y) / 1000;
                star.line.material.uniforms.time.value += 0.1;

                if (star.line.position.distanceTo(star.end) < 10) {
                    scene.remove(star.line);
                    activeShootingStars.splice(index, 1);
                }
            });

            if (Math.random() < 0.01) {
                activeShootingStars.push(createShootingStar());
            }

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, [starCount, shootingStarCount]);

    return <div ref={mountRef} className="sky-gradient fixed inset-0 overflow-hidden pointer-events-none"></div>;
};

export default Stars;
