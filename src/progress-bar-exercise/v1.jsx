import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import {
  REQUEST_DURATION_90_PERC,
  REQUEST_DURATION,
  HALF_SECOND,
  ONE_SECOND,
} from '../labels/constants';

import './v1.scss';

const V1 = () => {
  const [progress, setProgress] = useState(0);
  const [requestActive, setRequestActive] = useState(false);

  // onFinishRequest is for fading the progress bar
  const [onFinishRequest, setOnFinishRequest] = useState(false);
  const [toggleBreakPoint, setToggleBreakPoint] = useState(false);

  // we need refs for interval and timeout for when the requests finish, and progress
  const intervalRef = useRef(null);
  const finishRequestTimeoutRef = useRef(null);

  // have a start fake request that uses a useInterval to count to 15
  // calulates a increment that updates every second, and upon finishing
  // we clean up the interval and return updatedProgress to the Ref

  const startFakeRequest = () => {
    setProgress(0);
    setRequestActive(true);
    setOnFinishRequest(false);
    const increment = REQUEST_DURATION_90_PERC / REQUEST_DURATION / 2;

    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= REQUEST_DURATION_90_PERC) {
          clearInterval(intervalRef.current);
          return prevProgress;
        }

        return prevProgress + increment;
      });
    }, HALF_SECOND);
  };

  // this function stops the request and sets a timeout for 1s
  // and the callback sets progress to 100 and updates the setOnFinishRequest boolean

  const stopFakeRequest = () => {
    setOnFinishRequest(true);
    setRequestActive(false);

    finishRequestTimeoutRef.current = setTimeout(() => {
      setProgress(100);
      clearInterval(intervalRef.current);
    }, HALF_SECOND);
  };

  const onChange = () => {
    setToggleBreakPoint((prevFlag) => !prevFlag);
  };

  // clean up interval and timeout ref after unmount
  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(finishRequestTimeoutRef.current);
    };
  }, []);

  return (
    <div className="v1-container">
      <ProgressBar
        fade={onFinishRequest}
        progress={progress}
        toggleBreakpoint={toggleBreakPoint}
      />
      <div className="button-row">
        <Button
          onClick={startFakeRequest}
          disabled={requestActive}
          color="green">
          {requestActive ? `LOADING...` : `START REQUEST`}
        </Button>
        <Button onClick={stopFakeRequest} disabled={!requestActive} color="red">
          FINISH REQUEST
        </Button>
      </div>
      <div className="toggle-container">
        <label htmlFor="breakpointToggle">
          <input
            id="breakpointToggle"
            data-testid="breakpointToggle"
            type="checkbox"
            value={toggleBreakPoint}
            onClick={onChange}
          />
          <span>Toggle Breakpoints</span>
        </label>
      </div>
    </div>
  );
};

export default V1;
