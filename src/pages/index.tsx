import {ChangeEvent} from "react";

import {StateProvider} from '@/state';
import {getDestinations} from "@/state/hooks/DestinationsHook";


const Home = (): JSX.Element => {


    const onInput = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        await getDestinations(e.target.value)
    };


    return (
        <StateProvider>
            <input onInput={onInput}></input>
        </StateProvider>
    );
};


export default Home;
