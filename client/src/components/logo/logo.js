import styles from './logo.module.scss';
import { BiDrink } from "react-icons/bi";
function Logo() {
    return (
        <div className={styles.wrapper}>
            <BiDrink className={styles.icon} />
            <h1>drinkguide</h1>
            <p>Discover your bar</p>
        </div>
    );
}

export default Logo;