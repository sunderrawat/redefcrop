import styles from './AlertToast.module.css';

function AlertToast(props) {
  return (
    <div
      className={styles.container}
      style={
        props.type === 'error'
          ? { backgroundColor: 'rgba(180, 14, 14, 0.685)' }
          : { backgroundColor: 'rgba(14, 180, 42, 0.925)' }
      }
    >
      <p className={styles.text}>{props.message}</p>
    </div>
  );
}

export default AlertToast;
