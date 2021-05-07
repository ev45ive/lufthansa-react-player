import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useStorage } from './useStorage'
import { mocked } from 'ts-jest'
/* 
    const [data, setData] = useStorage('key')
*/


describe('useStorage hook', () => {

    const setup = () => {
        const getItemSpy = jest.spyOn(global.Storage.prototype, 'getItem')
        const setItemSpy = jest.spyOn(global.Storage.prototype, 'setItem')
        getItemSpy.mockReturnValue('test123')

        const storageKey = 'somekey'
        const { result } = renderHook(() => useStorage(storageKey))
        const [item, setItem] = result.current;

        return {
            storageKey, item, setItem, getItemSpy, setItemSpy
        }
    }

    test('gets item from storage by key', () => {
        const { getItemSpy, storageKey, item, setItem } = setup()
        expect(item).toEqual('test123')
        expect(getItemSpy).toHaveBeenCalledWith(storageKey)
    })

    it('store item in storage in key', () => {
        const { setItemSpy, storageKey, item, setItem } = setup()

        setItem('placki12')
        expect(setItemSpy).toHaveBeenCalledWith(storageKey, 'placki12')
    })

})
