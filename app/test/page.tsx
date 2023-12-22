"use client"

import Link from "next/link";
import Search from "@/components/Search";
import Details from "@/components/Details";
import {Wrapper} from "@/components/Wrapper/Wrapper";

const Test = () => (
    <Wrapper>
        <Search/>
        <Details/>
        <Link href="/">Home</Link>
    </Wrapper>
)

export default Test