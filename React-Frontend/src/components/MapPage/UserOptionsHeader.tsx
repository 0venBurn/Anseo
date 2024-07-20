import { Button } from "@mui/material";

const UserOptionsHeader: React.FC = () => {
    return (
        <div
          className="w-full flex bg-user-sidebar-purple-dark justify-between items-center 
          text-2xl py-2 px-4">
          <span className="font-alegreya text-primary-text-dark font-bold">
            Your Results
          </span>
          <Button variant="outlined">Filters</Button>
      </div>
    )
}

export default UserOptionsHeader;