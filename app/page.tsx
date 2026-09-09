import DiagonalScene from './DiagonalScene';
import CreativeLab from './CreativeLab';
import MotionLayer from './MotionLayer';
import ProjectPreview from './ProjectPreview';
function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 220 310" aria-hidden="true">
      <path
        className="mark-piece mark-purple"
        fill="#785FA5"
        d="M0 88 132 0v44L34 110l98 66v44L0 132Z"
      />
      <path
        className="mark-piece mark-yellow"
        fill="#FFC658"
        fillOpacity=".85"
        d="M176 0h44L44 308H0Z"
      />
      <path
        className="mark-piece mark-coral"
        fill="#EF6079"
        fillOpacity=".85"
        d="M88 88 220 176v44L88 308v-44l99-66-99-66Z"
      />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="wordmark" aria-hidden="true">
      <span className="wordmark-first">Caro</span>
      <span className="wordmark-last">Silvestri</span>
    </span>
  );
}

export default function Home() {
  return (
    <main id="inicio">
      <MotionLayer />
      <a className="skip" href="#sobre-mi">
        Saltar al contenido
      </a>
      <header>
        <a className="brand" href="#inicio" aria-label="Caro Silvestri, inicio">
          <Mark />
          <Wordmark />
        </a>
        <nav aria-label="Principal">
          <a href="#sobre-mi">
            Sobre mí <sup>01</sup>
          </a>
          <a href="#proyectos">
            Proyectos <sup>02</sup>
          </a>
        </nav>
        <span className="edition">PORTFOLIO / 2026</span>
      </header>
      <section className="hero">
        <div className="hero-guides" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-step hero-eyebrow">
            <span /> DISEÑADORA DIGITAL · CREATIVE DEVELOPER
          </p>
          <h1 className="hero-title">
            <span className="hero-line">
              <span>Ideas claras.</span>
            </span>
            <span className="hero-line">
              <span>
                <em>Formas propias.</em>
              </span>
            </span>
          </h1>
          <p className="intro hero-step hero-intro">
            Diseño interfaces y desarrollo experiencias web
            <br />
            con identidad, movimiento y una lógica clara.
          </p>
          <a className="text-link hero-step hero-link" href="#sobre-mi">
            Conocé mi enfoque <span>↘</span>
          </a>
        </div>
        <DiagonalScene />
        <div className="hero-bottom">
          <span>CARO SILVESTRI / PORTFOLIO 2026</span>
          <span>DESLIZÁ PARA EXPLORAR ↓</span>
        </div>
      </section>
      <div className="motion-ribbon" aria-hidden="true">
        <div className="ribbon-track">
          <span className="ribbon-group">
            DISEÑO WEB <b>↗</b> INTERFACES <b>↗</b> FRONT-END CREATIVO{' '}
            <b>↗</b> INTERACCIÓN <b>↗</b>
          </span>
          <span className="ribbon-group">
            DISEÑO WEB <b>↗</b> INTERFACES <b>↗</b> FRONT-END CREATIVO{' '}
            <b>↗</b> INTERACCIÓN <b>↗</b>
          </span>
        </div>
      </div>
      <section
        className="about"
        id="sobre-mi"
        data-motion-section
        data-transition-section="from-left"
      >
        <span
          className="section-transition-curtain curtain-light"
          aria-hidden="true"
        />
        <span className="section-transition-rule" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className="about-rail">
          <p className="eyebrow" data-reveal="left">
            01 / SOBRE MÍ
          </p>
          <div className="about-spec" data-reveal="left" data-reveal-delay="1">
            <span>PRÁCTICA / DISEÑO + CÓDIGO</span>
            <span>MEDIO / WEB</span>
            <span>ÁNGULO / 29°</span>
          </div>
        </div>
        <div className="about-copy">
          <h2 data-reveal="up">
            Hola, soy Caro.
            <br />
            <span>Diseñadora digital &amp; Creative Developer.</span>
          </h2>
          <p data-reveal="up" data-reveal-delay="1">
            Soy Carolina Silvestri, diseñadora multimedial con experiencia en
            desarrollo front-end. Trabajo entre el diseño y el código para crear
            sitios web, landing pages e interfaces con una estructura clara, una
            identidad reconocible y una interacción precisa.
          </p>
          <p data-reveal="up" data-reveal-delay="2">
            Me interesa el momento en que una idea visual empieza a moverse,
            responder y convertirse en una experiencia real. Pienso la
            estructura, la interfaz y el desarrollo como partes de un mismo
            proceso. Hoy estoy profundizando esa práctica para crecer como
            Creative Developer.
          </p>
          <div className="practice" data-reveal="up" data-reveal-delay="3">
            <div className="practice-heading">
              <span>CAPACIDADES / EN PRÁCTICA</span>
              <span>03 ÁREAS</span>
            </div>
            <ol className="practice-list">
              <li className="practice-row">
                <span className="practice-index">01</span>
                <strong>DIRECCIÓN VISUAL</strong>
                <span className="practice-description">
                  Identidad, composición y sistemas.
                </span>
                <span className="practice-arrow" aria-hidden="true">↘</span>
              </li>
              <li className="practice-row">
                <span className="practice-index">02</span>
                <strong>UI &amp; INTERACCIÓN</strong>
                <span className="practice-description">
                  Interfaces claras que responden.
                </span>
                <span className="practice-arrow" aria-hidden="true">↘</span>
              </li>
              <li className="practice-row">
                <span className="practice-index">03</span>
                <strong>FRONT-END CREATIVO</strong>
                <span className="practice-description">
                  Del diseño a una experiencia viva.
                </span>
                <span className="practice-arrow" aria-hidden="true">↘</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section
        className="projects"
        id="proyectos"
        data-motion-section
        data-transition-section="from-right"
      >
        <span
          className="section-transition-curtain curtain-dark"
          aria-hidden="true"
        />
        <span className="section-transition-rule" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <div className="section-top" data-reveal="up">
          <p className="eyebrow">02 / PROYECTOS</p>
          <span className="status">SIMULACIÓN / 04 CASOS</span>
        </div>
        <h2 data-reveal="left" data-reveal-delay="1">
          Cuatro proyectos.
          <br />
          Cuatro formas de <em>hacer.</em>
        </h2>
        <div className="project-bottom" data-reveal="up" data-reveal-delay="2">
          <p>
            Esta es una simulación visual para definir la estructura de mis
            futuros casos. Algunos nombres, imágenes y datos son
            provisorios; el sistema ya está listo para recibir el contenido
            real.
          </p>
          <span className="big-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="project-preview-wrap" data-reveal="up">
          <ProjectPreview />
        </div>
        <div className="lab-section-heading" data-reveal="up">
          <span>03 / LABORATORIO</span>
          <span>EXPERIMENTO INTERACTIVO</span>
        </div>
        <div data-reveal="up" data-reveal-delay="2">
          <CreativeLab />
        </div>
        <p className="projects-note" data-reveal="up">
          Próximo paso / elegir los casos reales y construir cada historia desde
          la intención hasta el resultado.
        </p>
      </section>
      <footer data-transition-section="from-left">
        <span
          className="section-transition-curtain curtain-accent"
          aria-hidden="true"
        />
        <span className="section-transition-rule" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <a
          className="footer-name"
          href="#inicio"
          aria-label="Caro Silvestri, volver al inicio"
          data-reveal="up"
        >
          <span className="footer-wordmark">
            <span className="footer-caro">Caro</span>
            <span className="footer-silvestri">Silvestri</span>
          </span>
          <span className="footer-arrow" aria-hidden="true">↗</span>
        </a>
        <div>
          <a
            href="https://www.linkedin.com/in/caroo-silvestri/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CONVERSEMOS EN LINKEDIN ↗
          </a>
          <span>© 2026 CARO SILVESTRI</span>
        </div>
      </footer>
    </main>
  );
}
