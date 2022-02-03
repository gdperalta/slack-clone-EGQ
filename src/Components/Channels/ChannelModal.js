import React from "react";
import ReactDOM from "react-dom";
import "../../assets/styles/css/App.css";

const ChannelModal = (props) => {
    return ReactDOM.createPortal(
    <div
      className={`modal ${props.show ? "show" : ""}`}
      onClick={props.onClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title"> {props.title}</h4>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};

export default ChannelModal;
