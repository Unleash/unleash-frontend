import { IconButton, Tooltip, Button, useMediaQuery } from '@material-ui/core';
import ConditionallyRender from '../ConditionallyRender';

interface IResponsiveButtonProps {
    Icon: React.ElementType;
    onClick: () => void;
}

const ResponsiveButton = ({ Icon, onClick }: IResponsiveButtonProps) => {
    const smallScreen = useMediaQuery('(max-width:700px)');

    return (
        <ConditionallyRender
            condition={smallScreen}
            show={
                <Tooltip title="Add new project">
                    <IconButton onClick={onClick}>
                        <Icon />
                    </IconButton>
                </Tooltip>
            }
            elseShow={
                <Button onClick={onClick} color="primary" variant="contained">
                    Add new project
                </Button>
            }
        />
    );
};

export default ResponsiveButton;
