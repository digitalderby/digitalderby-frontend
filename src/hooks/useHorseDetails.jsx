import { useState, useEffect } from 'react';

const useHorseDetails = (horseId) => {
    const [horse, setHorse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorse = async () => {
            try {
                const response = await fetch(`/api/horses/${horseId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setHorse(data);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching horse details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (horseId) {
            fetchHorse();
        }
    }, [horseId]); // This ensures the hook refetches data if the horseId changes

    return { horse, loading, error };
};

export default useHorseDetails;
