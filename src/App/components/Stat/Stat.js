import React  from 'react';
import {cacheStat, revertStat, toggleShowError, updateStat, updateStatSuccess} from '../../actions/actionCreators';
import { INVALID_STAT } from '../Error/ErrorTypes';
import { connect } from 'react-redux';

export function Stat({beingEdited, cacheStat, cachedValue, revertWithError, revertWithoutError, stat, stats, updateStat, updateStatLocally}) {

    const handleBlur = (e) => {
        const value = e.target.value;
        if (isNaN(value) || value === '') {
            revertWithError();
        } else if (value === cachedValue) {
            revertWithoutError();
        } else {
            updateStat(stat, parseInt(value));
        }
    };

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
        beingEdited: state.app.statCache.stat,
        cachedValue: state.app.statCache.value
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        revertWithError: () => {
            dispatch(revertStat(ownProps.stat));
            dispatch(toggleShowError(INVALID_STAT));
        },
        revertWithoutError: () => {
            dispatch(revertStat(ownProps.stat));
        },
        updateStat: (stat, value) => {
            dispatch(updateStat(stat, value));
            dispatch(cacheStat(''));
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
