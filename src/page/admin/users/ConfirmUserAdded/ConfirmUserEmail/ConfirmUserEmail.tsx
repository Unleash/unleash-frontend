import { Typography } from '@material-ui/core';
import Dialogue from '../../../../../component/common/Dialogue';

interface IConfirmUserEmailProps {
    open: boolean;
    closeConfirm: () => void;
}

const ConfirmUserEmail = ({ open, closeConfirm }: IConfirmUserEmailProps) => {
    return (
        <Dialogue
            open={open}
            title="Team member added"
            primaryButtonText="Close"
            onClick={closeConfirm}
        >
            <Typography>
                A new team member has been added. An email has been sent to the
                specified email address with instructions on how to get started.
            </Typography>
        </Dialogue>
    );
};

export default ConfirmUserEmail;
