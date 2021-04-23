import { useState } from 'react';
import ConditionallyRender from '../../../common/ConditionallyRender';
import {
    Paper,
    Avatar,
    Typography,
    Button,
    FormControl,
    Select,
    InputLabel,
} from '@material-ui/core';
import classnames from 'classnames';
import { useStyles } from './UserProfileContent.styles';
import { useCommonStyles } from '../../../../common.styles';
import { Alert } from '@material-ui/lab';
import EditProfile from '../EditProfile/EditProfile';
import legacyStyles from '../../user.module.scss';

const UserProfileContent = ({
    showProfile,
    profile,
    possibleLocales,
    updateSettingLocation,
    imageUrl,
    location,
    logoutUser,
}) => {
    const commonStyles = useCommonStyles();
    const [currentLocale, setCurrentLocale] = useState(location.locale);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    const [edititingProfile, setEditingProfile] = useState(false);
    const styles = useStyles();

    const setLocale = value => {
        updateSettingLocation('locale', value);
    };

    const profileAvatarClasses = classnames(styles.avatar, {
        [styles.editingAvatar]: edititingProfile,
    });

    const profileEmailClasses = classnames(styles.profileEmail, {
        [styles.editingEmail]: edititingProfile,
    });

    const handleChange = e => {
        const { value } = e.target;
        setCurrentLocale(value);
        setLocale(value);
    };

    return (
        <ConditionallyRender
            condition={showProfile}
            show={
                <Paper
                    className={classnames(
                        styles.profile,
                        commonStyles.flexColumn,
                        commonStyles.itemsCenter,
                        commonStyles.contentSpacingY
                    )}
                >
                    <Avatar
                        alt="user image"
                        src={imageUrl}
                        className={profileAvatarClasses}
                    />
                    <Typography variant="body1" className={profileEmailClasses}>
                        {profile?.email}
                    </Typography>
                    <ConditionallyRender
                        condition={updatedPassword}
                        show={
                            <Alert onClose={() => setUpdatedPassword(false)}>
                                Successfully updated password.
                            </Alert>
                        }
                    />
                    <ConditionallyRender
                        condition={!edititingProfile}
                        show={
                            <>
                                <Button
                                    variant="contained"
                                    onClick={() => setEditingProfile(true)}
                                >
                                    Update password
                                </Button>
                                <div className={commonStyles.divider} />
                                <div className={legacyStyles.showUserSettings}>
                                    <FormControl
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: '100%',
                                            minWidth: '120px',
                                        }}
                                    >
                                        <InputLabel
                                            htmlFor="locale-select"
                                            style={{ backgroundColor: '#fff' }}
                                        >
                                            Date/Time formatting
                                        </InputLabel>

                                        <Select
                                            id="locale-select"
                                            native
                                            value={currentLocale || ''}
                                            onChange={handleChange}
                                            MenuProps={{
                                                style: {
                                                    zIndex: 9999,
                                                },
                                            }}
                                        >
                                            {possibleLocales.map(locale => {
                                                return (
                                                    <option
                                                        key={locale.value}
                                                        value={locale.value}
                                                    >
                                                        {locale.value}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className={commonStyles.divider} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={logoutUser}
                                >
                                    Logout
                                </Button>
                            </>
                        }
                        elseShow={
                            <EditProfile
                                setEditingProfile={setEditingProfile}
                                setUpdatedPassword={setUpdatedPassword}
                            />
                        }
                    />
                </Paper>
            }
        />
    );
};

export default UserProfileContent;
