import { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import legacyStyles from '../user.module.scss';
import {
    MenuItem,
    Avatar,
    Typography,
    Icon,
    Paper,
    Button,
    Select,
} from '@material-ui/core';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useStyles } from './UserProfile.styles';
import { useCommonStyles } from '../../../common.styles';
import ConditionallyRender from '../../common/ConditionallyRender';
import EditProfile from './EditProfile/EditProfile';
import { Alert } from '@material-ui/lab';

const UserProfile = ({
    profile,
    location,
    fetchUser,
    updateSettingLocation,
    logoutUser,
}) => {
    const [currentLocale, setCurrentLocale] = useState(location.locale);
    const [showProfile, setShowProfile] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    const [edititingProfile, setEditingProfile] = useState(false);
    const styles = useStyles();
    const commonStyles = useCommonStyles();
    const [possibleLocales, setPossibleLocales] = useState([
        { value: 'en-US', image: 'en-US' },
        { value: 'en-GB', image: 'en-GB' },
        { value: 'nb-NO', image: 'nb-NO' },
        { value: 'sv-SE', image: 'sv-SE' },
        { value: 'da-DK', image: 'da-DK' },
        { value: 'en-IN', image: 'en-IN' },
        { value: 'de', image: 'de_DE' },
        { value: 'cs', image: 'cs_CZ' },
        { value: 'pt-BR', image: 'pt_BR' },
        { value: 'fr-FR', image: 'fr-FR' },
    ]);

    useEffect(() => {
        fetchUser();

        const locale = navigator.language || navigator.userLanguage;
        let found = possibleLocales.find(l => l.value === locale);
        if (!found) {
            setPossibleLocales(prev => ({
                ...prev,
                value: locale,
                image: 'unknown-locale',
            }));
        }
    }, []);

    const getLocale = () => {
        return (
            (location && location.locale) ||
            navigator.language ||
            navigator.userLanguage
        );
    };

    const setLocale = locale => {
        updateSettingLocation('locale', locale.value);
    };

    const email = profile ? profile.email : '';
    const locale = getLocale();
    let foundLocale = possibleLocales.find(l => l.value === locale);
    const imageUrl = email ? profile.imageUrl : 'unknown-user.png';
    const imageLocale = foundLocale
        ? `${foundLocale.image}.png`
        : `unknown-locale.png`;

    const profileAvatarClasses = classnames(styles.avatar, {
        [styles.editingAvatar]: edititingProfile,
    });

    const profileEmailClasses = classnames(styles.profileEmail, {
        [styles.editingEmail]: edititingProfile,
    });

    return (
        <div className={styles.profileContainer}>
            <div
                className={classnames(
                    commonStyles.flexRow,
                    commonStyles.itemsCenter
                )}
                onClick={() => setShowProfile(prev => !prev)}
                tabIndex="1"
                role="button"
            >
                <Avatar
                    alt="user image"
                    src={imageUrl}
                    className={styles.avatar}
                />
                <KeyboardArrowDownIcon />
            </div>
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
                        <Typography
                            variant="body1"
                            className={profileEmailClasses}
                        >
                            {profile?.email}
                        </Typography>
                        <ConditionallyRender
                            condition={updatedPassword}
                            show={
                                <Alert
                                    onClose={() => setUpdatedPassword(false)}
                                >
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
                                    <div
                                        className={
                                            legacyStyles.showUserSettings
                                        }
                                    >
                                        <DropdownMenu
                                            className={legacyStyles.dropdown}
                                            startIcon={
                                                <Icon
                                                    component={'img'}
                                                    alt={locale}
                                                    src={imageLocale}
                                                    className={
                                                        legacyStyles.labelFlag
                                                    }
                                                />
                                            }
                                            renderOptions={() =>
                                                possibleLocales.map(i => (
                                                    <MenuItem
                                                        key={i.value}
                                                        onClick={() =>
                                                            setLocale(i)
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                legacyStyles.showLocale
                                                            }
                                                        >
                                                            <img
                                                                src={`${i.image}.png`}
                                                                title={i.value}
                                                                alt={i.value}
                                                            />
                                                            <Typography variant="p">
                                                                {i.value}
                                                            </Typography>
                                                        </div>
                                                    </MenuItem>
                                                ))
                                            }
                                            label="Locale"
                                        />
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
        </div>
    );
};

UserProfile.propTypes = {
    profile: PropTypes.object,
    location: PropTypes.object,
    fetchUser: PropTypes.func.isRequired,
    updateSettingLocation: PropTypes.func.isRequired,
};

export default UserProfile;
