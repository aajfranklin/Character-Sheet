import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { popError } from '../../actions/actionCreators';
import Button from '../Button/Button';
import './Error.css';

export function Error({ errors, removeError }) {
  return (
    <div className="error">
      <p>{errors[0]}</p>
      <div>
        <Button clickHandler={removeError} label="OK" />
      </div>
    </div>
  );
}

Error.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeError: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    errors: state.app.errorQueue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeError: () => dispatch(popError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
