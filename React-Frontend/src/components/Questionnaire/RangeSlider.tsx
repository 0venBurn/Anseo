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
    minMark: string
    maxMark: string
}

const RangeSlider: React.FC<RangeSliderProps> = (
    { label, min, max, minDistance, steps, type, value, setValue, minMark, maxMark }
    ) => {
    const valueText = (value: number) => {
        return type === 'income' ? `$${value}` : `${value}`
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
        <div className='mb-6 max-w-2xl'>
        <QuestionLabel label={label}/>
        <Slider 
            min={min}
            step={steps}
            max={max}  
            marks={[
                { value: min, label: minMark },
                { value: max, label: maxMark },
              ]} 
            getAriaLabel={() => `${label}`}
            value={value} 
            onChange={handleChange}
            valueLabelDisplay='auto'
            valueLabelFormat={valueText}
            getAriaValueText={valueText}
            disableSwap
            sx={{
                width: '100%',
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
                }
            }}
            className="w-full max-w-md"
            />
        </div>
    )
}

export default RangeSlider;