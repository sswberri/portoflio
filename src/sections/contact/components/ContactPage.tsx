import { ContactInfo } from './ContactInfo'
import { ContactForm } from './ContactForm'

interface ContactPageProps {
  headline: string
  subheadline: string
  email: string
  linkedInUrl: string
  linkedInHandle: string
  resumeUrl: string
  onFormSubmit?: (data: { name: string; email: string; message: string }) => Promise<void>
}

export function ContactPage({
  headline,
  subheadline,
  email,
  linkedInUrl,
  linkedInHandle,
  resumeUrl,
  onFormSubmit,
}: ContactPageProps) {
  return (
    <section className="py-12 lg:py-20">
      {/* Section Title - Editorial Style */}
      <div className="mb-16 lg:mb-24">
        <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-slate-900 dark:text-white mb-6">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
          {subheadline}
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Contact Details */}
        <div>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-8">
            Contact Details
          </h2>
          <ContactInfo
            email={email}
            linkedInUrl={linkedInUrl}
            linkedInHandle={linkedInHandle}
            resumeUrl={resumeUrl}
          />
        </div>

        {/* Right: Contact Form */}
        <div>
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-8">
            Send a Message
          </h2>
          <ContactForm onSubmit={onFormSubmit} />
        </div>
      </div>
    </section>
  )
}
