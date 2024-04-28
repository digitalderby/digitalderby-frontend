
import { useHistory } from 'react-router-dom';

function HorseList({ horses }) {
    const history = useHistory();

    const handleHorseClick = (id) => {
        history.push(`/horses/${id}`);
    };

    return (
        <ul>
            {horses.map(horse => (
                <li key={horse._id} onClick={() => handleHorseClick(horse._id)}>
                    {horse.name}
                </li>
            ))}
        </ul>
    );
}

export default HorseList;
