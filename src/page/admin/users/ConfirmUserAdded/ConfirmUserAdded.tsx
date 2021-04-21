import { IAddedUser } from '../../../../interfaces/user';
import ConfirmUserEmail from './ConfirmUserEmail/ConfirmUserEmail';
import ConfirmUserLink from './ConfirmUserLink/ConfirmUserLink';

interface IConfirmUserResolverProps {
    open: boolean;
    closeConfirm: () => void;
    inviteLink: string;
    emailSent: boolean;
}

const ConfirmUserAdded = ({
    open,
    closeConfirm,
    emailSent,
    inviteLink,
}: IConfirmUserResolverProps) => {
    if (emailSent) {
        return <ConfirmUserEmail open={open} closeConfirm={closeConfirm} />;
    }

    return (
        <ConfirmUserLink
            open={open}
            closeConfirm={closeConfirm}
            inviteLink={inviteLink}
        />
    );
};

export default ConfirmUserAdded;
