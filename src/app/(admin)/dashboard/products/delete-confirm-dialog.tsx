"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { AdminProduct, ApiResponse } from "@/types/admin"

type DeleteConfirmDialogProps = {
  product: AdminProduct | null
  onDeleted: () => void
}

export function DeleteConfirmDialog({ product, onDeleted }: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (product && !open) {
    setOpen(true)
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setOpen(false)
    }
  }

  function handleDelete() {
    if (!product) return

    startTransition(async () => {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      })

      const json: ApiResponse<object> = await res.json()

      if (!json.success) {
        toast.error(json.error)
        setOpen(false)
        return
      }

      toast.success("ลบสินค้าเรียบร้อยแล้ว")
      setOpen(false)
      onDeleted()
    })
  }

  return (
    <AlertDialog open={product !== null && open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบสินค้า</AlertDialogTitle>
          <AlertDialogDescription>
            คุณแน่ใจว่าต้องการลบ <strong>{product?.name}</strong> หรือไม่?
            การดำเนินการนี้ไม่สามารถเรียกคืนได้
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "กำลังลบ..." : "ยืนยันการลบ"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
