import { useEffect } from "react";
import { UserResult } from "../../utils/types";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

interface UserHistoryProps {
    userHistory: UserResult[] | null;
}

interface UserHistoryContainerProps {
    col?: boolean;
    children: React.ReactNode;
}

interface UserHistoryHeadingProps {
    title: string;
}
interface UserHistoryItemProps {
    content: string;
}

const UserHistoryContainer: React.FC<UserHistoryContainerProps> = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            {children}
        </div>
    )
}
const UserHistoryHeading: React.FC<UserHistoryHeadingProps> = ({title}) => {
    return (
        <>
        <h4 className="font-alegreya text-primary-text-dark text-lg">{title}</h4>
        </>
    )
}

const UserHistoryItem: React.FC<UserHistoryItemProps> = ({content}) => {
    return (
        <>
        <span className="font-commissioner font-[500] text-shaded-grey" >{content}</span>
        </>
    )
}

const UserHistory: React.FC<UserHistoryProps> = ({ userHistory }) => {
    useEffect(() => {
        console.log('userHistory changed:', userHistory);
    }, [userHistory]);
    if (!userHistory) {
        return (
            <div>
                <h1>No User History</h1>
            </div>
        );
    }
    
    return (
        <>
        <SignedOut>
            <h1>Sign in to view your history</h1>
            </SignedOut>
            <SignedIn>
            <div className="flex flex-col gap-6 p-4">
        {userHistory && userHistory.map( userResult => {
            const selectedBoroughs = userResult.results.data.selectedBoroughs
            console.log(userResult.clerkUserId)
            console.log(selectedBoroughs)
            return (
                <motion.div whileHover={{ scale: 1.02 }}
                key={userResult.resultId} 
                className="flex bg-white p-4 border-b-[1px] gap-4 
                items-center justify-evenly border-b-primary-text-dark  
                shadow-md cursor-pointer rounded-lg">
                
                <UserHistoryContainer>
                    <UserHistoryHeading title="Date"/>
                    <UserHistoryItem content={new Date(userResult.timestamp).toLocaleString().slice(0,10)}/>
                </UserHistoryContainer>

                <UserHistoryContainer>
                <UserHistoryHeading title="Selected Boroughs"/>
                    {selectedBoroughs.map( borough => {
                        return (
                            <>
                                <UserHistoryItem content={borough} /> 
                            </>
                        )
                    })
                }
                </UserHistoryContainer>

                <UserHistoryContainer col>
                    <UserHistoryHeading title="Best Match"/>
                    <div className="flex items-center gap-1"> 
                        <UserHistoryItem content="4.5"/>
                    <Rating 
                    name="highest-rating" 
                    value={4.5}
                    precision={0.1} 
                    readOnly
                    size="small"
                    sx={{
                        padding: 0,
                      color: '#2D345D',
                    }} />
                    </div>
                </UserHistoryContainer>

                    <UserHistoryHeading title="View Again" />
                </motion.div>
            );
        })}
        </div>
            </SignedIn>
            </>
    );
}
export default UserHistory;