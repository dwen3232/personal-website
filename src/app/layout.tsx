import './globals.css'
import { Amatic_SC, Courier_Prime, Inter, Kalam } from 'next/font/google'
import localFont from 'next/font/local'
import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import { cardMetadata } from '@/lib/og'

const inter = Inter({ subsets: ['latin'] })
const title = Amatic_SC({ subsets: ['latin'], weight: '700', variable: '--font-title' })
const hand = Kalam({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-hand' })
const stamp = Courier_Prime({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-stamp' })

/** Reading serif for prose. Libron v0.31, OFL: https://github.com/nicoverbruggen/libron */
const read = localFont({
  src: [
    { path: './fonts/libron/Libron-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/libron/Libron-Italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/libron/Libron-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/libron/Libron-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-read',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: 'Machine learning engineer, backend developer, math nerd.',
  ...cardMetadata({
    image: '/og.png',
    alt: 'David Wen: machine learning engineer, backend developer, math nerd',
    title: SITE_NAME,
    description: 'Machine learning engineer, backend developer, math nerd.',
  }),
  alternates: { types: { 'application/rss+xml': [{ url: '/rss.xml', title: 'Field notes' }] } },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${title.variable} ${hand.variable} ${stamp.variable} ${read.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
