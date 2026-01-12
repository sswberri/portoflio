import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; message: string }) => Promise<void>
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate API call for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-16 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
          Message Sent!
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          Thank you for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:border-slate-900 dark:focus:border-white outline-none transition-colors resize-none"
          placeholder="How can I help you?"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium transition-colors dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:disabled:bg-slate-600"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="uppercase tracking-wider">Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span className="uppercase tracking-wider">Send Message</span>
          </>
        )}
      </button>
    </form>
  )
}
