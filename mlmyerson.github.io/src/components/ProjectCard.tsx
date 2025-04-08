import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description: string;
  repoUrl: string;
  technologies?: string[];  // Optional array of tech stack used
  demoUrl?: string;         // Optional demo link
}

function ProjectCard({ title, imageUrl, description, repoUrl, technologies, demoUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (demoUrl) {
      window.open(demoUrl, '_blank');
    }
  };

  const handleRepoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(repoUrl, '_blank');
  };

  return (
    <div className="carousel-card">
      <Card
        variant="outlined"
        raised={isHovered}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`project-card ${isHovered ? 'hovered' : ''}`}
      >
        <CardContent>
          <div className='card-title'>
            {title}
          </div>
          <div className="card-image-container">
            <img src={imageUrl} alt={title} className="card-image" />
          </div>
          <div className='card-description'>
            {description}
            <br/>
            <a href={repoUrl} onClick={handleRepoClick}>Repo</a>
          </div>

          {technologies && (
            <div className="card-technologies">
              {technologies.map((tech, index) => (
                <span key={index} className="tech-badge">{tech}</span>
              ))}
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}

export default ProjectCard;