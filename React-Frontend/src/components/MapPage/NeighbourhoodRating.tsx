import { Rating } from '@mui/material'

interface NeighbourhoodRatingProps {
    rating: number
    primary?: boolean
}

const NeighbourhoodRating: React.FC<NeighbourhoodRatingProps> = ({
    rating,
    primary
}) => {
    return (
        <div className="flex items-center gap-1"> 
            <span className={`font-commissioner font-[500] ${primary ? 'text-primary-dark' : 'text-shaded-grey'}`} >{rating.toFixed(2)}</span>
            <Rating 
            name="neighbourhood-rating" 
            value={rating}
            precision={0.1} 
            readOnly
            size="small"
            sx={{
                padding: 0,
                color: '#2D345D',
            }} />
        </div>
    )
}
export default NeighbourhoodRating