"use client"

import Link from "next/link";

import Search from "@/components/Search";
import Details from "@/components/Details";
import {Wrapper} from "@/components/Wrapper/Wrapper";

const Home = () => (
    <Wrapper>
        <Search/>
        <Details/>
        <Link href="/test">Test</Link>
    </Wrapper>
)

export default Home