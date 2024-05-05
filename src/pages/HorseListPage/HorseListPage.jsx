import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAllHorses from '../../hooks/useAllHorses';
import styles from './HorseListPage.module.css';

function HorseListPage() {
    const { horses, loading, error } = useAllHorses();
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleHorseClick = (id) => {
        navigate(`/horses/${id}`);
    };

    const toggleFavorite = (horseId) => {
        const updatedFavorites = favorites.includes(horseId)
            ? favorites.filter((favId) => favId !== horseId)
            : [...favorites, horseId];
        setFavorites(updatedFavorites);
    };

    // Calculate the currently displayed horses
    const indexOfLastHorse = currentPage * itemsPerPage;
    const indexOfFirstHorse = indexOfLastHorse - itemsPerPage;
    const currentHorses = horses.slice(indexOfFirstHorse, indexOfLastHorse);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1 className={styles.title}>Available Horses</h1>
            <div className={styles.horseList}>
                {currentHorses.map(horse => (
                    <div key={horse._id} className={styles.horseCard} onClick={() => handleHorseClick(horse._id)}>
                        {horse.name}
                        <span
                            className={`${styles.favoriteIcon} ${
                                favorites.includes(horse._id) ? styles.favoriteActive : ''
                            }`}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the horse card click event from firing
                                toggleFavorite(horse._id);
                            }}
                        >
                            &#9734; {/* Unicode star outline */}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                {[...Array(Math.ceil(horses.length / itemsPerPage)).keys()].map(x => (
                    <button key={x + 1} onClick={() => paginate(x + 1)} className={currentPage === x + 1 ? styles.active : ''}>
                        {x + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default HorseListPage;
