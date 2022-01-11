import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import Auth from './../Auth';
import classes from './Modal.module.css';

const LoginModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick}></Backdrop>,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <div className={`${classes.modal} ${classes.login}`}>
          <Auth></Auth>
        </div>,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default LoginModal;
