import React from 'react';

import './ProgressBar.scss';

const ProgressBar = ({ fade, progress }) => {
  return (
    <div className={`progress-bar-row ${fade ? 'hide' : 'show'}`}>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
          }}></div>
      </div>
      <div className="progress-bar-percentage">{progress}%</div>
    </div>
  );
};

export default ProgressBar;
