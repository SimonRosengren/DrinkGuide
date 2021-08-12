import styles from './logo.module.scss';
import { BiDrink } from "react-icons/bi";
function Logo(props) {
    return (
        <div className={styles.wrapper} onClick={() => props.onClick()}>
            <BiDrink className={styles.icon} />
            <div id={styles.innerWrapper}>
                <h1>drinkguide</h1>
                <p>Discover your bar</p>
            </div>
        </div>
    );
}

export default Logo;