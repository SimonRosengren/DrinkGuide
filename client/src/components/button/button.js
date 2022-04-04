import styles from './button.module.scss';
function Button({content, handleClick}) {
    return (
        <button onClick={handleClick}>{content}</button>
    );
}

export default Button;