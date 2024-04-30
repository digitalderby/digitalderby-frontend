import { createContext, useContext, useState, useEffect } from 'react';
import { getAllHorses } from '../services/apiService';

// Create the context
const HorsesContext = createContext();

// Provider component
export const HorsesProvider = ({ children }) => {
    const [horses, setHorses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHorses = async () => {
            try {
                const data = await getAllHorses();
                if (Array.isArray(data)) {
                    setHorses(data);
                } else {
                    throw new Error("Data is not an array");
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching all horses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHorses();
    }, []);

    return (
        <HorsesContext.Provider value={{ horses, loading, error }}>
            {children}
        </HorsesContext.Provider>
    );
};

// Custom hook to use the context
export const useHorses = () => useContext(HorsesContext);
