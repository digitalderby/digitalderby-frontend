import { useState, useEffect } from 'react';

const useAllHorses = () => {
    const [horses, setHorses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                //placeholder
                // const data = [
                //     { _id: '1', name: 'Thunder', color: 'Black', stats: { speed: 100 } },
                //     { _id: '2', name: 'Lightning', color: 'White', stats: { speed: 110 } },
                //     { _id: '3', name: 'Blaze', color: 'Chestnut', stats: { speed: 105 } },
                // ];
                // setHorses(data);
                // setError(null);


                
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
