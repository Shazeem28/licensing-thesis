import './globals.css'

export const metadata = {
  title: 'Brand Licensing Thesis',
  description: 'Explore the key insights of the $357B licensing landscape and discover where technology can unlock the next wave of value creation.',
  openGraph: {
    title: 'Brand Licensing Thesis',
    description: 'Explore the key insights of the $357B licensing landscape',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
