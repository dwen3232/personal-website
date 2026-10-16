import './globals.css'
import { Amatic_SC, Courier_Prime, Inter, Kalam } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const title = Amatic_SC({ subsets: ['latin'], weight: '700', variable: '--font-title' })
const hand = Kalam({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-hand' })
const stamp = Courier_Prime({ subsets: ['latin'], weight: '700', variable: '--font-stamp' })

export const metadata = {
  title: 'David Wen',
  description: 'Personal Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${title.variable} ${hand.variable} ${stamp.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
