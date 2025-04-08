import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface ProjectCardProps {
  title: string;
  imageUrl: string;
  description: string;
}

function ProjectCard({ title, imageUrl, description }: ProjectCardProps) {
  return (
    <div className="carousel-card">
      <Card variant="outlined" raised={true}>
        <CardContent>
          <div className='card-title'>
            {title}
          </div>
          <img src={imageUrl} alt={title} className="card-image" />
          <div className='card-description'>
            {description}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProjectCard;