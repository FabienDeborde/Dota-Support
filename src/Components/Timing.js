import React from 'react';

const Timing = (props) => {

  return (
    <div className={props.name + " timing"}>
      <div className="level">{props.level}</div>
      <div className="time">{props.time}</div>
    </div>
  );
};

export default Timing;
