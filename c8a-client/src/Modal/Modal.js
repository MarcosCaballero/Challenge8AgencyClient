import React from "react";
import "./modal.css";

const Modal = props => {
  const { setVisible, visible, firstName } = props;

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="container-modal">
          <div className="container-modal__blur"></div>
          <div className="container-modal__text">
            <div
              className="container-modal__button-close"
              onClick={() => onClose()}
            ></div>
            <h2>¡Muchas gracias {firstName}!</h2>
            <p>
              Nos pondremos en contacto contigo a la brevedad al correo
              electrónico que llenaste en el formulario.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
