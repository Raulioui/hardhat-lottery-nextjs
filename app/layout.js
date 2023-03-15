import './globals.css'

export const metadata = {
  title: 'Raffle',
  description: 'A desentralizes lottery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
