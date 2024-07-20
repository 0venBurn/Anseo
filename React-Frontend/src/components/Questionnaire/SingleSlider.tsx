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
    type?: string
    questionNumber: number
}

const SingleSlider: React.FC<SingleSliderProps> = (
    { label, min, max, steps, value, setValue, type, questionNumber }
    ) => {
    const valueText = (type: string | undefined, value: number) => {
        return type === 'money' ? `$${value}` : `${value}`
    }

    const marksGenerator = (type: string | undefined) => {
        if (!type) {
            return [
                {
                  value: 1,
                  label: '1',
                },
                {
                  value: 2,
                  label: '2',
                },
                {
                  value: 3,
                  label: '3',
                },
                {
                  value: 4,
                  label: '4',
                },
                {
                    value: 5,
                    label: '5',
                },
              ];
        }
        return [
            {
                value: min,
                label: `< $${min}`,
            },
            {
                value: +(max > 100000 ? (max / 2).toFixed(0) : ((min + max) / 2).toFixed(0)),
                label: `$${max > 100000 ? (max / 2).toFixed(0) : ((min + max) / 2).toFixed(0)}`,
            },
            { 
                value: max,
                label: `$${max}+`
            }
        ]
    }
 
    return (    
        <div className='mb-6 '>
        <QuestionLabel label={label} questionNumber={questionNumber}/>
        <Slider 
            value={value} 
            onChange={(e, newValue) => setValue(newValue as number)}
            min={min}
            max={max}   
            step={steps}
            valueLabelFormat={valueText(type, value)}
            valueLabelDisplay='auto'
            sx={{
                color: '#3B447A',
                flex: 1,    
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
            marks={marksGenerator(type)}
            className="max-w-[75%] lg:max-w-[65%]"
            />
        </div>
    )

}

export default SingleSlider;