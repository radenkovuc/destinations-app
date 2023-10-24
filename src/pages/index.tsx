import {StateProvider} from '@/state';

import Search from "@/components/Search";
import Details from "@/components/Details";


const Home = (): JSX.Element =>
    <StateProvider>
        <>  <Search/>
            <Details/>
        </>
    </StateProvider>


export default Home;
