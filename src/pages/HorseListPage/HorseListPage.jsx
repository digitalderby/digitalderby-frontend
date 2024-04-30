
import { useNavigate } from 'react-router-dom';
import useAllHorses from '../../hooks/useAllHorses';
import styles from './HorseListPage.module.css'; 

function HorseListPage() {
    const { horses, loading, error } = useAllHorses();
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleHorseClick = (id) => {
        navigate(`/horses/${id}`);
    };

    return (
        <div>
            <h1 className={styles.title}>Available Horses</h1>
            <div className={styles.horseList}>
                {horses.map(horse => (
                    <div key={horse._id} className={styles.horseCard} onClick={() => handleHorseClick(horse._id)}>
                        {horse.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HorseListPage;
