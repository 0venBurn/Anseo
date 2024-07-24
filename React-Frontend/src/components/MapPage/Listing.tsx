import { IconButton } from "@mui/material"
import { motion } from "framer-motion"
import { OpenInNew } from "@mui/icons-material"
import { Listing as ListingType } from "../../utils/types"
import React from "react"

interface ListingProps {
    listing: ListingType
    onListingClick: (listing: ListingType) => void;
}

const Listing: React.FC<ListingProps> = ({ listing, onListingClick }) => {
    return (
        <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex flex-col min-w-52 justify-between items-center bg-white 
        border border-solid border-user-sidebar-purple-dark shadow-md rounded-lg">
            <div className="flex flex-col gap-4 overflow-hidden rounded-lg">
                <img 
                src={listing.imageUrl} 
                alt={listing.listingDetails} 
                className="w-full h-32 object-cover overflow-hidden border-b border-b-solid border-b-user-sidebar-purple-dark"
                onClick={() => onListingClick(listing)} // Add onClick callback
                />
                <p className="font-commissioner text-primary-text-dark text-center px-2">{listing.listingDetails}</p>
            </div>
            <div className="flex items-center justify-end self-start w-full flex-grow-0 flex-shrink-0" >
                <IconButton 
                    onClick={() => window.open(listing.link, '_blank')}
                    sx={{
                        fontSize: '2rem',
                        margin: '0 1rem',
                        color: '#3B447A',
                        "&:hover": {
                                backgroundColor: "#E8EAF6",
                        }
                    }}
                    >
                    <OpenInNew />
                </IconButton>
            </div>
        </motion.div>
    )
}

export default Listing