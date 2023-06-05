import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './Provider'
import SignIn from './auth/signin'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: '... | Forge',
    template: '%s | Forge',
  },
  referrer: 'origin-when-cross-origin',
  description: 'Application for ENIB students',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head />
      <body className={inter.className}>
        <NextAuthProvider>
          <SignIn>
            {children}
          </SignIn>
        </NextAuthProvider>
      </body>
    </html>
  )
}