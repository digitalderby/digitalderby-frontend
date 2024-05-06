import React, { useContext, useEffect, useState } from 'react';
import { api } from './../../services/apiConnection';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../contexts/SocketContext';
import styles from './HorseListPage.module.css';

function HorseListPage() {
    const { clientStatus } = useContext(SocketContext);
    const navigate = useNavigate();
    const [horses, setHorses] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchHorses = async () => {
            setLoading(true);
            try {
                const response = await api.get('/horses');
                setHorses(response.data);
                if (clientStatus?.username) {
                    const favsResponse = await api.get(`/users/${clientStatus.username}/favoriteHorses`);
                    setFavorites(favsResponse.data.map(h => h._id));
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch horses');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHorses();
    }, [clientStatus?.username]);

    const handleHorseClick = id => {
        navigate(`/horses/${id}`);
    };

    const toggleFavorite = async (horseId) => {
        const isFavorite = favorites.includes(horseId);
        const method = isFavorite ? 'delete' : 'post';
        const username = clientStatus?.username;
        if (!username) return;
    
        try {
            setFavorites(prev => isFavorite
                ? prev.filter(id => id !== horseId)
                : [...prev, horseId]);
    
            const endpoint = `/users/${username}/favoriteHorses/${isFavorite ? horseId : ''}`;
            await api[method](endpoint, isFavorite ? {} : { horseId });
    
        } catch (error) {
            console.error('Failed to update favorites', error);
            setFavorites(prev => isFavorite
                ? [...prev, horseId]
                : prev.filter(id => id !== horseId));
        }
    };
    
    const indexOfLastHorse = currentPage * itemsPerPage;
    const indexOfFirstHorse = indexOfLastHorse - itemsPerPage;
    const currentHorses = horses.slice(indexOfFirstHorse, indexOfLastHorse);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <h1 className={styles.title}>Available Horses</h1>
            <div className={styles.horseList}>
                {currentHorses.map(horse => (
                    <div key={horse._id} className={styles.horseCard} onClick={() => handleHorseClick(horse._id)}>
                        {horse.name}
                        <span
                            className={`${styles.favoriteIcon} ${favorites.includes(horse._id) ? styles.favoriteActive : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
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
