import './globals.css'
import { Poppins } from 'next/font/google'
import Provider from './Provider'
import SignIn from '../components/SignIn'
import { ReactNode } from 'react'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'

const poppins = Poppins({ subsets: ['latin'], weight: "400"})

export const metadata = {
  title: {
    default: '... | App',
    template: '%s | App',
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="fr">
      <head />
      <body className={poppins.className}>
        <Provider session={session}>
            <SignIn />
            {children}
        </Provider>
      </body>
    </html>
  )
}
