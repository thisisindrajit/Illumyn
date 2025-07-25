"use client"

import { useEffect } from "react";

const BlockPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on opening the page
    }, [])
    
    return <div>This is the block page</div>
}

export default BlockPage;