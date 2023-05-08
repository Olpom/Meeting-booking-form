import React from "react";
import "./InfoToolTip.css";

function InfoToolTip({onClose}) {
  return (
    <div className="popup">
      <div className="popup__content">
        <button type="button" className="popup__button-close" onClick={onClose}></button>
        <h2 className="popup__title">Переговорная комната успешно забронирована!</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;