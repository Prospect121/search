import React from 'react'
import { useRouter } from 'next/router'
import { ResultSearch } from "@/component/result-search";

export default function SearchResult() {
    const router = useRouter()
    const { query } = router.query
    return (
        <>
            {!!query && (
                <>
                    <ResultSearch query={`${query}`} />
                </>
            )}
        </>


    )
}
