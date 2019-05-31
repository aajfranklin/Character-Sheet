import React  from 'react';
import {cacheStat, revertStat, toggleShowError, updateStat, updateStatSuccess} from '../../actions/actionCreators';
import { INVALID_STAT } from '../Error/ErrorTypes';
import { connect } from 'react-redux';

export function Stat({beingEdited, cacheStat, handleBlur, stat, stats, updateStatLocally}) {
    return (
        stat === beingEdited ?
            <textarea value={stats[stat]} onChange={updateStatLocally} onBlur={handleBlur}/>
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
            if (isNaN(e.target.value)) {
                dispatch(revertStat(ownProps.stat));
                dispatch(toggleShowError(INVALID_STAT));
            } else {
                dispatch(updateStat(ownProps.stat, parseInt(e.target.value)));
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
