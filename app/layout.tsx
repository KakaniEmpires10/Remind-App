import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import Navbar from '@/components/partial/Navbar'
import { ThemeProvider } from '@/Providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reminder App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className='dark' style={{colorScheme : "dark"}}>
        <body className={inter.className}>
          <ThemeProvider>
            <div className='flex flex-col min-h-screen dark:bg-black items-center w-full'>
              <Navbar />
              <Separator />
              <main className='flex flex-grow w-full justify-center items-center dark:bg-neutral-950'>
                {children}
                <Toaster />
              </main>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
