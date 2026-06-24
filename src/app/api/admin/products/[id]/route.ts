import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { productSchema } from '@/lib/validations/product'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const result = productSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.errors[0].message },
      { status: 400 }
    )
  }

  const { name, description, price, categoryId } = result.data

  const product = await prisma.products.update({
    where: { id: Number(id) },
    data: {
      name,
      description: description || null,
      price,
      category_id: Number(categoryId),
    },
    include: { categories: true },
  })

  return NextResponse.json({
    success: true,
    data: {
      id: String(product.id),
      name: product.name ?? '',
      description: product.description,
      price: Number(product.price ?? 0),
      categoryId: String(product.category_id ?? ''),
      categoryName: product.categories?.name ?? '',
    },
  })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const count = await prisma.order_items.count({ where: { product_id: Number(id) } })
  if (count > 0) {
    return NextResponse.json(
      { success: false, error: `ไม่สามารถลบได้: สินค้านี้มี ${count} รายการในคำสั่งซื้อ` },
      { status: 409 }
    )
  }

  await prisma.products.delete({ where: { id: Number(id) } })

  return NextResponse.json({ success: true, data: {} })
}
