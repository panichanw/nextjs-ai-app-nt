"use client"

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

import {
  Field,
  FieldLabel,
  FieldContent
} from '@/components/ui/field'
import { contactSchema, type ContactFormValues } from '@/lib/validations/contact'

const arcadeInputBase: React.CSSProperties = {
  width: '100%',
  height: 40,
  padding: '8px 12px',
  borderRadius: 8,
  background: '#12121F',
  border: '1px solid #2A2A3E',
  color: '#EEEEF0',
  fontFamily: 'var(--font-arcade-body)',
  fontSize: 16,
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
}

const arcadeInputFocus: React.CSSProperties = {
  borderColor: '#FF006E',
  borderWidth: 2,
  boxShadow: '0 0 4px #FF006E33, 0 0 12px #FF006E20',
}

const arcadeInputError: React.CSSProperties = {
  borderColor: '#FF006E',
  borderWidth: 2,
  boxShadow: '0 0 4px #FF006E4d, 0 0 12px #FF006E33',
}

const arcadeLabel: React.CSSProperties = {
  fontFamily: 'var(--font-arcade-body)',
  fontSize: 14,
  fontWeight: 500,
  color: '#EEEEF0',
  marginBottom: 6,
  display: 'block',
}

const arcadeErrorText: React.CSSProperties = {
  fontFamily: 'var(--font-arcade-body)',
  fontSize: 12,
  fontWeight: 400,
  color: '#FF006E',
  marginTop: 4,
}

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error)
        }

        toast.success('ส่งข้อความสำเร็จแล้ว')
        setIsSuccess(true)
        form.reset()
      } catch (error) {
        toast.error((error as Error).message || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง')
      }
    })
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <CheckCircle
          className="size-14 animate-neon-pulse-lime"
          style={{ color: '#39FF14' }}
        />
        <div className="space-y-2">
          <h3
            className="text-xl"
            style={{ fontFamily: 'var(--font-arcade)', color: '#39FF14', textShadow: '0 0 12px #39FF1480' }}
          >
            ส่งข้อความเรียบร้อยแล้ว
          </h3>
          <p style={{ fontFamily: 'var(--font-arcade-body)', color: '#9999AA' }}>
            เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 px-6 py-2 rounded-lg cursor-pointer transition-all"
          style={{
            fontFamily: 'var(--font-arcade-body)',
            fontSize: 16,
            background: 'transparent',
            color: '#00F0FF',
            border: '1px solid #00F0FF',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 12px #00F0FF4d, 0 0 24px #00F0FF33'
            e.currentTarget.style.background = '#00F0FF15'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          ส่งข้อความอีกครั้ง
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
      style={{ fontFamily: 'var(--font-arcade-body)' }}
    >
      <Field>
        <FieldLabel style={arcadeLabel}>ชื่อ</FieldLabel>
        <FieldContent>
          <input
            {...form.register('name')}
            placeholder="กรอกชื่อของคุณ"
            style={{
              ...arcadeInputBase,
              ...(form.formState.errors.name ? arcadeInputError : {}),
            }}
            onFocus={e => {
              if (!form.formState.errors.name) {
                e.currentTarget.style.borderColor = arcadeInputFocus.borderColor
                e.currentTarget.style.borderWidth = String(arcadeInputFocus.borderWidth)
                e.currentTarget.style.boxShadow = arcadeInputFocus.boxShadow as string
              }
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#2A2A3E'
              e.currentTarget.style.borderWidth = '1px'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onMouseEnter={e => {
              if (!form.formState.errors.name) {
                e.currentTarget.style.borderColor = '#FF006E'
              }
            }}
            onMouseLeave={e => {
              if (!form.formState.errors.name) {
                e.currentTarget.style.borderColor = '#2A2A3E'
              }
            }}
          />
          {form.formState.errors.name?.message && (
            <p style={arcadeErrorText}>{form.formState.errors.name.message}</p>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel style={arcadeLabel}>Email</FieldLabel>
        <FieldContent>
          <input
            type="email"
            {...form.register('email')}
            placeholder="example@email.com"
            style={{
              ...arcadeInputBase,
              ...(form.formState.errors.email ? arcadeInputError : {}),
            }}
            onFocus={e => {
              if (!form.formState.errors.email) {
                e.currentTarget.style.borderColor = arcadeInputFocus.borderColor
                e.currentTarget.style.borderWidth = String(arcadeInputFocus.borderWidth)
                e.currentTarget.style.boxShadow = arcadeInputFocus.boxShadow as string
              }
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#2A2A3E'
              e.currentTarget.style.borderWidth = '1px'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onMouseEnter={e => {
              if (!form.formState.errors.email) {
                e.currentTarget.style.borderColor = '#FF006E'
              }
            }}
            onMouseLeave={e => {
              if (!form.formState.errors.email) {
                e.currentTarget.style.borderColor = '#2A2A3E'
              }
            }}
          />
          {form.formState.errors.email?.message && (
            <p style={arcadeErrorText}>{form.formState.errors.email.message}</p>
          )}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel style={arcadeLabel}>ข้อความ</FieldLabel>
        <FieldContent>
          <textarea
            rows={5}
            {...form.register('message')}
            placeholder="พิมพ์ข้อความที่ต้องการ..."
            style={{
              ...arcadeInputBase,
              height: 'auto',
              minHeight: 120,
              resize: 'vertical',
              ...(form.formState.errors.message ? arcadeInputError : {}),
            }}
            onFocus={e => {
              if (!form.formState.errors.message) {
                e.currentTarget.style.borderColor = arcadeInputFocus.borderColor
                e.currentTarget.style.borderWidth = String(arcadeInputFocus.borderWidth)
                e.currentTarget.style.boxShadow = arcadeInputFocus.boxShadow as string
              }
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = '#2A2A3E'
              e.currentTarget.style.borderWidth = '1px'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onMouseEnter={e => {
              if (!form.formState.errors.message) {
                e.currentTarget.style.borderColor = '#FF006E'
              }
            }}
            onMouseLeave={e => {
              if (!form.formState.errors.message) {
                e.currentTarget.style.borderColor = '#2A2A3E'
              }
            }}
          />
          {form.formState.errors.message?.message && (
            <p style={arcadeErrorText}>{form.formState.errors.message.message}</p>
          )}
        </FieldContent>
      </Field>

      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer transition-all rounded-lg"
        style={{
          fontFamily: 'var(--font-arcade)',
          fontSize: 18,
          padding: '12px 30px',
          height: 48,
          background: isPending ? '#CC0058' : '#FF006E',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: isPending ? 'none' : '0 0 12px #FF006E59, 0 0 24px #FF006E33',
          opacity: isPending ? 0.3 : 1,
        }}
        onMouseEnter={e => {
          if (!isPending) {
            e.currentTarget.style.filter = 'brightness(1.15)'
            e.currentTarget.style.boxShadow = '0 0 24px #FF006E66, 0 0 48px #FF006E40'
          }
        }}
        onMouseLeave={e => {
          if (!isPending) {
            e.currentTarget.style.filter = 'brightness(1)'
            e.currentTarget.style.boxShadow = '0 0 12px #FF006E59, 0 0 24px #FF006E33'
          }
        }}
      >
        {isPending ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </form>
  )
}
