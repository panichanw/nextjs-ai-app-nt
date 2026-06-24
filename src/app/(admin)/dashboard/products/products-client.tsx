"use client"

import { useState, useEffect } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AdminProduct, CategoryOption, ApiResponse } from "@/types/admin"
import { ProductFormModal } from "./product-form-modal"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

type ListData = {
  products: AdminProduct[]
  total: number
  page: number
  totalPages: number
}

export function ProductsClient() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [inputVal, setInputVal] = useState("")
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null)

  useEffect(() => {
    let cancelled = false

    const raf = requestAnimationFrame(() => {
      if (!cancelled) setLoading(true)
    })

    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set("search", search)

    fetch(`/api/admin/products?${params}`)
      .then((r) => r.json())
      .then((json: ApiResponse<ListData>) => {
        if (!cancelled && json.success) {
          setProducts(json.data.products)
          setTotal(json.data.total)
          setTotalPages(json.data.totalPages)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [page, search])

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((json: ApiResponse<CategoryOption[]>) => {
        if (json.success) setCategories(json.data)
      })
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(inputVal)
      setPage(1)
    }, 300)
    return () => clearTimeout(t)
  }, [inputVal])

  function openCreate() {
    setEditProduct(null)
    setFormOpen(true)
  }

  function openEdit(product: AdminProduct) {
    setEditProduct(product)
    setFormOpen(true)
  }

  function openDelete(product: AdminProduct) {
    setDeleteTarget(product)
  }

  function handleSaved() {
    setFormOpen(false)
    setEditProduct(null)
    setPage(1)
  }

  function handleDeleted() {
    setDeleteTarget(null)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาสินค้า..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          เพิ่มสินค้า
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          กำลังโหลด...
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>ชื่อสินค้า</TableHead>
                <TableHead>หมวดหมู่</TableHead>
                <TableHead className="text-right">ราคา</TableHead>
                <TableHead className="text-right">จัดการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    ไม่พบสินค้า
                  </TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.categoryName}</TableCell>
                    <TableCell className="text-right">
                      {p.price.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEdit(p)}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => openDelete(p)}
                        >
                          ลบ
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                ทั้งหมด {total} รายการ | หน้า {page} / {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ก่อนหน้า
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <ProductFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editProduct}
        categories={categories}
        onSaved={handleSaved}
      />

      <DeleteConfirmDialog
        product={deleteTarget}
        onDeleted={handleDeleted}
      />
    </div>
  )
}
