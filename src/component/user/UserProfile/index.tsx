import UserProfile from './UserProfile';
import { useLocationSettings } from '../../../hooks/useLocationSettings';
import { useAuth } from '../../../hooks/api/getters/useAuth/useAuth';

const UserProfileContainer = () => {
    const { locationSettings, setLocationSettings } = useLocationSettings();
    const { auth } = useAuth();

    if (!auth?.profile) {
        return null;
    }

    return (
        <UserProfile
            locationSettings={locationSettings}
            setLocationSettings={setLocationSettings}
            profile={auth.profile}
        />
    );
};

export default UserProfileContainer;
