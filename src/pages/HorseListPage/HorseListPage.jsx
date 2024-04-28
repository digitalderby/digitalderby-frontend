import useAllHorses from '../../hooks/useAllHorses';
import HorseList from '../../components/HorseList/HorseList';

function HorseListPage() {
    const { horses, loading, error } = useAllHorses();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Available Horses</h1>
            <HorseList horses={horses} />
        </div>
    );
}

export default HorseListPage;
