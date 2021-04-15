import { FC, Dispatch, SetStateAction } from 'react';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

import { useStyles } from './ResetPasswordDetails.styles';

interface IResetPasswordDetails {
    token: string;
    data: any;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const ResetPasswordDetails: FC<IResetPasswordDetails> = ({
    children,
    token,
    data,
    setLoading,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.innerContainer}>
            {children}
            <ResetPasswordForm token={token} setLoading={setLoading} />
        </div>
    );
};

export default ResetPasswordDetails;
