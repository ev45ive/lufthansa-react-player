import { useState, useEffect } from "react";

  
export const useFetch = function <T, P>(fetcher: (params: P) => Promise<T>) {
    const [results, setResults] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [params, setParams] = useState<P | null>(null)

    useEffect(() => {
        if (params === null) return;
        fetch(params)
    }, [params])

    const fetch = async (params: P) => {
        try {
            setResults(null);
            setMessage('');
            setIsLoading(true);

            const result = await fetcher(params)
            setResults(result)

        }
        catch (error) { setMessage(error.message); }
        finally { setIsLoading(false); }
    };

    return [{ isLoading, message, results, params }, setParams] as const
};
