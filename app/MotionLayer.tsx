'use client';

import { useEffect } from 'react';

export default function MotionLayer() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-motion-section]'),
    );
    const transitionSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-transition-section]'),
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-active', entry.isIntersecting);
        });
      },
      { threshold: 0.18 },
    );

    const configureMotion = () => {
      root.classList.toggle('motion-ready', !motion.matches);
      if (motion.matches) {
        reveals.forEach((item) => item.classList.add('is-visible'));
        return;
      }
      reveals.forEach((item) => {
        if (!item.classList.contains('is-visible')) revealObserver.observe(item);
      });
      sections.forEach((section) => sectionObserver.observe(section));
    };

    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      root.style.setProperty('--page-progress', String(window.scrollY / max));
      root.style.setProperty(
        '--hero-progress',
        String(Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)),
      );
      const transitionStart = window.innerHeight * 0.97;
      const transitionEnd = window.innerHeight * 0.34;
      const transitions = transitionSections.map((section) => {
        const top = section.getBoundingClientRect().top;
        const documentTop = top + window.scrollY;
        const minimumReachableTop = documentTop - max;
        const effectiveEnd = Math.max(transitionEnd, minimumReachableTop);
        const transitionDistance = Math.max(
          transitionStart - effectiveEnd,
          1,
        );
        const rawProgress = Math.min(
          Math.max((transitionStart - top) / transitionDistance, 0),
          1,
        );
        return { section, progress: rawProgress };
      });
      transitions.forEach(({ section, progress }) => {
        section.style.setProperty('--section-progress', String(progress));
        section.style.setProperty('--section-shift', `${progress * 105}%`);
        section.style.setProperty(
          '--section-shift-inverse',
          `${progress * -105}%`,
        );
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };

    configureMotion();
    updateScroll();
    motion.addEventListener('change', configureMotion);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(frame);
      revealObserver.disconnect();
      sectionObserver.disconnect();
      motion.removeEventListener('change', configureMotion);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.classList.remove('motion-ready');
      root.style.removeProperty('--page-progress');
      root.style.removeProperty('--hero-progress');
      transitionSections.forEach((section) => {
        section.style.removeProperty('--section-progress');
        section.style.removeProperty('--section-shift');
        section.style.removeProperty('--section-shift-inverse');
      });
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
