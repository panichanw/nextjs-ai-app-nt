"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { productSchema, type ProductFormValues } from "@/lib/validations/product"
import type { AdminProduct, CategoryOption, ApiResponse } from "@/types/admin"

const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
}

type ProductFormModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: AdminProduct | null
  categories: CategoryOption[]
  onSaved: () => void
}

export function ProductFormModal({
  open,
  onOpenChange,
  product,
  categories,
  onSaved,
}: ProductFormModalProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        product
          ? {
              name: product.name,
              description: product.description ?? "",
              price: product.price,
              categoryId: product.categoryId,
            }
          : defaultValues
      )
    }
  }, [open, product, form])

  function onSubmit(values: ProductFormValues) {
    startTransition(async () => {
      const isEdit = !!product
      const url = isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const json: ApiResponse<AdminProduct> = await res.json()

      if (!json.success) {
        toast.error(json.error)
        return
      }

      toast.success(isEdit ? "อัปเดตสินค้าเรียบร้อยแล้ว" : "เพิ่มสินค้าเรียบร้อยแล้ว")
      onSaved()
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
          </DialogTitle>
          <DialogDescription>
            {product
              ? "แก้ไขข้อมูลสินค้าด้านล่าง"
              : "กรอกข้อมูลสินค้าใหม่ด้านล่าง"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Field>
            <FieldLabel>ชื่อสินค้า</FieldLabel>
            <FieldContent>
              <Input
                {...form.register("name")}
                placeholder="กรอกชื่อสินค้า"
              />
              <FieldError errors={form.formState.errors.name ? [{ message: form.formState.errors.name.message }] : []} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>รายละเอียด</FieldLabel>
            <FieldContent>
              <Textarea
                rows={3}
                {...form.register("description")}
                placeholder="รายละเอียดสินค้า (ไม่บังคับ)"
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>ราคา</FieldLabel>
            <FieldContent>
              <Input
                type="number"
                step="0.01"
                {...form.register("price", { valueAsNumber: true })}
                placeholder="0.00"
              />
              <FieldError errors={form.formState.errors.price ? [{ message: form.formState.errors.price.message }] : []} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>หมวดหมู่</FieldLabel>
            <FieldContent>
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={form.formState.errors.categoryId ? [{ message: form.formState.errors.categoryId.message }] : []} />
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "กำลังบันทึก..." : product ? "บันทึก" : "เพิ่มสินค้า"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
