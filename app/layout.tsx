import { Analytics } from '@vercel/analytics/react'
// eslint-disable-next-line import/no-unresolved
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import './globals.css'
import InlineStyleMarquee from '@/components/development'
import { ThemeProvider } from '@/components/provider/theme-provider'
import Navbar from '@/components/shared/Navbar'

const info = {
  name: 'Craft UI',
  twitter: '@Spacing_Whale',
  description:
    'Craft Sleek UIs with a Component Library Tailored for Fast and Stylish Development.',
  url: 'https://ui-craft.vercel.app',
  image: '/images/banner.png',
}

export const metadata: Metadata = {
  metadataBase: new URL(info.url),
  title: info.name,
  description: info.description,
  authors: {
    name: info.name,
    url: info.url,
  },
  creator: info.name,
  openGraph: {
    type: 'website',
    url: info.url,
    title: info.name,
    description: info.description,
    images: info.image,
  },
  twitter: {
    card: 'summary_large_image',
    title: info.name,
    description: info.description,
    creator: info.twitter,
    images: info.image,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </head>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <div className="dark:bg-black">
            <InlineStyleMarquee />
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
