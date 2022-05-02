import { useParams } from 'react-router-dom';
import useAddons from 'hooks/api/getters/useAddons/useAddons';
import { AddonForm } from '../AddonForm/AddonForm';
import cloneDeep from 'lodash.clonedeep';
import { IAddon } from 'interfaces/addons';
import { DEFAULT_DATA } from '../CreateAddon/CreateAddon';

interface IAddonEditParams {
    addonId: string;
}

export const EditAddon = () => {
    const { addonId } = useParams<IAddonEditParams>();

    const { providers, addons, refetchAddons } = useAddons();

    const editMode = true;
    const addon = addons.find(
        (addon: IAddon) => addon.id === Number(addonId)
    ) || { ...cloneDeep(DEFAULT_DATA) };
    const provider = addon
        ? providers.find(provider => provider.name === addon.provider)
        : undefined;

    return (
        <AddonForm
            editMode={editMode}
            provider={provider}
            fetch={refetchAddons}
            addon={addon}
        />
    );
};
