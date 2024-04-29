import { useParams } from 'react-router-dom';
import useHorseDetails from '../../hooks/useHorseDetails';

function HorseDetailPage() {
    const { id } = useParams();
    const { horse, loading, error } = useHorseDetails(id);

    if (loading) return <p>Loading horse details...</p>;
    if (error) return <p>Error loading details: {error.message}</p>; // Display the error message

    return (
        <div>
            <h1>Horse Details: {horse?.name}</h1> {/* Optional chaining */}
            <p>Color: {horse?.color}</p> {/* Optional chaining */}
            <p>Icons: {horse?.icons && horse.icons.map(icon => <span key={icon}>{icon}</span>)}</p> {/* Optional chaining */}
            <div>
                <h2>Stats:</h2>
                <ul>
                    <li>Top Speed: {horse?.stats?.topSpeed}</li> {/* Optional chaining */}
                    <li>Stamina: {horse?.stats?.stamina}</li> {/* Optional chaining */}
                    <li>Acceleration: {horse?.stats?.acceleration}</li> {/* Optional chaining */}
                </ul>
            </div>
        </div>
    );
}

export default HorseDetailPage;
