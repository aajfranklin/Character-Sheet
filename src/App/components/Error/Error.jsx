import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleShowError } from '../../actions/actionCreators';
import Button from '../Button/Button';
import './Error.css';

function Error({ message, closeError }) {
  return (
    <div className="error">
      <p>{message}</p>
      <div>
        <Button clickHandler={closeError} label="OK" />
      </div>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  closeError: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    message: state.app.errorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeError: () => dispatch(toggleShowError('')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
