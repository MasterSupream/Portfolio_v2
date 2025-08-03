import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Anuvesh Chilwal | Full Stack Developer',
  description: 'Passionate student and full stack developer exploring AI/ML, web development, and innovative software solutions. Building the future through code.',
  keywords: ['anuvesh chilwal', 'full stack developer', 'web development', 'ai ml', 'student developer', 'react', 'next.js', 'typescript', 'javascript', 'software engineer'],
  authors: [{ name: 'Anuvesh Chilwal' }],
  openGraph: {
    title: 'Anuvesh Chilwal | Full Stack Developer',
    description: 'Passionate student and full stack developer exploring AI/ML, web development, and innovative software solutions.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuvesh Chilwal | Full Stack Developer',
    description: 'Passionate student and full stack developer exploring AI/ML, web development, and innovative software solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}