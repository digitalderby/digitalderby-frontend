import { useState, useEffect } from 'react';

const useAllHorses = () => {
    const [horses, setHorses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                const response = await fetch('/api/horses');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setHorses(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching all horses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHorses();
    }, []);

    return { horses, loading, error };
};

export default useAllHorses;
