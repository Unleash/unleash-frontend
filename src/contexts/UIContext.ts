import React from 'react';

export interface IToastData {
    title: string;
    text: string;
    components?: JSX.Element[];
    show: boolean;
    persist: boolean;
    confetti?: boolean;
    type: string;
}
interface IFeatureStrategiesUIContext {
    toastData: ToastData;
    setExpandedSidebar: React.Dispatch<React.SetStateAction<ToastData>>;
}

const UIContext = React.createContext<IFeatureStrategiesUIContext | null>(null);

export default UIContext;
