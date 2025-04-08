interface TimelineItemProps {
  icon: string;
  title: string;
  description: string;
}

function TimelineItem({ icon, title, description }: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <div className="timeline-icon">{icon}</div>
      <div className="timeline-content">
        <h3>{title}</h3>
        <p className="site-text">{description}</p>
      </div>
    </div>
  );
}

export default TimelineItem;