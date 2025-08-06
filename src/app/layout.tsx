import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LenisProvider } from '@/components/LenisProvider'
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Anuvesh Chilwal | Full Stack Developer',
  description: 'Passionate student and full stack developer exploring AI/ML, web development, and innovative software solutions. Building the future through code.',
  keywords: ['anuvesh chilwal', 'full stack developer', 'web development', 'ai ml', 'student developer', 'react', 'next.js', 'typescript', 'javascript', 'software engineer'],
  authors: [{ name: 'Anuvesh Chilwal' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Anuvesh Chilwal | Full Stack Developer',
    description: 'Passionate student and full stack developer exploring AI/ML, web development, and innovative software solutions.',
    type: 'website',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="portfolio-theme"
        >
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
        
        {/* Service Worker registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
              window.addEventListener('load', async () => {
                try {
                  await navigator.serviceWorker.register('/sw.js');
                } catch (error) {
                  console.log('SW registration failed');
                }
              });
            }
          `}
        </Script>

        {/* Performance monitoring in development */}
        {process.env.NODE_ENV === 'development' && (
          <Script id="performance-monitor" strategy="afterInteractive">
            {`
              if (typeof window !== 'undefined') {
                import('@/lib/performance').then(({ PerformanceMonitor }) => {
                  const monitor = PerformanceMonitor.getInstance();
                  monitor.observeWebVitals();
                });
              }
            `}
          </Script>
        )}
      </body>
    </html>
  )
}