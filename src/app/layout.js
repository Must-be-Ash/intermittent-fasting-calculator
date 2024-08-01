import './globals.css'

export const metadata = {
  title: 'Intermittent Fasting Calculator',
  description: 'Calculate your estimated weight loss with intermittent fasting',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}