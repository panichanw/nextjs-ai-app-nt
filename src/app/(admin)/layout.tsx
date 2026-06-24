import type { Metadata } from "next"
import { Toaster } from "sonner"
import "../globals.css"

export const metadata: Metadata = {
  title: "Admin Dashboard",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className="font-sans">
      <body className="bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
