import { Mail, Linkedin, FileDown, ArrowUpRight } from 'lucide-react'

interface ContactInfoProps {
  email: string
  linkedInUrl: string
  linkedInHandle: string
  resumeUrl: string
}

export function ContactInfo({
  email,
  linkedInUrl,
  linkedInHandle,
  resumeUrl,
}: ContactInfoProps) {
  return (
    <div className="space-y-8">
      {/* Email */}
      <a
        href={`mailto:${email}`}
        className="group block"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Email
            </p>
            <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors break-all">
              {email}
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex-shrink-0 mt-1" />
        </div>
      </a>

      {/* LinkedIn */}
      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
            <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              LinkedIn
            </p>
            <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              @{linkedInHandle}
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex-shrink-0 mt-1" />
        </div>
      </a>

      {/* Resume */}
      <a
        href={resumeUrl}
        download
        className="group block"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
            <FileDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Resume
            </p>
            <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              Download PDF
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex-shrink-0 mt-1" />
        </div>
      </a>
    </div>
  )
}
