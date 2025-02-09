"use client"
import React from 'react'
import { SessionProvider } from '@node_modules/next-auth/react'

import { Session } from 'next-auth';

interface ProviderProps {
  session: Session | null;
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ session, children }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider