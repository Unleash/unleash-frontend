import { useEffect, useState } from 'react';
import { RouteProps, Route, useHistory } from 'react-router-dom';

interface ISlideInRouteProps extends RouteProps {
    path: string;
    renderComponent: (
        open: boolean,
        closeModal: (callback: () => void) => void
    ) => JSX.Element;
}

export const SlideInRoute = ({ renderComponent, path }: ISlideInRouteProps) => {
    const [open, setOpen] = useState(true);
    const [nextAction, setNextAction] = useState(() => () => {});

    const closeModal = (action: () => void) => {
        setOpen(false);
        setNextAction(() => action);
    };

    const onModalClose = () => {
        if (open) return;
        nextAction();
        setNextAction(() => () => {});
    };

    return (
        <div onTransitionEnd={onModalClose}>
            <Route
                path={path}
                render={() => renderComponent(open, closeModal)}
            />
        </div>
    );
};
