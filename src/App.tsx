import { useState, useEffect, useRef, RefObject } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProjectCard from './components/ProjectCard';
import { motion } from 'framer-motion';
import TimelineItem from './components/TimelineItem';
import './styles/index.css';

// Update image imports to use consistent paths
import CaResearch from './assets/CA Research.png';
import EyeWitness from './assets/EyeWitness Screenshot.png';
import ColorEconomy from './assets/ColorEconomy.png';
import GnomeKeyBinder from './assets/Gnome Foot.png';
import HeadShot from './assets/Headshot.jpg';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: RefObject<HTMLElement | null>) => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setActiveSection('home');
  };

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      // No longer updating scrollY state
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">MM</div>
        <div className="nav-links">
          <button className={activeSection === 'home' ? 'active' : ''}
            onClick={() => scrollToTop()}>Home</button>
          <button className={activeSection === 'about' ? 'active' : ''}
            onClick={() => {
              scrollToSection(aboutRef);
              setActiveSection('about');
            }}>About</button>
          <button className={activeSection === 'projects' ? 'active' : ''}
            onClick={() => {
              scrollToSection(projectsRef);
              setActiveSection('projects');
            }}>Projects</button>
        </div>
      </nav>

      {/* Header with animated tech background */}
      <header className="hero-section">
        <div className="tech-background"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1>Michael Myerson</h1>
          <h2>Software Engineer & Team Leader</h2>
          <p>Building innovative solutions that spark connection</p>
        </motion.div>
      </header>

      {/* Main content */}
      <main>
        <section className="about-section" ref={aboutRef}>
          <div className="section-container">
            <motion.div
              className="about-content"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="about-text">
                <h2 className="section-title">About Me</h2>
                <p className="site-text">
                  Hello, I'm Michael Myerson—a proud Floridian, Software Engineer, and Engineering Team Leader with over a decade of transforming complex challenges into elegant solutions. I'm passionate about building educational games, simulations, and innovative software that make complex ideas accessible and engaging.
                </p>
                <p className="site-text">
                  My journey has taken me from designing robust back-end systems to crafting intuitive user interfaces, always with an eye on long-term impact and meaningful collaboration.
                </p>
                <div className="personality-highlights">
                  <div className="highlight-card">
                    <span className="highlight-icon">🎮</span>
                    <span>Gaming Enthusiast</span>
                  </div>
                  <div className="highlight-card">
                    <span className="highlight-icon">🎸</span>
                    <span>Punk Rock Lover</span>
                  </div>
                  <div className="highlight-card">
                    <span className="highlight-icon">🐊</span>
                    <span>Florida Native</span>
                  </div>
                </div>
              </div>
              <div className="portrait-container">
                <div className="portrait-frame">
                  <img src={HeadShot} alt="Michael Myerson" className="portrait-img" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="timeline-section">
          <h2 className="section-title">Professional Journey</h2>
          <div className="timeline">
            <TimelineItem
              icon="🐳"
              title="Installable CDS System"
              description="Developed a containerized deployment system using Docker, CMake, and Bash, reducing installation complexity. Integrated C++ and Lua for multi-layered, scriptable system configuration. Increased test coverage by 30% through automated testing."
            />
            <TimelineItem
              icon="🗃️"
              title="Distributed Database with RAFT Consensus"
              description="Built a fault-tolerant distributed database using Go and RAFT consensus to ensure consistency and availability. Designed efficient data replication mechanisms and implemented load-balancing strategies to optimize write throughput."
            />
            <TimelineItem
              icon="🌐"
              title="Embedded System Management Site"
              description="Developed a web-based control panel for managing embedded systems using Node.js and React. Implemented a RESTful API for real-time device monitoring, configuration, and diagnostics. Optimized site load speed and UI design."
            />
            <TimelineItem
              icon="🖥️"
              title="GUI for a Cross-Domain Guard"
              description="Designed and maintained a secure graphical interface for a cross-domain guard in a high-assurance environment. Migrated legacy Java Swing applications to JavaFX, improving maintainability and performance. Developed a generative UI for visualizing hierarchical security constraints."
            />
            <TimelineItem
              icon="👨‍💼"
              title="Production Manager"
              description="Coordinated diverse teams, negotiating and delivering a multi-million-dollar contract with the University of Central Florida."
            />
            <TimelineItem
              icon="🎖️"
              title="US Army Infantry Soldier"
              description="Maintained critical communications during intense operations, trained team members, and was honored with the Army Achievement Medal."
            />
          </div>
        </section>

        <section className="projects-section" ref={projectsRef}>
          <h2 className="section-title">Featured Projects</h2>
          <div className="carousel-container">
            <Carousel
              responsive={responsive}
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5s"
              containerClass="carousel-container"
            >
              <ProjectCard
                title="EyeWitness"
                imageUrl={EyeWitness}
                description="EyeWitness is a minimalist Progressive Web App that allows witnesses to quickly record, save, and share video evidence from any device with a camera and web browser. Built with accessibility and reliability in mind, it works across a wide range of devices and network conditions."
                repoUrl="https://github.com/mlmyerson/EyeWitness"
                technologies={["JavaScript", "HTML", "CSS", "Python", "Docker"]}
                demoUrl="https://eye.newrosesociety.com"
              />
              <ProjectCard
                title="CA-Research"
                imageUrl={CaResearch}
                description="Dive into the mesmerizing world of Elementary Cellular Automata (ECAs), where simple rules ignite dazzling patterns. Experiment with binary states or explore “Rule Index” mode to uncover deeper structural rhythms."
                repoUrl="https://github.com/mlmyerson/CA-Research"
                technologies={["JavaScript", "HTML", "CSS"]}
                demoUrl='https://mlmyerson.github.io/CA-Research/'
              />
              <ProjectCard
                title="Color Economy"
                imageUrl={ColorEconomy}
                description="In ColorEconomy, a dynamic ecosystem unfolds as tessellated patches support life. Creatures emerge as either herbivores or predators."
                repoUrl="https://github.com/newrosesociety/ColorEconomy"
                technologies={["JavaScript", "HTML", "CSS"]}
                demoUrl="https://newrosesociety.github.io/ColorEconomy/"
              />
              <ProjectCard
                title="Gnome Key Binder"
                imageUrl={GnomeKeyBinder}
                description="A high-performance distributed database system with automatic sharding and replication capabilities for fault tolerance and horizontal scaling."
                repoUrl="https://github.com/mlmyerson/GnomeKeyBinder"
                technologies={["C++", "Bash", "CMake"]}
                demoUrl="https://github.com/mlmyerson/GnomeKeyBinder"
              />
            </Carousel>
          </div>
        </section>

        <section className="skills-section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Programming Languages</h3>
              <div className="skill-pills">
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">Python</span>
                <span className="skill-pill">Go</span>
                <span className="skill-pill">Java</span>
                <span className="skill-pill">C/C++</span>
                <span className="skill-pill">Bash</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Frontend & UI</h3>
              <div className="skill-pills">
                <span className="skill-pill">React.js</span>
                <span className="skill-pill">TypeScript</span>
                <span className="skill-pill">JavaFX</span>
                <span className="skill-pill">CSS/SASS</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend & Databases</h3>
              <div className="skill-pills">
                <span className="skill-pill">Node.js</span>
                <span className="skill-pill">PostgreSQL</span>
                <span className="skill-pill">SQLite</span>
                <span className="skill-pill">REST APIs</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Development Tools</h3>
              <div className="skill-pills">
                <span className="skill-pill">Git</span>
                <span className="skill-pill">VS Code</span>
                <span className="skill-pill">Vim</span>
                <span className="skill-pill">Unity</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>DevOps & Infrastructure</h3>
              <div className="skill-pills">
                <span className="skill-pill">Docker</span>
                <span className="skill-pill">Kubernetes</span>
                <span className="skill-pill">Envoy</span>
                <span className="skill-pill">CI/CD</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <div className="social-links">
            <a href="https://github.com/mlmyerson" className="social-icon">GitHub</a>
            <a href="https://www.linkedin.com/in/michaelmyerson/" className="social-icon">LinkedIn</a>
          </div>
        </div>
        <p className="copyright">© 2025 Michael Myerson. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
