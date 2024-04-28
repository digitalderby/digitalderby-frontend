import { useNavigate } from 'react-router-dom';  // Correct import for navigation

function HorseList({ horses }) {
    const navigate = useNavigate();  

    const handleHorseClick = (id) => {
        navigate(`/horses/${id}`);
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
