import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from '@clerk/clerk-react';
import UserOptionBtn from "./UserOptionBtn";

const UserOptionsHeader: React.FC = () => {
  const { user } = useUser();
  const [activeBtn, setActiveBtn] = useState<string | null>('Favourites');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveBtn(e?.currentTarget.textContent);
  }

    return (
        <div
          className="w-full flex bg-white items-center text-base md:text-xl py-2 px-4 shadow-md">
            <SignedIn>
              <div className="font-commissioner text-primary-text-dark px-2
              after:content-['|'] after:text-shaded-grey after:w-[1px] after:h-full after:ml-2">{user?.username}</div>
                </SignedIn>
              <div className="flex items-center justify-evenly md:justify-end w-full h-full md:gap-4">
                <UserOptionBtn 
                  title="Favourites" 
                  isActive={activeBtn === 'Favourites'}
                  handleClick={handleClick}/>
                <UserOptionBtn 
                  title="History" 
                  isActive={activeBtn === 'Previous Searches'}
                  handleClick={handleClick}/>
              </div>
            <SignedOut></SignedOut>
      </div>
    )
}

export default UserOptionsHeader;