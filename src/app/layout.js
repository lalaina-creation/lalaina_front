import './globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from '../context/context'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lalaina Création',
  description: 'Boutique Lalaina Création',
}

export default function RootLayout({ children }) {
  return (
    <ContextProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ContextProvider>
  )
}
