import React, { createContext, useContext, useReducer } from 'react'

const MyContext = createContext()

export default function StateProvider({children,initialState,reducer}) {

 return (
  <MyContext.Provider value={useReducer(reducer, initialState)}>
   {children}
  </MyContext.Provider>
 )
}

export const useStateValue = () => useContext(MyContext);