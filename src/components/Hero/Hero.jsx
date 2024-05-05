import { getImageUrl } from '../../utils'
import { NavLink } from 'react-router-dom';
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Race to Glory with Digital Derby</h1>
        <p className={styles.description}>Where every race is an opportunity to win.</p>
        <NavLink to="/race" className={styles.signupBtn} />
      </div>
      <img src={getImageUrl('hero/HorseHero.png')} alt='hero image of horse' className={styles.heroImg}></img>
    </section>
  )
}

export default Hero