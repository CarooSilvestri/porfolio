'use client';

import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export type ProjectPreviewItem = {
  title: string;
  discipline: string;
  summary: string;
  tags: readonly string[];
  status?: string;
  year?: string;
  href?: string;
  visual: 'identity' | 'product' | 'motion' | 'editorial';
};

export type ProjectPreviewProps = {
  projects?: readonly ProjectPreviewItem[];
};

export const placeholderProjects: readonly ProjectPreviewItem[] = [
  {
    title: 'Silcon',
    discipline: 'Diseño y desarrollo web',
    summary:
      'Sitio corporativo y catálogo digital para una empresa argentina de electrónica para ascensores, pensado para ordenar productos, descargas y servicios técnicos.',
    tags: ['Arquitectura web', 'UI', 'Front-end'],
    status: 'PROYECTO REAL / POR DOCUMENTAR',
    year: 'FECHA A CONFIRMAR',
    href: 'https://silcon.com.ar/',
    visual: 'identity',
  },
  {
    title: 'Nexo',
    discipline: 'Diseño de producto + interfaz',
    summary:
      'Un caso para mostrar el problema, la arquitectura y las decisiones que convierten un flujo complejo en una interfaz simple.',
    tags: ['Research', 'Sistema UI', 'Prototipo'],
    status: 'SIMULACIÓN / POR DOCUMENTAR',
    year: '2026',
    visual: 'product',
  },
  {
    title: 'Marea',
    discipline: 'Landing page + motion',
    summary:
      'Una experiencia de campaña donde tipografía, ritmo y desarrollo trabajan juntos para construir una narrativa breve.',
    tags: ['Concepto', 'Motion', 'Creative dev'],
    status: 'SIMULACIÓN / POR DOCUMENTAR',
    year: '2026',
    visual: 'motion',
  },
  {
    title: 'Archivo 29°',
    discipline: 'Experimento editorial interactivo',
    summary:
      'Un laboratorio propio para explorar grillas, diagonales y código creativo como material de diseño.',
    tags: ['Editorial', 'Three.js', 'Interacción'],
    status: 'CONCEPTO PROPIO / EN PROCESO',
    year: '2026',
    visual: 'editorial',
  },
] as const;

function ProjectArtwork({ visual }: Pick<ProjectPreviewItem, 'visual'>) {
  return (
    <span
      className={`project-preview__art project-preview__art--${visual}`}
      aria-hidden="true"
    >
      <span className="project-preview__grid" />
      <span className="project-preview__diagonal" />
      <span className="project-preview__axis">29°</span>

      {visual === 'identity' && (
        <>
          <span className="project-preview__monogram">SI</span>
          <span className="project-preview__chip">IDENTIDAD / SISTEMA</span>
          <span className="project-preview__shape project-preview__shape--a" />
          <span className="project-preview__shape project-preview__shape--b" />
        </>
      )}

      {visual === 'product' && (
        <>
          <span className="project-preview__window">
            <span />
            <span />
            <span />
          </span>
          <span className="project-preview__panel project-preview__panel--a" />
          <span className="project-preview__panel project-preview__panel--b" />
          <span className="project-preview__cursor">↗</span>
        </>
      )}

      {visual === 'motion' && (
        <>
          <span className="project-preview__word project-preview__word--a">
            IDEAS
          </span>
          <span className="project-preview__word project-preview__word--b">
            EN
          </span>
          <span className="project-preview__word project-preview__word--c">
            MOVIMIENTO
          </span>
          <span className="project-preview__disc" />
        </>
      )}

      {visual === 'editorial' && (
        <>
          <span className="project-preview__angle-number">29</span>
          <span className="project-preview__slash">/</span>
          <span className="project-preview__editorial-copy">
            GRILLA
            <br />
            TIPO
            <br />
            CÓDIGO
          </span>
        </>
      )}

      <span className="project-preview__scan" />
    </span>
  );
}

export default function ProjectPreview({
  projects = placeholderProjects,
}: ProjectPreviewProps) {
  const instanceId = useId().replaceAll(':', '');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const frame = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      target.style.setProperty('--project-x', `${x * 18}px`);
      target.style.setProperty('--project-y', `${y * 14}px`);
      target.style.setProperty('--project-x-back', `${x * -10}px`);
      target.style.setProperty('--project-y-back', `${y * -8}px`);
    });
  };

  const reset = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty('--project-x', '0px');
    event.currentTarget.style.setProperty('--project-y', '0px');
    event.currentTarget.style.setProperty('--project-x-back', '0px');
    event.currentTarget.style.setProperty('--project-y-back', '0px');
  };

  return (
    <div className="project-preview">
      <div className="project-preview__legend" aria-hidden="true">
        <span>SELECCIÓN / {String(projects.length).padStart(2, '0')}</span>
        <span>TOCÁ UN CASO PARA VER MÁS ↓</span>
      </div>
      <ol className="project-preview__list">
        {projects.map((project, index) => {
          const isOpen = openIndex === index;
          const number = String(index + 1).padStart(2, '0');
          const detailId = `project-${instanceId}-${index}`;

          return (
            <li
              className={`project-preview__item${isOpen ? ' is-open' : ''}`}
              data-visual={project.visual}
              key={`${project.title}-${index}`}
            >
              <article>
                <button
                  className="project-preview__trigger"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={detailId}
                  aria-label={`${isOpen ? 'Cerrar' : 'Abrir'} el adelanto de ${project.title}`}
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  onPointerMove={move}
                  onPointerLeave={reset}
                >
                  <span className="project-preview__topline">
                    <span>CASO / {number}</span>
                    <span>{project.status ?? 'CASO EN EDICIÓN'}</span>
                  </span>
                  <ProjectArtwork visual={project.visual} />
                  <span className="project-preview__heading">
                    <span className="project-preview__number">{number}</span>
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.discipline}</small>
                    </span>
                    <span className="project-preview__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </button>

                <div
                  className="project-preview__details"
                  id={detailId}
                  hidden={!isOpen}
                >
                  <p>{project.summary}</p>
                  <div
                    className="project-preview__tags"
                    aria-label="Disciplinas"
                  >
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-preview__detail-meta">
                    <span>{project.year ?? '2026'}</span>
                    {project.href ? (
                      <a
                        href={project.href}
                        target={project.href.startsWith('http') ? '_blank' : undefined}
                        rel={
                          project.href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                      >
                        VER CASO ↗
                      </a>
                    ) : (
                      <span>PRÓXIMAMENTE</span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
