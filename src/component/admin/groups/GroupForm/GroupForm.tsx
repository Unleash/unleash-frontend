import { Button } from '@mui/material';
import { useStyles } from './GroupForm.styles'; // TODO: Delete styles file.
import { UG_DESC_ID, UG_NAME_ID } from 'utils/testIds';
import Input from 'component/common/Input/Input';
import React, { FC } from 'react';
import { IGroupUser } from 'interfaces/group';
import { ConditionallyRender } from 'component/common/ConditionallyRender/ConditionallyRender';

interface IGroupForm {
    name: string;
    description: string;
    users: IGroupUser[];
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    setUsers: React.Dispatch<React.SetStateAction<IGroupUser[]>>;
    handleSubmit: (e: any) => void;
    handleCancel: () => void;
    errors: { [key: string]: string };
    mode: 'Create' | 'Edit';
    clearErrors: () => void;
}

export const GroupForm: FC<IGroupForm> = ({
    name,
    description,
    users,
    setName,
    setDescription,
    setUsers,
    handleSubmit,
    handleCancel,
    errors,
    mode,
    clearErrors,
    children,
}) => {
    const { classes: styles } = useStyles();

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.container}>
                <p className={styles.inputDescription}>
                    What would you like to call your group?
                </p>
                <Input
                    autoFocus
                    className={styles.input}
                    label="Name"
                    id="group-name"
                    error={Boolean(errors.name)}
                    errorText={errors.name}
                    onFocus={() => clearErrors()}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    data-testid={UG_NAME_ID}
                />
                <p className={styles.inputDescription}>
                    How would you describe your group?
                </p>
                <Input
                    className={styles.input}
                    multiline
                    rows={4}
                    label="Description"
                    placeholder="A short description of the group"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    data-testid={UG_DESC_ID}
                />
                <ConditionallyRender
                    condition={mode === 'Create'}
                    show={
                        <>
                            <p className={styles.inputDescription}>
                                Add users to this group
                            </p>
                            TODO: Select users input, add button, users table
                        </>
                    }
                />
                {/* <FormControl className={styles.input}>
                    <Typography
                        variant="subtitle1"
                        className={styles.roleSubtitle}
                        data-loading
                        component="h2"
                    >
                        Impression Data
                    </Typography>
                    <p>
                        When you enable impression data for a feature toggle,
                        your client SDKs will emit events you can listen for
                        every time this toggle gets triggered. Learn more in{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://docs.getunleash.io/advanced/impression_data"
                        >
                            the impression data documentation
                        </a>
                    </p>
                    <div className={styles.flexRow}>
                        <FormControlLabel
                            labelPlacement="start"
                            style={{ marginLeft: 0 }}
                            control={
                                <Switch
                                    name="impressionData"
                                    onChange={() =>
                                        setImpressionData(!impressionData)
                                    }
                                    checked={impressionData}
                                />
                            }
                            label="Enable impression data"
                        />
                    </div>
                </FormControl> */}
            </div>

            <div className={styles.buttonContainer}>
                {children}
                <Button onClick={handleCancel} className={styles.cancelButton}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
