import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Slider from 'rc-slider';
import { connectRange } from 'react-instantsearch-dom';
import useWidgetContext from '../../hooks/useWidgetContext';

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const { isFetchingSettings } = useWidgetContext();
  const [stateRange, setStateRange] = useState({
    min: min || 0,
    max: max || 0,
  });

  useEffect(() => {
    if (canRefine) {
      setStateRange({
        min: currentRefinement.min,
        max: currentRefinement.max,
      });
    }
  }, [canRefine, currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ([minValue, maxValue]) => {
    if (currentRefinement.min !== minValue || currentRefinement.max !== maxValue) {
      refine({ min: minValue, max: maxValue });
    }
  };

  const onValuesUpdated = ([minValue, maxValue]) => {
    setStateRange({
      min: minValue,
      max: maxValue,
    });
  };

  return (
    <div className="af-is-widget__slider">
      <Slider
        range
        min={min}
        max={max}
        value={[stateRange.min, stateRange.max]}
        onChange={onValuesUpdated}
        onAfterChange={onChange}
        disabled={isFetchingSettings}
      />
      <div className="af-is-widget__slider__label af-is-widget__slider__labels">
        <div className="af-is-widget__slider__label af-is-widget__slider__label-min">
          {stateRange.min}
        </div>
        <div className="af-is-widget__slider__label af-is-widget__slider__label-max">
          {stateRange.max}
        </div>
      </div>
    </div>
  );
};

export default connectRange(RangeSlider);
