import { useParams } from 'react-router-dom';
import useHorseDetails from '../../hooks/useHorseDetails';
import { useNavigate } from 'react-router-dom';
import styles from './HorseDetailPage.module.css'


function HorseDetailPage() {
    const { id } = useParams();
    const { horse, loading, error } = useHorseDetails(id);
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/horses');
    };

    if (loading) return <p>Loading horse details...</p>;
    if (error) return <p>Error loading details: {error.message}</p>; 
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{horse?.name}</h1> 
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Color: </span>
                <span className={styles.statValue}>{horse?.color}</span>
            </div> 
            <div className={styles.statItem}>
                <span className={styles.statLabel}>Icons: </span>
                {horse?.icons && horse.icons.map(icon => <span key={icon} className={styles.statValue}>{icon}</span>)}
            </div> 
            <div className={styles.statItem}>
                <h2 className={styles.statLabel}>Stats:</h2>
                <ul>
                    <li>Top Speed: {horse?.stats?.topSpeed}</li> 
                    <li>Stamina: {horse?.stats?.stamina}</li> 
                    <li>Acceleration: {horse?.stats?.acceleration}</li> 
                </ul>
            </div>
            <button onClick={handleRedirect}>Return</button>
        </div>
    );
}

export default HorseDetailPage;

