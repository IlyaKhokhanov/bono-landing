'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

import styles from './LensEffect.module.scss';

export default function LensEffect() {
  const mountRef = useRef<HTMLDivElement>(null);
  const loader = new THREE.TextureLoader();

  useEffect(() => {
    const mount = mountRef.current!;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    let animationId: number;
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      customPass.uniforms.uMouse.value.x = (e.clientX - rect.left) / rect.width;
      customPass.uniforms.uMouse.value.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    let customPass: ShaderPass;

    loader.load('/images/logo-footer.svg', (mainTex) => {
      mainTex.minFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({ map: mainTex, transparent: true, depthTest: false });
      const geometry = new THREE.PlaneGeometry(669, 183);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const lensShader = {
        uniforms: {
          tDiffuse: { value: null },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(width, height) },
          uRadius: { value: 100.0 }, // базовый радиус
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          uniform float uRadius;
          varying vec2 vUv;

          void main() {
              vec2 uv = vUv;
              vec4 base = texture2D(tDiffuse, uv);

              // соотношение сторон для корректного круга
              vec2 aspect = vec2(1.0, uResolution.y / uResolution.x);
              float dist = length((uv - uMouse) * aspect);

              // мягкая маска — ещё плавнее и больше по краям
              float mask = 1.0 - smoothstep(
                  (uRadius + 40.0) / uResolution.x,
                  (uRadius + 120.0) / uResolution.x,
                  dist
              );

              if (mask > 0.0) {
                  vec4 sum = vec4(0.0);
                  int blurRange = 5; // сильнее размытие: 11x11 выборок
                  float blurSize = 3.0 / uResolution.x; // шаг между выборками

                  for (int x = -blurRange; x <= blurRange; x++) {
                      for (int y = -blurRange; y <= blurRange; y++) {
                          vec2 offset = vec2(float(x), float(y)) * blurSize;
                          sum += texture2D(tDiffuse, uv + offset);
                      }
                  }
                  vec4 blurred = sum / float((blurRange*2+1)*(blurRange*2+1));
                  base = mix(base, blurred, mask);
              }

              gl_FragColor = base;
          }
        `,
      };

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      customPass = new ShaderPass(lensShader);
      composer.addPass(customPass);

      mount.addEventListener('mousemove', onMouseMove);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        composer.render();
      };
      animate();

      return () => {
        cancelAnimationFrame(animationId);
        mount.removeEventListener('mousemove', onMouseMove);

        geometry.dispose();
        material.dispose();
        mainTex.dispose();
        composer.dispose();
        renderer.dispose();
        scene.clear();

        mount.removeChild(renderer.domElement);
      };
    });
  }, []);

  return <div ref={mountRef} className={styles.lensEffect} />;
}
