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
            <h1>Sign in to view your favourites</h1>
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