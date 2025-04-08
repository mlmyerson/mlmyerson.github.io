import { useState, useEffect } from 'react'
import './App.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProjectCard from './components/ProjectCard';
import { motion } from 'framer-motion';
import TimelineItem from './components/TimelineItem';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
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
            onClick={() => setActiveSection('home')}>Home</button>
          <button className={activeSection === 'about' ? 'active' : ''} 
            onClick={() => setActiveSection('about')}>About</button>
          <button className={activeSection === 'projects' ? 'active' : ''} 
            onClick={() => setActiveSection('projects')}>Projects</button>
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
        <section className="about-section">
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
                  <img src="/src/assets/Headshot.jpg" alt="Michael Myerson" className="portrait-img" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="timeline-section">
          <h2 className="section-title">Professional Journey</h2>
          <div className="timeline">
            <TimelineItem 
              icon="🏢"
              title="Naval Air Warfare Center"
              description="Led development of Java/JavaFX interface and REST API with Go and JavaScript, enhancing system response times in high-security environments."
            />
            <TimelineItem 
              icon="🌐"
              title="Distributed Systems Architect"
              description="Architected container networks using Docker and Envoy to deploy 16+ distributed database systems with enhanced reliability and operational robustness."
            />
            <TimelineItem 
              icon="👨‍💼"
              title="Production Manager at E2i Studios"
              description="Coordinated diverse teams, negotiating and delivering a multi-million-dollar contract with the University of Central Florida."
            />
            <TimelineItem 
              icon="🎖️"
              title="US Army Infantry Soldier"
              description="Maintained critical communications during intense operations, trained team members, and was honored with the Army Achievement Medal."
            />
          </div>
        </section>

        <section className="projects-section">
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
                title="Real-Time Chat Application" 
                imageUrl="/src/assets/react.svg" 
                description="A full-stack chat application with real-time messaging, user authentication, and chat rooms." 
                repoUrl="https://github.com/mlmyerson/chat-app"
                technologies={["React", "Socket.io", "Express", "MongoDB"]}
                demoUrl="https://chat-app-demo.netlify.app"
              />
              <ProjectCard 
                title="Algorithmic Trading Bot" 
                imageUrl="/src/assets/react.svg" 
                description="An automated trading system that uses machine learning to analyze market patterns and execute trades with custom risk management strategies." 
                repoUrl="https://github.com/mlmyerson/algo-trader"
                technologies={["Python", "TensorFlow", "pandas", "Alpha Vantage API"]}
              />
              <ProjectCard 
                title="AR Museum Guide" 
                imageUrl="/src/assets/react.svg" 
                description="Mobile application that enhances museum visits by providing interactive AR experiences when visitors scan exhibits." 
                repoUrl="https://github.com/mlmyerson/ar-museum"
                technologies={["Unity", "ARKit", "C#", "Firebase"]}
                demoUrl="https://ar-museum-demo.io"
              />
              <ProjectCard 
                title="Distributed Database System" 
                imageUrl="/src/assets/react.svg" 
                description="A high-performance distributed database system with automatic sharding and replication capabilities for fault tolerance and horizontal scaling." 
                repoUrl="https://github.com/mlmyerson/distributed-db"
                technologies={["Go", "Docker", "Kubernetes", "Envoy"]}
              />
            </Carousel>
          </div>
        </section>

        <section className="skills-section">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Frontend</h3>
              <div className="skill-pills">
                <span className="skill-pill">React</span>
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">TypeScript</span>
                <span className="skill-pill">CSS/SASS</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <div className="skill-pills">
                <span className="skill-pill">Node.js</span>
                <span className="skill-pill">Go</span>
                <span className="skill-pill">Java</span>
                <span className="skill-pill">Python</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>DevOps</h3>
              <div className="skill-pills">
                <span className="skill-pill">Docker</span>
                <span className="skill-pill">Kubernetes</span>
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
            <a href="https://linkedin.com/in/mlmyerson" className="social-icon">LinkedIn</a>
          </div>
        </div>
        <p className="copyright">© 2025 Michael Myerson. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
