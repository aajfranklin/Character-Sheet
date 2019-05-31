import React  from 'react';
import {cacheStat, revertStat, toggleShowError, updateStat, updateStatSuccess} from '../../actions/actionCreators';
import { INVALID_STAT } from '../Error/ErrorTypes';
import { connect } from 'react-redux';

export function Stat({beingEdited, cacheStat, handleBlur, stat, stats, updateStatLocally}) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') document.activeElement.blur();
    };

    return (
        stat === beingEdited ?
            <textarea value={stats[stat]} onChange={updateStatLocally} onBlur={handleBlur} onKeyDown={handleKeyDown}/>
            : <span onClick={cacheStat}>{stats[stat]}</span>
    )
}

function mapStateToProps(state) {
    return {
        stats: state.app.stats,
        beingEdited: state.app.statCache.stat
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        handleBlur: (e) => {
            const value = e.target.value;
            if (isNaN(value)|| value === '') {
                dispatch(revertStat(ownProps.stat));
                dispatch(toggleShowError(INVALID_STAT));
            } else {
                dispatch(updateStat(ownProps.stat, parseInt(value)));
                dispatch(cacheStat(''));
            }
        },
        updateStatLocally: (e) => {
            dispatch(updateStatSuccess(ownProps.stat, e.target.value));
        },
        cacheStat: () => {
            dispatch(cacheStat(ownProps.stat));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat);
