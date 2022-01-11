import styles from './Button.module.css';

function Button(props) {
  return (
    <button
      className={`${styles.btn} ${
        props.className === 'model' ? styles.model : ''
      } ${props.type === 'danger' ? styles.danger : ''}`}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default Button;
