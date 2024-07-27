import { Tooltip } from "@mui/material";
import { styled } from '@mui/system';

interface InfoToolProps {
    children: React.ReactElement
    title: string
    className?: string
}
const InfoTool: React.FC<InfoToolProps> = ({ children, title, className, ...props }) => (
    <Tooltip title={title} {...props} classes={{ tooltip: className }}>
      {children}
    </Tooltip>
  );

const StyledInfoTool = styled(InfoTool)(() => ({
    fontFamily: 'Commissioner',
    fontWeight: 400,
    backgroundColor: '#3B447A',
    color: '#fff',
}));

export default StyledInfoTool;