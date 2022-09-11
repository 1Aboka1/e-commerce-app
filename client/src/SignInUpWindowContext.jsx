import { createContext } from 'react'


export const signWindowShownContext = createContext(false)
export const signTypeContext = createContext('')

// const handleSignClick = (type) => () => {
//     setSignType(type)
//     setSignWindowShown(!signWindowShown)
// }