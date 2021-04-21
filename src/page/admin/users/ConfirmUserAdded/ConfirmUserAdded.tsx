import { IAddedUser } from '../../../../interfaces/user';
import ConfirmUserEmail from './ConfirmUserEmail/ConfirmUserEmail';
import ConfirmUserLink from './ConfirmUserLink/ConfirmUserLink';

interface IConfirmUserResolverProps {
    open: boolean;
    closeConfirm: () => void;
    addedUser: IAddedUser | undefined;
    emailSent: boolean;
}

const ConfirmUserAdded = ({
    open,
    closeConfirm,
    emailSent,
    addedUser,
}: IConfirmUserResolverProps) => {
    if (!addedUser) return null;
    console.log(emailSent);
    if (emailSent) {
        return <ConfirmUserEmail open={open} closeConfirm={closeConfirm} />;
    }

    return (
        <ConfirmUserLink
            open={open}
            closeConfirm={closeConfirm}
            inviteLink={addedUser.inviteLink}
        />
    );
};

export default ConfirmUserAdded;
