import './Star.css';
import { RiStarLine, RiStarFill } from '@remixicon/react';

interface StarProps {
    theme: 'light' | 'dark';
}

const Star: React.FC<StarProps> = ({ theme }) => {
    const top = Math.random() * 100;
    const left = Math.random() * -100;
    const duration = Math.random() * 10 + 5;

    const style = {
        top: `${top}vh`,
        left: `${left}vw`,
        animationDuration: `${duration}s`
    };

    return (
        <div>
            {theme === 'light'
                ? <RiStarLine className='star light' style={style} />
                : <RiStarFill className='star dark' style={style} />
            }
        </div>
    );
};

export default Star;