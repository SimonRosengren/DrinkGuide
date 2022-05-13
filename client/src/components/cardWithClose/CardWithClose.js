import styles from "./CardWithClose.module.scss";
import { BiX } from 'react-icons/bi'

function CardWithClose({content, unmount}) {

    const handleClose = () => {
        unmount()
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.closeButton} onClick={handleClose}><BiX/></div>
        {content}
    </div>
  );
}

export default CardWithClose;
