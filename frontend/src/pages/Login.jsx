import Auth from '../components/Auth';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>SignUp or Login to App</div>
      <Auth></Auth>
    </div>
  );
}

export default Login;
