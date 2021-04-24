import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
    onSearch(query: string): void
}

export const SearchForm = ({ onSearch }: Props) => {
    const [query, setQuery] = useState('')
    const queryRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handle = setTimeout(() => { onSearch(query) }, 500);

        return () => clearTimeout(handle)
    }, [query])

    useEffect(() => {
        queryRef.current?.focus()
    }, [])

    return (
        <div>
            <div className="input-group mb-3">

                <input type="text" className="form-control" placeholder="Search" id="query_id" ref={queryRef}
                    onChange={e => setQuery(e.target.value)}
                    onKeyUp={e => e.code === 'Enter' && onSearch(query)}
                />

                {/* <button className="btn btn-outline-secondary" type="button" onClick={() => onSearch(query)}>Search</button> */}
            </div>
        </div>
    )
}
