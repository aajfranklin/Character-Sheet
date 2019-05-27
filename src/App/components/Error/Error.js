import React from 'react';
import { connect } from 'react-redux';
import { toggleShowError } from '../../actions/actionCreators';
import Button from '../Button/Button';
import './Error.css';

function Error({message, closeError}) {
    return(
        <div className='error'>
            <p>{message}</p>
            <div>
                <Button clickHandler={closeError} label='OK'/>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        message: state.app.errorMessage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        closeError: () => dispatch(toggleShowError(''))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
