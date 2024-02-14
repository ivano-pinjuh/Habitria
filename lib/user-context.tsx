'use client'

import { createContext, useState } from 'react'

export const UserContext = createContext({})

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState({isSignedIn: false})

  return <UserContext.Provider value={{currentUser, setCurrentUser}}>
    {children}
  </UserContext.Provider>
}