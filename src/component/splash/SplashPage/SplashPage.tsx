import { Routes, Route, useHistory, Navigate } from 'react-router-dom';
import { SplashPageEnvironments } from '../SplashPageEnvironments/SplashPageEnvironments';
import { useRequiredPathParam } from 'hooks/useRequiredPathParam';
import useSplashApi from 'hooks/api/actions/useSplashApi/useSplashApi';
import { SplashPageOperators } from 'component/splash/SplashPageOperators/SplashPageOperators';
import { useEffect } from 'react';
import { useAuthSplash } from 'hooks/api/getters/useAuth/useAuthSplash';
import { splashIds, SplashId } from 'component/splash/splash';

export const SplashPage = () => {
    const splashId = useRequiredPathParam('splashId');
    const isKnownId = isKnownSplashId(splashId);
    const { refetchSplash } = useAuthSplash();
    const { setSplashSeen } = useSplashApi();

    // Close the splash "modal" on escape.
    useNavigationOnKeydown('Escape', '/');

    // Mark the splash ID as seen.
    useEffect(() => {
        if (splashId && isKnownId) {
            setSplashSeen(splashId)
                .then(() => refetchSplash())
                .catch(console.warn);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [splashId, isKnownId]);

    if (!isKnownId) {
        return null;
    }

    return (
        <Routes>
            <Route path="/splash/environments">
                <SplashPageEnvironments />
            </Route>
            <Route path="/splash/operators">
                <SplashPageOperators />
            </Route>
            <Route>
                <Navigate to="/" replace />
            </Route>
        </Routes>
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
    return (splashIds as Readonly<string[]>).includes(value);
};
