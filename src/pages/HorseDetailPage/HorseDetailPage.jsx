
import { useParams } from 'react-router-dom';
import useHorseDetails from '../../hooks/useHorseDetails';

function HorseDetailPage() {
    const { id } = useParams();
    const { horse, loading, error } = useHorseDetails(id);

    if (loading) return <p>Loading horse details...</p>;
    if (error) return <p>Error loading details: {error}</p>;

    return (
        <div>
            <h1>Horse Details: {horse.name}</h1>
            <p>Color: {horse.color}</p>
            <p>Stats: {JSON.stringify(horse.stats)}</p>
            {/* Display other details */}
        </div>
    );
}

export default HorseDetailPage;
