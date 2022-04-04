import styles from './button.module.scss';
function Button({content, handleClick, className}) {
    return (
        <button className={className} onClick={handleClick}>{content}</button>
    );
}

export default Button;