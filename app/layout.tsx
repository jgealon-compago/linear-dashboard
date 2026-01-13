import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Command Center',
  description: 'Your personal command center with Linear, Calendar, and Email',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}