import { Slider } from '@mui/material';
import { alpha } from '@mui/material/styles';
import QuestionLabel from './QuestionLabel';

interface SingleSliderProps {
    label: string 
    min: number
    max: number
    steps: number
    value: number
    setValue: (value: number) => void
    minMark: string
    maxMark: string
    type: string
}

const SingleSlider: React.FC<SingleSliderProps> = (
    { label, min, max, steps, value, setValue, minMark, maxMark, type }
    ) => {
    const valueText = (value: number) => {
        return type === 'money' ? `$${value}` : `${(value * 100).toFixed(0)}%`
    }

    return (    
        <div className='my-10  w-full max-w-md'>
        <QuestionLabel label={label}/>
        <Slider 
            value={value} 
            onChange={(e, newValue) => setValue(newValue as number)}
            min={min}
            max={max}   
            step={steps}
            marks={[
                { value: min, label: minMark },
                { value: max, label: maxMark },
              ]}
            valueLabelDisplay='auto'
            valueLabelFormat={valueText}
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

export default SingleSlider;