import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '험프리의 샤인머스켓 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}
