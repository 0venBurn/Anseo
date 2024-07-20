import NeighbourhoodCard from "./NeighbourhoodCard";
import { Neighbourhood } from "../../utils/types";

interface NeighbourhoodCardGridProps {
    neighbourhoods: Neighbourhood[]
    handleLearnMore: (neighbourhood: Neighbourhood) => void
}

const NeighbourhoodCardGrid: React.FC<NeighbourhoodCardGridProps> = ( { neighbourhoods, handleLearnMore }) => {
    return (
        <div className="overflow-y-auto px-2">
            <div className="grid grid-cols-1 xl:grid-cols-2">
                {neighbourhoods.map((neigbhourhood, index) => (
                    <NeighbourhoodCard
                    key={index}
                    neighbourhood={neigbhourhood}
                    onLearnMore={handleLearnMore}
                    isBestMatch={index === 0}
                    />
                ))}
            </div>
        </div>
    )
}

export default NeighbourhoodCardGrid;