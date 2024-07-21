import NeighbourhoodCard from "./NeighbourhoodCard";
import { Neighbourhood } from "../../utils/types";

interface NeighbourhoodCardGridProps {
    neighbourhoods: Neighbourhood[]
    handleLearnMore: (neighbourhood: Neighbourhood) => void
}

const NeighbourhoodCardGrid: React.FC<NeighbourhoodCardGridProps> = ( { neighbourhoods, handleLearnMore }) => {
    return (
            <div className="h-full w-full grid place-items-center grid-cols-1 sm:grid-cols-2">
                {neighbourhoods.map((neigbhourhood, index) => (
                    <NeighbourhoodCard
                    key={index}
                    neighbourhood={neigbhourhood}
                    onLearnMore={handleLearnMore}
                    isBestMatch={index === 0}
                    />
                ))}
        </div>
    )
}

export default NeighbourhoodCardGrid;