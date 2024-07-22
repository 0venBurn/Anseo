import { Button, Grid, Typography } from "@mui/material"
import { Listing as ListingType } from "../../utils/types"
import React from "react"

interface ListingProps {
    listing: ListingType
    onListingClick: (listing: ListingType) => void;
}

const Listing: React.FC<ListingProps> = ({ listing, onListingClick }) => {
    return (
        <Grid item key={listing.id} style={{ minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <img 
                src={listing.imageUrl} 
                alt={listing.listingDetails} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                onClick={() => onListingClick(listing)} // Add onClick callback
                />
                <Typography variant="body2" align="center" style={{ marginTop: '8px' }}>{listing.listingDetails}</Typography>
            </div>
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                onClick={() => window.open(listing.link, '_blank')}
                style={{ marginTop: 'auto' }}
            >
                View Listing
            </Button>
        </Grid>
    )
}

export default Listing