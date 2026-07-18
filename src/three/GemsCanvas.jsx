import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

import { Gem } from './Seed.js';
import fragment from './a_frag.glsl?raw';
import vertex from './a_vert.glsl?raw';

// Imperative handle so the parent form can trigger a regeneration without
// re-running the whole scene setup on every keystroke.
export function useGemsGenerator(containerRef) {
  const generateRef = useRef(() => {});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!WebGL.isWebGL2Available()) {
      container.appendChild(WebGL.getWebGL2ErrorMessage());
      return;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('rgb(214,195,144)');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 30);
    camera.position.set(0, 2, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    scene.add(ambientLight, directionalLight);

    const loader = new GLTFLoader();
    let models = [];
    let frameId;

    function generateObject(seedValue) {
      const g = new Gem(seedValue);
      for (const model of models) {
        scene.remove(model);
      }
      models = [];

      const gemMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          amtofTex: { value: g.amtOfTex() },
          tex1: { value: g.genTex()[0] },
          tex2: { value: g.genTex()[1] },
          tex3: { value: g.genTex()[2] },
          col1: { value: g.genCol()[0] },
          col2: { value: g.genCol()[1] },
          col3: { value: g.genCol()[2] },
        },
        vertexShader: vertex,
        fragmentShader: fragment,
      });

      const modelUrl = `${import.meta.env.BASE_URL}Models/${g.generateShapes()}.glb`;
      loader.load(modelUrl, (gltf) => {
        const loadedObject = gltf.scene;
        loadedObject.traverse((child) => {
          if (child.isMesh) {
            child.material = gemMaterial;
          }
        });
        models.push(loadedObject);
        scene.add(loadedObject);
      });
    }

    generateRef.current = generateObject;
    generateObject('or');

    function animate() {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);

  return (seedValue) => generateRef.current(seedValue);
}
