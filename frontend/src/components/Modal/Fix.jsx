import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertActions } from '../../store/alert';
import { authActions } from '../../store/auth';
import AlertModal from '../Alerts/AlertModel';
import LoginModal from './LoginModal';

function Fix(props) {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.alert.showAlert);
  const alertType = useSelector((state) => state.alert.alertType);
  const alertMessage = useSelector((state) => state.alert.alertMessage);
  const isOpen = useSelector((state) => state.auth.isOpen);
  if (showAlert) {
    setTimeout(() => {
      dispatch(alertActions.hideAlert());
    }, 3000);
  }
  //   useEffect(() => {}, []);

  function clickLoginHandler() {
    dispatch(authActions.loginModel());
  }

  return (
    <>
      {showAlert ? (
        <AlertModal type={alertType} message={alertMessage}></AlertModal>
      ) : (
        ''
      )}
      {isOpen ? <LoginModal onClick={clickLoginHandler}></LoginModal> : ''}
    </>
  );
}

export default Fix;
