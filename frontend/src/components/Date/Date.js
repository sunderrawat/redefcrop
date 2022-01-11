import styles from './Date.module.css';
function Date(props) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = props.date.slice(0, 4);
  const month = months[+props.date.slice(5, 7) + 1];
  const day = props.date.slice(8, 10);
  return (
    <div className={styles.date} key={props.date}>
      <span className={styles.small__heading}>{props.name} : </span>
      <span className={styles.text}>
        {day} {month}, {year}
      </span>
    </div>
  );
}
export default Date;
