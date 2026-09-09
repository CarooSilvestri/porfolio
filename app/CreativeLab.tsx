'use client';

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export default function CreativeLab() {
  const stage = useRef<HTMLButtonElement>(null);
  const frame = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') return;
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      target.style.setProperty('--lab-x', `${x * 20}px`);
      target.style.setProperty('--lab-y', `${y * 14}px`);
      target.style.setProperty('--lab-x-back', `${x * -14}px`);
      target.style.setProperty('--lab-y-back', `${y * -10}px`);
      target.style.setProperty('--lab-x-mid', `${x * 7}px`);
      target.style.setProperty('--lab-y-mid', `${y * 5}px`);
      target.style.setProperty(
        '--lab-pointer-x',
        `${((x + 1) / 2) * 100}%`,
      );
      target.style.setProperty(
        '--lab-pointer-y',
        `${((y + 1) / 2) * 100}%`,
      );
    });
  };

  const reset = () => {
    const target = stage.current;
    if (!target) return;
    target.style.setProperty('--lab-x', '0px');
    target.style.setProperty('--lab-y', '0px');
    target.style.setProperty('--lab-x-back', '0px');
    target.style.setProperty('--lab-y-back', '0px');
    target.style.setProperty('--lab-x-mid', '0px');
    target.style.setProperty('--lab-y-mid', '0px');
    target.style.setProperty('--lab-pointer-x', '50%');
    target.style.setProperty('--lab-pointer-y', '50%');
  };

  return (
    <div className={'creative-lab ' + (expanded ? 'is-expanded' : '')}>
      <div className="lab-meta">
        <span>CREATIVE DEVELOPMENT / EXPERIMENTO 001</span>
        <span className="lab-instruction lab-instruction-desktop">
          MOVÉ EL CURSOR · CLIC PARA TRANSFORMAR
        </span>
        <span className="lab-instruction lab-instruction-mobile">
          TOCÁ PARA TRANSFORMAR
        </span>
      </div>
      <button
        ref={stage}
        className="lab-stage"
        type="button"
        aria-pressed={expanded}
        aria-label={
          expanded
            ? 'Recomponer el símbolo de Caro Silvestri'
            : 'Separar el símbolo de Caro Silvestri en diseño, código y movimiento'
        }
        onPointerMove={move}
        onPointerLeave={reset}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className="lab-grid" aria-hidden="true" />
        <span className="lab-angle" aria-hidden="true">
          29°
        </span>
        <svg
          className="lab-symbol"
          viewBox="0 0 220 310"
          aria-hidden="true"
        >
          <path
            className="lab-piece lab-purple"
            fill="#785FA5"
            d="M0 88 132 0v44L34 110l98 66v44L0 132Z"
          />
          <path
            className="lab-piece lab-yellow"
            fill="#FFC658"
            d="M176 0h44L44 308H0Z"
          />
          <path
            className="lab-piece lab-coral"
            fill="#EF6079"
            d="M88 88 220 176v44L88 308v-44l99-66-99-66Z"
          />
        </svg>
        <span className="lab-tag lab-tag-design" aria-hidden="true">
          &lt; DISEÑO
        </span>
        <span className="lab-tag lab-tag-code" aria-hidden="true">
          / CÓDIGO
        </span>
        <span className="lab-tag lab-tag-motion" aria-hidden="true">
          &gt; MOVIMIENTO
        </span>
        <span className="lab-result" aria-hidden="true">
          UNA EXPERIENCIA
        </span>
        <span className="lab-pointer" aria-hidden="true" />
      </button>
    </div>
  );
}
