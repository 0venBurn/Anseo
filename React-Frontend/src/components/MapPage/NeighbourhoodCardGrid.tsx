import NeighbourhoodCard from "./NeighbourhoodCard";
import { Neighbourhood } from "../../utils/types";

interface NeighbourhoodCardGridProps {
    neighbourhoods: Neighbourhood[]
    handleLearnMore: (neighbourhood: Neighbourhood) => void,
    setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>
    userFavourites: Neighbourhood[]
}

const NeighbourhoodCardGrid: React.FC<NeighbourhoodCardGridProps> = ( { neighbourhoods, handleLearnMore, setUserFavourites, userFavourites }) => {
    return (
            <div className="h-full w-full grid place-items-center auto-rows-min gap-10 grid-cols-1 md:grid-cols-2 p-4">
                {neighbourhoods.map((neigbhourhood, index) => (
                    <NeighbourhoodCard
                    key={index}
                    neighbourhood={neigbhourhood}
                    onLearnMore={handleLearnMore}
                    isBestMatch={index === 0}
                    userFavourites={userFavourites}
                    setUserFavourites={setUserFavourites}
                    />
                ))}
        </div>
    )
}

export default NeighbourhoodCardGrid;