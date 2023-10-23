import React from 'react';

import {Destination} from '@/domain';

type StateServices = {
    readonly destinations: Destination[];
    readonly setDestinations: React.Dispatch<React.SetStateAction<Destination[]>>;
    readonly search: string;
    readonly setSearch: React.Dispatch<React.SetStateAction<string>>;
    readonly destination: Destination | null;
    readonly setDestination: React.Dispatch<React.SetStateAction<Destination | null>>;
};

interface Props {
    readonly children: JSX.Element;
}

const StateContext = React.createContext<StateServices | undefined>(undefined);

export const StateProvider = ({children}: Props): JSX.Element => {
    const [destinations, setDestinations] = React.useState<Destination[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [destination, setDestination] = React.useState<Destination | null>(null);

    return (
        <StateContext.Provider
            value={{
                destinations,
                setDestinations,
                search,
                setSearch,
                destination,
                setDestination
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = (): StateServices => {
    const context = React.useContext(StateContext);
    if (context === undefined) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};
