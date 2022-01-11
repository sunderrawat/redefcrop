import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { alertActions } from '../store/alert';
import classes from './Auth.module.css';
import Loading from './Loading/Loading';
import styles from './../components/Form/Form.module.css';
import Button from './Button';
import apiUrl from '../apiUrl';
import useAlertRender from '../hooks/useAlertRender';

function Auth(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { alertRender } = useAlertRender();
  const modelSelect = useSelector((state) => state.auth.modelSelect);
  // console.log('modelSelectRedux ');
  // const [modelSelect, setModelSelect] = useState();

  //signup handler
  const signupHandler = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      console.log('signup clicked');
      //store form data
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        passwordConfirm: e.target.confirm.value,
        role: e.target.role.value,
      };
      //check some data validation
      if (
        data.name.length < 4 ||
        data.email.length < 5 ||
        data.password.length < 6
      ) {
        console.log('invalid data input');
        setIsLoading(false);
        alertRender('error', 'Invalid Data');
        return;
      }
      //check password is same
      if (data.password !== data.passwordConfirm) {
        console.log('password are not matched');
        alertRender('error', 'password not matched');
        setIsLoading(false);
        return;
      }

      //post data to server
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.ok) {
        console.log('Invalid data post');
        setIsLoading(false);
        alertRender('error', 'Invalid data posted try again!');
      }

      const signupData = await response.json();
      console.log(signupData);
      if (signupData.token) {
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = `token=${signupData.token};expires=Sun, 1 Jan 2025 00:00:00 UTC;path="/"`;
      }
      if (signupData.status === 'success') {
        localStorage.setItem('user', JSON.stringify(signupData.data.user));
        alertRender('success', 'Account Creation Success');
        dispatch(authActions.modalSelection('nothing'));
        dispatch(authActions.loginModelCustom(false));
        setIsLoading(false);
        navigate('/projects');
      }
      //clear form input
      e.target.name.value = '';
      e.target.email.value = '';
      e.target.password.value = '';
      e.target.confirm.value = '';
      e.target.role.defaultValue = '';
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      alertRender('error', 'something went wrong try again~');
    }
  };

  const loginHandler = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      if (data.email.length < 5 || data.password.length < 6) {
        console.log('invalid data');
        alertRender('error', 'Invaild data of email and password');
        setIsLoading(false);
        return;
      }
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) {
        setIsLoading(false);
        alertRender('error', 'login failed ');
        return;
      }
      if (response.ok) {
        const user = await response.json();
        if (!user.token) {
          setIsLoading(false);
          return alertRender('error', 'login failed ');
        }
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = `token=${user.token}; expires=Sun, 1 Jan 2025 00:00:00 UTC;path="/"`;
        localStorage.setItem('user', JSON.stringify(user.user));
        dispatch(authActions.login());
        alertRender('success', 'User Login success');
        setIsLoading(false);
        dispatch(authActions.loginModel());
        navigate('/projects');
      }
    } catch (err) {
      console.log(err);
      setIsLoading(true);
      alertRender('error', 'login failed ');
    }
    //clear form input
    e.target.email.value = '';
    e.target.password.value = '';
  };

  const signupClickHandler = () => {
    dispatch(authActions.modalSelection('signup'));
    // setModelSelect('signup');
  };

  const loginClickHandler = () => {
    dispatch(authActions.modalSelection('login'));
    // setModelSelect('login');
  };

  return (
    <div className={classes.container}>
      <div className={classes.upper}>
        <h2 className={classes.upper__heading}>
          Welcome to Ipangram Project Tool
        </h2>
        <div className={classes.selection}>
          <h2 className={classes.select__signup} onClick={signupClickHandler}>
            SignUp
          </h2>
          <h2 className={classes.select__login} onClick={loginClickHandler}>
            Login
          </h2>
        </div>
      </div>
      <div className={classes.bottom}>
        {modelSelect === 'signup' ? (
          <form className={styles.form} onSubmit={signupHandler}>
            <label htmlFor="name">Full Name</label>
            <input name="name" type="text" id="name" />
            <label htmlFor="email">Email</label>
            <input required name="email" type="email" id="email" />
            <label htmlFor="password">Password</label>
            <input required name="password" type="password" id="password" />
            <label htmlFor="confirm">Confirm Password</label>
            <input required name="confirm" type="password" id="confirm" />
            <div className={styles.radio__container}>
              <div className={styles.radio__group}>
                <label htmlFor="employee">
                  Employee
                  <input
                    type="radio"
                    name="role"
                    id="employee"
                    value="employee"
                    defaultChecked
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
              <div className={styles.radio__group}>
                <label htmlFor="mentor">
                  Mentor
                  <input type="radio" name="role" value="mentor" id="mentor" />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            </div>
            {isLoading ? (
              <Loading></Loading>
            ) : (
              <Button name="Signup" className="model"></Button>
            )}
          </form>
        ) : modelSelect === 'login' ? (
          <form className={styles.form} onSubmit={loginHandler}>
            <label htmlFor="login__email">Email</label>
            <input required name="email" type="email" id="login__email" />
            <label htmlFor="login__password">Password</label>
            <input
              required
              name="password"
              type="password"
              id="login__password"
            />
            {isLoading ? (
              <Loading></Loading>
            ) : (
              <Button name="Login" className="model"></Button>
            )}
          </form>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Auth;
