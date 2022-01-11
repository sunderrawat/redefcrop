import { useDispatch } from 'react-redux';
import { alertActions } from '../store/alert';

function useAlertRender(type, message) {
  const dispatch = useDispatch();
  function alertRender(type, message) {
    dispatch(alertActions.alertType(type));
    dispatch(alertActions.alertMessage(message));
    dispatch(alertActions.showAlert());
  }

  return { alertRender };
}

export default useAlertRender;
