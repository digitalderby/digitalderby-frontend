import { useState, useEffect } from 'react';
import { getAllHorses } from '../services/apiService';

const useAllHorses = () => {
    const [horses, setHorses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                const data = await getAllHorses();
                console.log("Raw fetched data:", data);  // Check what exactly is fetched
                if (Array.isArray(data)) {
                    const uniqueHorses = Array.from(new Map(data.map(horse => [horse['_id'], horse])).values());
                    setHorses(uniqueHorses);
                } else {
                    throw new Error("Data is not an array");
                }
            } catch (error) {
                console.error("Error fetching all horses:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchHorses();
    }, []);

    return { horses, loading, error };
};

export default useAllHorses;
