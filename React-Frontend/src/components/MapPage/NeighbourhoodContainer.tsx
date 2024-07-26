import { motion } from "framer-motion";
import { Indexes, Listing, Neighbourhood, Predictions, Rankings, UserHistory as UserHistoryType } from "../../utils/types";
import UserOptionsHeader from "./UserOptionsHeader";
import NeighbourhoodCardGrid from "./NeighbourhoodCardGrid";
import NeighbourhoodDetails from "./NeighbourhoodDetails";
import UserFavourites from "./UserFavourites";
import UserHistory from "./UserHistory";

interface NeighbourhoodContainerProps {
    activeBtn: string | null
    setActiveBtn: React.Dispatch<React.SetStateAction<string | null>>
    setSelectedNeighbourhood: React.Dispatch<React.SetStateAction<Neighbourhood | null>>
    neighbourhoods: Neighbourhood[]
    handleLearnMore: (neighbourhood: Neighbourhood) => void
    selectedNeighbourhood: Neighbourhood | null
    filteredListings: Listing[]
    filteredRankings: Rankings | undefined
    filteredIndexes: Indexes | undefined    
    isClosing: boolean
    userHistory: UserHistoryType[] | null
    handleClose: () => void
    handleListingClick: (listing: Listing) => void
    userFavourites: Neighbourhood[]
    setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>
    handleReRenderPolygons: (selectedBoroughs: string[], predictions: Predictions) => void
}

const NeighbourhoodContainer: React.FC<NeighbourhoodContainerProps> = ( 
    { 
        activeBtn, 
        setActiveBtn,
        setSelectedNeighbourhood,
        neighbourhoods, 
        handleLearnMore,
        selectedNeighbourhood,
        filteredListings,
        filteredRankings,
        filteredIndexes,
        isClosing,
        handleClose,
        handleListingClick,
        userHistory,
        userFavourites,
        setUserFavourites,
        handleReRenderPolygons
     }) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setActiveBtn(e?.currentTarget.textContent);
      setSelectedNeighbourhood(null);
    }

    return (
        <div className="flex flex-col w-full lg:max-w-[50%] bg-user-sidebar-purple-light overflow-auto shadow-md">
          <UserOptionsHeader 
          activeBtn={activeBtn}
          handleClick={handleClick} />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-full w-full overflow-y-scroll no-scrollbar md:scrollbar p-2"
          >  

        {!activeBtn && selectedNeighbourhood && 
            <NeighbourhoodDetails
            neighbourhood={selectedNeighbourhood}
            listings={filteredListings} 
            rankings={filteredRankings}
            indexes={filteredIndexes}
            isClosing={isClosing}
            onClose={handleClose}
            onListingClick={handleListingClick}
            /> 
          }
           
        {!selectedNeighbourhood ? activeBtn === 'Results' &&
        <NeighbourhoodCardGrid
        neighbourhoods={neighbourhoods}
        handleLearnMore={handleLearnMore}
        userFavourites={userFavourites}
        setUserFavourites={setUserFavourites}
        /> : ''}

        {!selectedNeighbourhood ? activeBtn === 'Favourites' &&
        <UserFavourites 
          userFavourites={userFavourites}
          handleLearnMore={handleLearnMore}
          setUserFavourites={setUserFavourites}
        /> : ''}

        {!selectedNeighbourhood ? activeBtn === 'History' && 
        <UserHistory 
        key={userHistory?.length}
        userHistory={userHistory}
        handleReRenderPolygons={handleReRenderPolygons}
        /> : ''}

        </motion.div>
          </div>
      )
    }
export default NeighbourhoodContainer