import { FC } from 'react';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';

import { useStyles } from './ResetPasswordDetails.styles';

interface IResetPasswordDetails {
    token: string;
    data: any;
}

const ResetPasswordDetails: FC<IResetPasswordDetails> = ({
    children,
    token,
    data,
}) => {
    const styles = useStyles();

    return (
        <div className={styles.innerContainer}>
            {children}
            <ResetPasswordForm token={token} />
        </div>
    );
};

export default ResetPasswordDetails;
