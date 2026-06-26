import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ProductsClient } from "./products-client"

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">จัดการสินค้า</h1>
      <ProductsClient />
    </div>
  )
}
