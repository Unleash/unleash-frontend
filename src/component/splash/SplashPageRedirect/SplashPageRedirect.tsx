import { useAuthSplash } from 'hooks/api/getters/useAuth/useAuthSplash';
import { useLocation, Redirect } from 'react-router-dom';
import { matchPath } from 'react-router';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { IFlags } from 'interfaces/uiConfig';
import { IAuthSplash } from 'hooks/api/getters/useAuth/useAuthEndpoint';
import {
    activeSplashIds,
    SplashId,
} from 'component/splash/SplashPage/SplashPage';

export const SplashPageRedirect = () => {
    const { pathname } = useLocation();
    const { splash } = useAuthSplash();
    const { uiConfig, loading } = useUiConfig();

    if (!splash || !uiConfig || loading) {
        return null;
    }

    if (matchPath(pathname, { path: '/splash/:splashId' })) {
        return null;
    }

    const showSplashId = activeSplashIds.find(splashId => {
        return (
            isSplashRelevant(splashId, uiConfig.flags) &&
            !isSplashSeen(splashId, splash)
        );
    });

    if (!showSplashId) {
        return null;
    }

    return <Redirect to={`/splash/${showSplashId}`} />;
};

const isSplashSeen = (splashId: SplashId, splash: IAuthSplash): boolean => {
    return Boolean(splash[splashId]);
};

const isSplashRelevant = (splashId: SplashId, flags: IFlags): boolean => {
    if (splashId === 'operators') {
        return Boolean(flags.C || flags.CO);
    }

    return true;
};
