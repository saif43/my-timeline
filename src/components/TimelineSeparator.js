import React from 'react';
import './TimelineSeparator.scss';

function Cycle({ active }) {
    if(active){
        return (
            <div className="cycle_active">
                <div className="inner-circle"></div>
            </div>
        )
    }
    return <div className="cycle"></div>
}

const TimelineSeparator = ({active}) => {
  return (
    <div className="main-box">
        <Cycle active={active} />
        <div className="connector"></div>
    </div>
  );
};

export default TimelineSeparator;
