import { useState, useEffect } from 'react';

const useHorseDetails = (horseId) => {
    const [horse, setHorse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorse = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/horses/${horseId}`);
                console.log('Response:', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched horse data:', data);
                setHorse(data);
            } catch (error) {
                console.error("Error fetching horse details:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (horseId) {
            fetchHorse();
        }
    }, [horseId]);

    return { horse, loading, error };
};


export default useHorseDetails;
