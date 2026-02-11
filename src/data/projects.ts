import type { Project } from '@/components/ProjectShowcase'

export interface ProjectSection {
  id: string
  title?: string
  projects: Project[]
}

const defaultSupplementary = 'Placeholder for supplementary info.'

// Projects organized by category/tab
export const projectSectionsByCategory: Record<string, ProjectSection[]> = {
  'go-to-market': [
    {
      id: 'gtm-core',
      projects: [
        {
          id: 'gtm-styleme',
          title: 'Style.me Market Entry and Sales Enablement',
          description: 'Built the go-to-market foundation for Style.me, a fashion-tech SaaS virtual fitting platform, defining core messaging and sales enablement assets, and conducting market research across 150+ retailers to validate demand and prioritize global pilot customers.',
          highlights: [],
          tags: ['product marketing', '0→1 startup marketing', 'GTM strategy', 'market research'],
          imageUrl: '/images/launch_GTM_styleme.svg',
          imageUrls: ['/images/launch_GTM_styleme.svg', '/images/launch_IMC_booth_styleme2.svg'],
        },
        {
          id: 'gtm-corel',
          title: 'Corel Graphics & Productivity GTM',
          description: 'Led APJ sales and marketing launches across 12 countries and 6 locales, owning pricing strategy, packaging signoff, and product lifecycle operations. Pioneered Corel’s first double-byte commercialization and launched a BSA anti-piracy program in Greater China, driving 20% conversion and 23% enterprise sales growth.',
          highlights: [],
          tags: ['international product marketing', 'pricing & lifecycle management', 'sales enablement', 'regional GTM strategy'],
          imageUrl: '/images/launch_IMC_corel.svg',
        },
      ],
    },
  ],
  'integrated-campaigns': [
    {
      id: 'weare-omnichannel',
      title: '',
      projects: [
        {
          id: 'imc-weare-omnichannel',
          title: 'weArethefuture Omnichannel Brand Activation',
          description: 'Activated weArethefuture through integrated field marketing programs spanning influencer events, runway shows, tradeshows, retail activations with designer partners, and co-marketing initiatives to expand market reach, build local brand awareness, and align with fashion designers and platforms.',
          highlights: [],
          tags: ['co-branding', 'field marketing', 'strategic alignment', 'influencer marketing'],
          imageUrl: '/images/launch_IMC_weare_YTFF.svg',
          imageUrls: [
            '/images/launch_IMC_weare_YTFF.svg',
            '/images/launch_IMC_weare_GZshow.svg',
            '/images/launch_IMC_weare_SHshow.svg',
          ],
        },
      ],
    },
    {
      id: 'patient-purpose-day',
      title: '',
      projects: [
        {
          id: 'patient-purpose-day-project',
          title: 'Patient Purpose Day',
          description: 'Produced Patient Purpose Day experiences celebrating patients and caregivers, blending keynote stories, community activations, and digital content to deepen empathy, strengthen brand trust, and inspire internal teams globally in 2025.',
          highlights: [],
          imageUrl: '/images/launch_PD_placeholder.svg',
        },
      ],
    },
    {
      id: 'healthcare-customer-day',
      title: 'DKSH Healthcare Taiwan Customer Day - Field Engagement Event',
      projects: [
        {
          id: 'healthcare-customer-day-project',
          title: 'DKSH Healthcare Taiwan Customer Day - Field Engagement Event',
          description: 'Architected an integrated field marketing activation event combining cross-functional BU collaboration, customer visits, structured Voice of Customer capture, and same-day organizational alignment to strengthen commercial focus and service growth.',
          bullets: [
            'Mobilized 17 cross-functional teams across 45 customer visits in one afternoon, engaging pharmacists, physicians, and healthcare experts firsthand',
            'Designed an on-site VoC survey mechanism to surface pain points, improvement priorities, and customer service wishlists',
            'Built a real-time Padlet insight workflow to consolidate feedback instantly across teams and touchpoints',
            'Closed the loop through a same-day hybrid town hall, translating customer intelligence into sales enablement, service enhancement, and partnership momentum',
            'Recognized with the 2025 DKSH Taiwan Fantree Award (Enriching People’s Lives/Collaboration), the company’s highest internal honor, with a CHF 1,000 prize',
          ],
          tags: ['field marketing', 'customer engagement', 'customer insights', 'sales enablement', 'commercial alignment'],
          exposureLinks: [
            { label: 'Padlet', url: 'https://padlet.com/dkshtw/2024-utffbgpm661e9tf' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/posts/dksh_dkshtaiwan-hxmkhpiwvjiumzbihd-dkshhealthcare-activity-7212395120678113280-vwMK?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAWjNzgB3DLfF0YTdAmlFlcAyzmnFnt1hOI' },
            { label: 'Facebook', url: 'https://www.facebook.com/reel/656823623327065' },
            { label: 'YouTube video', url: 'https://youtu.be/v2iGrlg8h1E?si=cn3HUD7MduFk38KX' },
          ],
          highlights: [],
          imageUrl: '/images/launch_PD_placeholder.svg',
        },
      ],
    },
  ],
  'digital-commerce': [
    {
      id: 'digital-commerce-core',
      projects: [
        {
          id: 'digital-joie',
          title: 'Joie Digital Commerce Initiative',
          description: 'Placeholder summary for Joie digital commerce initiative.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_GTM_joie.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'digital-xiaomi',
          title: 'Xiaomi Digital Commerce Initiative',
          description: 'Placeholder summary for Xiaomi digital commerce initiative.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_xiaomi.svg',
          supplementary: defaultSupplementary,
        },
      ],
    },
  ],
}

export function getProjectSectionsByCategory(category: string): ProjectSection[] {
  return projectSectionsByCategory[category] || []
}
