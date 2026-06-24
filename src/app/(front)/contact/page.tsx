import { Mail, Phone, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ContactForm } from './contact-form'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <h1
              className="text-5xl md:text-6xl mb-4"
              style={{
                fontFamily: 'var(--font-arcade)',
                color: '#FF006E',
                textShadow: '0 0 24px #FF006E80, 0 0 48px #FF006E4d',
              }}
            >
              ติดต่อเรา
            </h1>
            <p
              className="text-lg"
              style={{
                fontFamily: 'var(--font-arcade-body)',
                color: '#9999AA',
              }}
            >
              หากคุณมีคำถามหรือข้อสงสัย สามารถติดต่อเราได้ผ่านช่องทางด้านล่างนี้
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                {/* Email */}
                <div
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ background: '#12121F', border: '1px solid #2A2A3E' }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: '#00F0FF15' }}
                  >
                    <Mail
                      className="size-5"
                      style={{ color: '#00F0FF' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ fontFamily: 'var(--font-arcade-body)', color: '#EEEEF0' }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-arcade-body)', color: '#9999AA' }}
                    >
                      contact@example.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ background: '#12121F', border: '1px solid #2A2A3E' }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: '#00F0FF15' }}
                  >
                    <Phone
                      className="size-5"
                      style={{ color: '#00F0FF' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ fontFamily: 'var(--font-arcade-body)', color: '#EEEEF0' }}
                    >
                      เบอร์โทรศัพท์
                    </p>
                    <p
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-arcade-body)', color: '#9999AA' }}
                    >
                      02-xxx-xxxx
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div
                  className="flex items-center gap-4 p-4 rounded-lg"
                  style={{ background: '#12121F', border: '1px solid #2A2A3E' }}
                >
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: '#39FF1415' }}
                  >
                    <Clock
                      className="size-5"
                      style={{ color: '#39FF14' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ fontFamily: 'var(--font-arcade-body)', color: '#EEEEF0' }}
                    >
                      เวลาทำการ
                    </p>
                    <p
                      className="text-sm"
                      style={{ fontFamily: 'var(--font-arcade-body)', color: '#9999AA' }}
                    >
                      จันทร์ - ศุกร์: 09:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              <Separator
                className="opacity-30"
                style={{ backgroundColor: '#2A2A3E' }}
              />

              <div
                className="text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-arcade-body)', color: '#9999AA' }}
              >
                เรายินดีให้คำปรึกษาและตอบทุกข้อสงสัย <br />
                กรุณาทิ้งข้อความของคุณไว้ แล้วเราจะติดต่อกลับโดยเร็วที่สุด
              </div>
            </div>

            {/* Form card */}
            <div
              className="p-6 md:p-8 rounded-xl"
              style={{
                background: '#1A1A2E',
                border: '1px solid #FF006E66',
                boxShadow: '0 0 24px #FF006E33, 0 0 48px #FF006E1a',
              }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
