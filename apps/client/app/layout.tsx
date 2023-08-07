import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from '@/components/auth/Provider'
import SignIn from '@/components/auth/SignIn'
import Navbar from '@/components/Navbar'

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
      <body className="h-screen w-screen flex items-center">
        <NextAuthProvider>
          <Navbar />
          <SignIn>
              {children}
          </SignIn>
        </NextAuthProvider>
            {/* {children}
          </SignIn>
        </NextAuthProvider> */}
      </body>
    </html>
  )
}
