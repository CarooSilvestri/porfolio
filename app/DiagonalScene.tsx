'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
export default function DiagonalScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const art = el.parentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, window.innerWidth <= 760 ? 1.25 : 1.6),
    );
    renderer.setClearColor(0, 0);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.z = 12;
    scene.add(new THREE.AmbientLight(0xffffff, 2.2));
    const light = new THREE.DirectionalLight(0xffffff, 3.3);
    light.position.set(-3, 5, 7);
    scene.add(light);
    const group = new THREE.Group();
    scene.add(group);
    const pieces = [
      { color: 0x785fa5, x: -1.35, y: 0.15, z: -0.2, len: 6.8 },
      { color: 0xef6079, x: 0.2, y: -0.6, z: 0.4, len: 5.8 },
      { color: 0xffc658, x: 1.6, y: 0.75, z: 0, len: 7.7 },
    ];
    const starts = [
      { x: -2.4, y: 1.1 },
      { x: 2.2, y: -1.25 },
      { x: 1.2, y: 2.2 },
    ];
    const meshes = pieces.map((c, index) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, c.len, 0.48),
        new THREE.MeshStandardMaterial({
          color: c.color,
          roughness: 0.3,
          metalness: 0.12,
        }),
      );
      mesh.position.set(c.x + starts[index].x, c.y + starts[index].y, c.z);
      mesh.rotation.z = -0.48;
      mesh.scale.y = 0.08;
      mesh.userData.home = { x: c.x, y: c.y, z: c.z };
      mesh.userData.start = starts[index];
      group.add(mesh);
      return mesh;
    });
    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    let targetX = 0,
      targetY = 0,
      frame = 0,
      t = 0,
      visible = true,
      scrollTarget = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 0.45;
      targetX = ((e.clientY - r.top) / r.height - 0.5) * 0.25;
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
    };
    if (finePointer) {
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
    }
    const onScroll = () => {
      scrollTarget = Math.min(
        window.scrollY / Math.max(window.innerHeight * 0.9, 1),
        1,
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(el);
    const started = performance.now();
    const settle = () => {
      meshes.forEach((mesh) => {
        const home = mesh.userData.home as { x: number; y: number; z: number };
        mesh.position.set(home.x, home.y, home.z);
        mesh.scale.y = 1;
      });
      group.rotation.set(0, 0, 0);
      group.position.y = 0;
      renderer.render(scene, camera);
    };
    const updateMotionPreference = () => {
      if (motion.matches) settle();
    };
    updateMotionPreference();
    motion.addEventListener('change', updateMotionPreference);

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || !visible || motion.matches) return;
      t += 0.008;
      const elapsed = now - started;
      group.rotation.y += (targetY - group.rotation.y) * 0.045;
      group.rotation.x += (targetX - group.rotation.x) * 0.045;
      group.rotation.z += (-scrollTarget * 0.16 - group.rotation.z) * 0.04;
      meshes.forEach((mesh, index) => {
        const home = mesh.userData.home as {
          x: number;
          y: number;
          z: number;
        };
        const start = mesh.userData.start as { x: number; y: number };
        const progress = Math.min(
          Math.max((elapsed - index * 90) / 720, 0),
          1,
        );
        const eased = 1 - Math.pow(1 - progress, 3);
        mesh.position.x = home.x + start.x * (1 - eased);
        mesh.position.y =
          home.y + start.y * (1 - eased) + Math.sin(t * 0.7 + index) * 0.045;
        mesh.scale.y = 0.08 + eased * 0.92;
        mesh.rotation.y = Math.sin(t + index) * 0.13 * eased;
      });
      group.position.y = Math.sin(t * 0.7) * 0.08;
      renderer.render(scene, camera);
    };
    renderer.render(scene, camera);
    art?.classList.add('ready');
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      ro.disconnect();
      motion.removeEventListener('change', updateMotionPreference);
      if (finePointer) {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      }
      window.removeEventListener('scroll', onScroll);
      meshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
      art?.classList.remove('ready');
    };
  }, []);
  return (
    <div className="art">
      <div className="fallback" aria-hidden="true">
        <div className="diagonal d1" />
        <div className="diagonal d2" />
        <div className="diagonal d3" />
      </div>
      <div className="canvas-host" ref={host} aria-hidden="true" />
      <span className="art-note">FORMA ↗ INTERACCIÓN</span>
    </div>
  );
}
