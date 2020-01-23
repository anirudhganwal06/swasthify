import React from "react";
import { connect } from "react-redux";

import { setFlashMessage } from "../../actions/flashActions";

const FlashMessage = props => {
  const closeFlash = () => {
    props.setFlashMessage(false, "");
  };

  if (props.flash.showFlash && props.flash.flashTimeout !== "inf") {
    setTimeout(() => {
      props.setFlashMessage(false, "");
    }, props.flash.flashTimeout);
  }

  return (
    <div className="my-3 position-fixed flashMessage">
      {props.flash.showFlash ? (
        <div className="alert alert-dismissible fade show" role="alert">
          {props.flash.flashMessage}
          <button type="button" className="close" onClick={closeFlash}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  flash: state.flash
});

export default connect(mapStateToProps, { setFlashMessage })(FlashMessage);
