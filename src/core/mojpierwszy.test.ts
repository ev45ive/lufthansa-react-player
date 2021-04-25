export { } // '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}'

test('moj pierwszy test should testowac prawdziwosc zdań ', () => {
    expect(true).toBe(true)
    expect(true).not.toBe(false)
    expect({ x: 1 }).toStrictEqual({ x: 1 })
    expect({ x: 1, y: '2', z:[] }).toEqual({ x: 1, y: expect.any(String), z:expect.anything() })
})
