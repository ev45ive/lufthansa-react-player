import { useCallback } from "react"


export const useStorage = (storageKey: string) => {

    const data = sessionStorage.getItem(storageKey)

    const setItem = useCallback((data: any) => {
        sessionStorage.setItem(storageKey, data)
    }, [storageKey])

    return [data, setItem] as const
}