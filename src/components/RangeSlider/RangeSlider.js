import { h } from 'preact';
import Slider from "rc-slider";
import { useEffect, useState } from "preact/hooks";
import { connectRange } from "react-instantsearch-dom";

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const [stateMin, setStateMin] = useState(min);
  const [stateMax, setStateMax] = useState(max);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ([min, max]) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ([min, max]) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <div className="af-is-widget__slider">
      <Slider
        range
        min={min}
        max={max}
        value={[stateMin, stateMax]}
        onChange={onValuesUpdated}
        onAfterChange={onChange}
        autoFocus={false}
        disabled={!isMounted}
      />
      <div className="af-is-widget__slider__label af-is-widget__slider__labels">
        <div className="af-is-widget__slider__label af-is-widget__slider__label-min">
          {stateMin}
        </div>
        <div className="af-is-widget__slider__label af-is-widget__slider__label-max">
          {stateMax}
        </div>
      </div>
    </div>
  );
};

export default connectRange(RangeSlider);
