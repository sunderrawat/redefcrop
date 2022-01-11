import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import getCookie from '../utils/getCookie';
import useRender from '../hooks/useAlertRender';
import Button from './Button';
import styles from './Nav.module.css';

function Nav() {
  const dispatch = useDispatch();
  const { alertRender } = useRender();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  // console.log(navigate);
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const isOpen = useSelector((state) => state.auth.isOpen);

  useEffect(() => {
    let token = getCookie('token');
    let user = localStorage.getItem('user');
    let userData = JSON.parse(user);
    if (userData && userData.name) {
      setUserData(userData);
    }
    // console.log(token);
    // console.log(JSON.parse(user));
    if (token) {
      dispatch(authActions.login());
    }
  }, [isLogin, isOpen]);
  const signupClickHandler = () => {
    console.log('signup clicked');
    dispatch(authActions.modalSelection('signup'));
    dispatch(authActions.loginModel());
    console.log(isOpen);
  };
  const loginClickHandler = () => {
    console.log('login clicked');
    dispatch(authActions.modalSelection('login'));
    dispatch(authActions.loginModel());
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate('/');
    alertRender('success', 'Logout Success');
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/">
          <img
            src="https://redefcorp.in/wp-content/uploads/2017/12/Logo.png"
            alt="logo"
            className={styles.logo}
          />
        </Link>
      </div>
      <ul className={`${styles.list} ${isLogin && styles.flex_basis}`}>
        {isLogin ? (
          <>
            <li className={styles.name}>{userData && userData.name}</li>
            <li className={`${styles.name} ${styles.hide}`}>
              {userData && userData.role}
            </li>
            <li className={`${styles.name} ${styles.hover}`}>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Button name="Logout" onClick={logoutHandler}></Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button name="SignUp" onClick={signupClickHandler}></Button>
            </li>
            <li>
              <Button name="Login" onClick={loginClickHandler}></Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
