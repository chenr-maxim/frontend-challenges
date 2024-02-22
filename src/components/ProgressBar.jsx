import React, { useRef, useEffect, useState } from 'react';
import { PROGRESS_BAR_BREAKPOINTS } from '../labels/constants';

import './ProgressBar.scss';

const ProgressBar = ({ fade, progress, toggleBreakpoint }) => {
  const [isApproaching, setIsApproaching] = useState(false);
  const progressBarRef = useRef(null);
  const progressBarWrapperRef = useRef(null);

  // we check if progress is within range of a breakpoint and if it is
  // update boolean so we can dynamically add slow-animation css class
  useEffect(() => {
    if (toggleBreakpoint) {
      if (progress) {
        if (
          PROGRESS_BAR_BREAKPOINTS.some(
            (elem) => elem - 5 <= progress && progress <= elem + 5
          )
        ) {
          setIsApproaching(true);
        } else {
          setIsApproaching(false);
        }
      }
    }
  }, [progress]);

  return (
    <div className={`progress-bar-row ${fade ? 'hide' : 'show'}`}>
      <div ref={progressBarWrapperRef} className="progress-bar-wrapper">
        <div
          ref={progressBarRef}
          className={`progress-bar ${isApproaching ? 'slow-animation' : ''}`}
          style={{
            width: `${progress}%`,
          }}></div>
      </div>
      <div className="progress-bar-percentage">{progress}%</div>
    </div>
  );
};

export default ProgressBar;
