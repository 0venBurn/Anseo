import { SignedIn, SignedOut } from "@clerk/clerk-react"
import NeighbourhoodCardGrid from "./NeighbourhoodCardGrid";
import { Neighbourhood } from "../../utils/types";

interface UserFavouritesProps {
    userFavourites: Neighbourhood[]
    handleLearnMore: (neighbourhood: Neighbourhood) => void
    setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>
}

const UserFavourites: React.FC<UserFavouritesProps> = ({ userFavourites, handleLearnMore, setUserFavourites }) => {
    return (
        <>
        <SignedOut>
            <div className="flex items-center justify-center w-full h-full p-4">
            <h1 className="font-alegreya text-shaded-grey text-4xl text-center italic font-light">Create an account to save your favourite neighbourhoods</h1>
            </div>
        </SignedOut>
        <SignedIn>
        <div>
        <NeighbourhoodCardGrid
            neighbourhoods={userFavourites}
            handleLearnMore={handleLearnMore}
            userFavourites={userFavourites.sort((a, b) => b.rating - a.rating)}
            setUserFavourites={setUserFavourites}
        /> 
        </div>
        </SignedIn>
        </>
    );
}
export default UserFavourites;