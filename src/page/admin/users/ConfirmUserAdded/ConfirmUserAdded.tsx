import ConfirmUserEmail from './ConfirmUserEmail/ConfirmUserEmail';
import ConfirmUserLink from './ConfirmUserLink/ConfirmUserLink';

interface IConfirmUserResolverProps {
    open: boolean;
    closeConfirm: () => void;
    inviteLink: string;
}

const ConfirmUserResolver = ({
    open,
    closeConfirm,
    inviteLink,
}: IConfirmUserResolverProps) => {
    const email = false;

    if (email) {
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

export default ConfirmUserResolver;
