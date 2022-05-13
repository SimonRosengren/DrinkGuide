import styles from './Footer.module.scss';
function Footer(props) {
    return (
        <div className={styles.wrapper}>
            <p>Built and designed by Simon Rosengren | simonrosengren123@gmail.com </p>
            <p><a href="https://www.flaticon.com/free-icons/cosmopolitan" title="cosmopolitan icons">Cocktail icons created by Freepik - Flaticon</a></p>
        </div>
    );
}

export default Footer;