import { Slider } from '@mui/material';
import { alpha } from '@mui/material/styles';

import QuestionLabel from './QuestionLabel';

interface RangeSliderProps {
    label: string 
    min: number
    max: number
    minDistance: number
    steps: number
    type: string
    value: number[]
    setValue: (newValue: number[]) => void
    questionNumber: number;
}

const RangeSlider: React.FC<RangeSliderProps> = (
    { label, min, max, minDistance, steps, type, value, setValue, questionNumber }
    ) => {
    const valueText = (value: number) => {
        return type === 'income' ? `$${value}` : `${value}`
    }

    const marksGenerator = (type: string | undefined) => {
        if (type === 'age') {
            return [
                {
                  value: min,
                  label: `< ${min}`
                },
                {
                    value: 19,
                  },
                {
                  value: (min + max) / 2,
                  label: `${((min + max) / 2).toFixed(0)}`,
                },
                {
                    value: 50,
                  },
                {
                  value: max,
                  label: `${max}+`,
                },
              ];
        }
        return [
            {
              value: min,
              label: `< $10,000`
            },
            {
                value: 32500,
              },
            {
              value: (min + max) / 2,
              label: `$55,000`,
            },
            {
                value: 77500,
              },
            {
              value: max,
              label: `$100,000+`,
            },
          ];
    }

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }   
    
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    return (    
        <div className='mb-6'>
        <QuestionLabel label={label} questionNumber={questionNumber}/>
        <Slider 
            min={min}
            step={steps}
            max={max}  
            marks={marksGenerator(type)}
            getAriaLabel={() => `${label}`}
            value={value} 
            onChange={handleChange}
            valueLabelDisplay='auto'
            valueLabelFormat={valueText}
            getAriaValueText={valueText}
            disableSwap
            sx={{
                color: '#3B447A',
                '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                    boxShadow: `0px 0px 0px 8px ${alpha('#3B447A', 0.16)}`,
                    },
                    '&.Mui-active': {
                    boxShadow: `0px 0px 0px 14px ${alpha('#3B447A', 0.16)}`,
                    },
                },
                '& .MuiSlider-valueLabel': {
                    height: 40,
                    fontFamily: 'Inter',
                    fontSize: '1.1rem',
                    backgroundColor: '#3B447A',
                },
                '& .MuiSlider-mark': {
                    height: '1.1rem',
                    width: '3px'
                },
                '& .MuiSlider-markActive': {
                    height: '1.1rem',
                    width: '3px',
                    backgroundColor: '#3B447A',
                    opacity: 1,
                    color: '#3B447A'
                },
                '& .MuiSlider-markLabel': {
                    fontFamily: 'Commissioner',
                    color: '#3B447A',
                }
            }}
            className="max-w-[75%] lg:max-w-[65%]"
            />
        </div>
    )
}

export default RangeSlider;