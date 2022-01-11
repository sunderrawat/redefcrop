import ReactDOM from 'react-dom';
import AlertToast from './AlertToast';
import classes from './../Modal/Modal.module.css';

function AlertModal(props) {
  return ReactDOM.createPortal(
    <div className={`${classes.modal} ${classes.alert}`}>
      <AlertToast type={props.type} message={props.message}></AlertToast>
    </div>,
    document.getElementById('overlay-root')
  );
}

export default AlertModal;
