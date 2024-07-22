import { SignedIn, SignedOut } from "@clerk/clerk-react";

const UserFavourites = () => {
    return (
        <>
        <SignedOut>
            <h1>Sign in to view your favourites</h1>
        </SignedOut>
        <SignedIn>
        <div>
        </div>
        </SignedIn>
        </>
    );
}
export default UserFavourites;