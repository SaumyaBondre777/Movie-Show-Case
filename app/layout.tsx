import { Geist, Geist_Mono, Inter } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <header>
          <nav className="flex h-20 flex-row items-center justify-between bg-primary px-8 font-mono text-black">
            <div>
              <h1>Movie Lister</h1>
            </div>
            <div className="grid grid-cols-2">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/favourites">Favorites</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
