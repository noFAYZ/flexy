import React from 'react';
import * as Slider from '@radix-ui/react-slider';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  formatLabel?: (value: number) => string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  formatLabel = (value) => value.toString()
}) => {
  return (
    <Slider.Root
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      className="relative flex items-center w-full h-5"
    >
      <Slider.Track className="relative h-2 flex-grow rounded-full bg-default-200">
        <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-pink-500 to-orange-600" />
      </Slider.Track>
      {value.map((_, i) => (
        <Slider.Thumb
          key={i}
          className="block w-5 h-5 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Range slider thumb"
        >
          <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2">
            <span className="text-xs">{formatLabel(value[i])}</span>
          </div>
        </Slider.Thumb>
      ))}
    </Slider.Root>
  );
}; 