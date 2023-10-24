import React from 'react';

import {Destination} from '@/domain';

type StateServices = {
    readonly destination?: Destination;
    readonly setDestination: React.Dispatch<React.SetStateAction<Destination | undefined>>;
};

interface Props {
    readonly children: JSX.Element;
}

const StateContext = React.createContext<StateServices | undefined>(undefined);

export const StateProvider = ({children}: Props): JSX.Element => {
    const [destination, setDestination] = React.useState<Destination | undefined>();

    return (
        <StateContext.Provider
            value={{
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
