import prisma from "@/lib/prisma";
import type { ProductCardItem } from "@/types/product";

export async function getProducts(): Promise<ProductCardItem[]> {
  const products = await prisma.products.findMany({
    include: {
      categories: true,
      product_images: {
        orderBy: { id: "asc" },
        take: 1,
      },
    },
    orderBy: { id: "asc" },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name ?? "ไม่ระบุชื่อสินค้า",
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    categoryName: product.categories?.name ?? "ไม่ระบุหมวดหมู่",
    imageName: product.product_images[0]?.image_name ?? null,
  }));
}
