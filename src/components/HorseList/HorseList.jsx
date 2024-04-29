
import { useNavigate } from 'react-router-dom';
import HorseCard from '../HorseCard/HorseCard';

function HorseList({ horses }) {
    const navigate = useNavigate();

    const handleHorseClick = (id) => {
        navigate(`/horses/${id}`);
    };

    return (
        <div>
            {horses.map(horse => (
                <div key={horse._id} onClick={() => handleHorseClick(horse._id)}>
                    <HorseCard horse={horse} />
                </div>
            ))}
        </div>
    );
}

export default HorseList;
