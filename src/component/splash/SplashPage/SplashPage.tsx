import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { SplashPageEnvironments } from '../SplashPageEnvironments/SplashPageEnvironments';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import useSplashApi from 'hooks/api/actions/useSplashApi/useSplashApi';
import { useEffect } from 'react';
import { useAuthSplash } from 'hooks/api/getters/useAuth/useAuthSplash';

export type SplashId = typeof splashIds[number];

// All known splash IDs.
export const splashIds = ['environments'] as const;

// Active splash IDs that may be shown.
export const activeSplashIds: SplashId[] = [];

export const SplashPage = () => {
    const splashId = useRequiredPathParam('splashId');
    const knownId = isKnownSplashId(splashId);
    const { refetchSplash } = useAuthSplash();
    const { setSplashSeen } = useSplashApi();

    // Close the splash "modal" on escape.
    useNavigationOnKeydown('Escape', '/');

    useEffect(() => {
        if (splashId && knownId) {
            setSplashSeen(splashId)
                .then(() => refetchSplash())
                .catch(console.warn);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [splashId, knownId]);

    if (!knownId) {
        return null;
    }

    return (
        <Switch>
            <Route path="/splash/environments">
                <SplashPageEnvironments />
            </Route>
            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    );
};

const useNavigationOnKeydown = (key: string, path: string) => {
    const { push } = useHistory();

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.code === key) {
                push(path);
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [key, path, push]);
};

const isKnownSplashId = (value: string): value is SplashId => {
    return (splashIds as unknown as string[]).includes(value);
};
