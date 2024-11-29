
import Star from './Star';
import './StarsBackground.css';

interface StarProps {
  theme: 'light' | 'dark';
}

const StarsBackground: React.FC<StarProps> = ({ theme }) => {
  const numStars = 100;
  const stars = Array.from({ length: numStars }, (_, i) => <Star key={i} theme={theme} />);

  return <div className="stars-background">{stars}</div>;
};

export default StarsBackground;