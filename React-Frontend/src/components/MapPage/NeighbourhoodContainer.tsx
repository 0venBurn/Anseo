import { motion } from "framer-motion";
import { Indexes, Listing, Neighbourhood, Rankings } from "../../utils/types";
import UserOptionsHeader from "./UserOptionsHeader";
import NeighbourhoodCardGrid from "./NeighbourhoodCardGrid";
import NeighbourhoodDetails from "./NeighbourhoodDetails";

interface NeighbourhoodContainerProps {
    neighbourhoods: Neighbourhood[]
    handleLearnMore: (neighbourhood: Neighbourhood) => void
    selectedNeighbourhood: Neighbourhood | null
    filteredListings: Listing[]
    filteredRankings: Rankings | undefined
    filteredIndexes: Indexes | undefined    
    isMobile: boolean
    isClosing: boolean
    handleClose: () => void
    handleListingClick: (listing: Listing) => void
}

const NeighbourhoodContainer: React.FC<NeighbourhoodContainerProps> = ( 
    { 
        neighbourhoods, 
        handleLearnMore,
        selectedNeighbourhood,
        filteredListings,
        filteredRankings,
        filteredIndexes,
        isMobile,
        isClosing,
        handleClose,
        handleListingClick
     }) => {
    return (
        <div className="flex flex-col w-full bg-user-sidebar-purple-light">
          <UserOptionsHeader />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          >  
        {selectedNeighbourhood ? 
            <NeighbourhoodDetails
            neighbourhood={selectedNeighbourhood}
            listings={filteredListings} 
            rankings={filteredRankings}
            indexes={filteredIndexes}
            isMobile={isMobile}
            isClosing={isClosing}
            onClose={handleClose}
            onListingClick={handleListingClick}
            /> :
            <NeighbourhoodCardGrid
            neighbourhoods={neighbourhoods}
            handleLearnMore={handleLearnMore}
            />
        } 
        </motion.div>
        </div>
      )
    }
export default NeighbourhoodContainer