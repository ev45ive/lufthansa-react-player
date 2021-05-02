import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface Props {
    onSearch(query: string): void,
}

export const SearchForm = ({ onSearch }: Props) => {
    const [query, setQuery] = useState('')
    const queryRef = useRef<HTMLInputElement>(null)
    const isFirst = useRef(true)

    useEffect(() => {
        if (isFirst.current) { isFirst.current = false; return; }
        const handle = setTimeout(() => {
            onSearch(query)
        }, 500);

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
                    onKeyUp={e => {
                        // console.log(e.currentTarget.value)
                        // https://create-react-app.dev/docs/debugging-tests/
                        e.key === 'Enter' && onSearch(query)
                    }}
                />

                {/* <button className="btn btn-outline-secondary" type="button" onClick={() => onSearch(query)}>Search</button> */}
            </div>
        </div>
    )
}
