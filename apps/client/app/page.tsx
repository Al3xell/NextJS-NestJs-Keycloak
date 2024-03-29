import SignOut from '@/components/SignOut';
import Image from 'next/image'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">My New page</h1>
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={500}
        height={500}
      />

      <p className="text-2xl font-bold text-center">
        Welcome to my new page
      </p>
        <SignOut />
    </main>
  )
}
