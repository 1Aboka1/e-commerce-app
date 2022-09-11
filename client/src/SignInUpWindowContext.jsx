import { createContext } from 'react'


export const signWindowShown = createContext(false)
export const signType = createContext('')

const handleSignClick = (type) => () => {
    setSignType(type)
    setSignWindowShown(!signWindowShown)
}