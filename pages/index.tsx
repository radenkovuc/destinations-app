import Link from "next/link"

import Search from "@/components/Search";
import Details from "@/components/Details";

const Home = (): JSX.Element => <>
    <Search/>
    <Details/>
    <Link href="/pages/test">Test</Link>
</>

export default Home;
