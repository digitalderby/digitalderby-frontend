import styles from './HorseCard.module.css'; 

const HorseCard = ({ horse }) => {
    return (
        <div className={styles.card}>

            <p className={styles.name}>{horse.name}</p>
        </div>
    );
};

export default HorseCard;
