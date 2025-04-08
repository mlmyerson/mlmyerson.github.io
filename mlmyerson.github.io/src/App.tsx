import './App.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProjectCard from './components/ProjectCard.tsx';

function App() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div className='layout'>
        <div className='about'>
          <h1>About Me</h1>
          <br/>
          <p className='site-text'>
            Hello, I'm Michael Myerson—a proud Floridian, Software Engineer, and Engineering Team Leader with over a decade of transforming complex challenges into elegant solutions. I'm passionate about building educational games, simulations, and innovative software that make complex ideas accessible and engaging. Whether I'm coding meticulously or orchestrating a team's vision, I thrive on creating technology that sparks connection and inspires growth.
          </p>
          <br/>
          <br/>
          <p className='site-text'>
            My journey has taken me from designing robust back-end systems to crafting intuitive user interfaces, always with an eye on long-term impact and meaningful collaboration. Off the clock, I dive into immersive video game worlds and lose myself in sci-fi literature and the intricate wonders of complexity science. I also find balance and energy in my love for punk rock and the focused discipline of rifle shooting, letting these passions fuel my creativity and innovation.
          </p>
          <br/>
          <br/>
          <p className='site-text'>
            Since I was eight, when I first heard "God Save the Queen," punk rock captured my heart and kindled a spirit of rebellion and authenticity—a sentiment I carry into every facet of my life. Guided by my motto, "I get the job done," I am deeply committed to spreading knowledge and education freely to everyone. My world is enriched daily by the love of my amazing wife and the laughter of my two incredible sons, all while I enjoying fried alligator, frog legs, and goat, just like you'd expect a Florida boy to do!
          </p>
        </div>
        <div className='portrait'>
          <img src="/src/assets/Headshot.jpg" alt="React logo" className="portrait-img" />
        </div>
        <div className='successes'>
          <h1>Successes</h1>
          <h4>Revolutionizing Interfaces and Systems</h4>
          <p className='site-text'>
            At the Naval Air Warfare Center Training Systems Division, I led the development of a sophisticated Java and JavaFX interface and an innovative REST API designed with Go and JavaScript. This work not only streamlined data integration but also shaved crucial milliseconds off system response times—an efficiency that proved vital in high-security environments.
          </p>
          <h4>    Orchestrating Distributed Deployments</h4>
          <p className='site-text'>
            I architected container networks using Docker and Envoy to deploy over 16 distributed database systems seamlessly. This forward-thinking approach ensured reliable, uninterrupted data flow and elevated the operational robustness across multiple projects.
          </p>
          <h4>    Empowering Teams and Securing Major Wins</h4>
          <p className='site-text'>
            In my role as Production Manager at E2i Studios, I coordinated teams of artists, programmers, and interns, negotiating and delivering a multi-million-dollar contract with the University of Central Florida. This experience underscored my commitment to guiding diverse teams toward exceptional outcomes.
          </p>
          <h4> Mission-Driven Excellence in High-Stress Environments</h4>
          <p className='site-text'>
            Serving as an Infantry Soldier in the US Army taught me precision under pressure. I maintained critical communications during intense operations, trained team members to enhance mission responsiveness, and was honored with the Army Achievement Medal for my contributions—a testament to the values of dedication and resilience.
          </p>
          <h4>    Pioneering Early-Stage Innovation</h4>
          <p className='site-text'>
            As a Research Developer at E2i Studios, I was at the forefront of interactive museum kiosk software and simulation prototyping. This role allowed me to experiment with novel hardware controllers and creative solutions, laying the groundwork for future innovations in interactive technology.
          </p>
        </div>
        <div className='carousel'>
          <Carousel responsive={responsive}>
            <ProjectCard 
              title="Card 1" 
              imageUrl="/src/assets/react.svg" 
              description="Description of project 1" 
            />
            <ProjectCard 
              title="Card 2" 
              imageUrl="/src/assets/react.svg" 
              description="Description of project 2" 
            />
            <ProjectCard 
              title="Card 3" 
              imageUrl="/src/assets/react.svg" 
              description="Description of project 3" 
            />
            <ProjectCard 
              title="Card 4" 
              imageUrl="/src/assets/react.svg" 
              description="Description of project 4" 
            />
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default App
