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
          id: 'gtm-google',
          title: 'Google Go-To-Market Campaign',
          description: 'Placeholder summary for Google go-to-market initiative.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_GTM_google.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'gtm-styleme',
          title: 'Style.me Go-To-Market Campaign',
          description: 'Placeholder summary for Style.me go-to-market initiative.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_GTM_styleme.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'gtm-weare-01',
          title: '#weAre the Future Campaign 01',
          description: 'Placeholder summary for #weAre the Future campaign asset.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_weare01.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'gtm-weare-02',
          title: '#weAre the Future Campaign 02',
          description: 'Placeholder summary for #weAre the Future campaign asset.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_weare02.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'gtm-weare-03',
          title: '#weAre the Future Campaign 03',
          description: 'Placeholder summary for #weAre the Future campaign asset.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_weare03.svg',
          supplementary: defaultSupplementary,
        },
      ],
    },
  ],
  'integrated-campaigns': [
    {
      id: 'weare-comarketing',
      title: '#weArethefuture comarketing',
      projects: [
        {
          id: 'imc-weare-shshow',
          title: '#weArethefuture SH Show',
          description: 'Placeholder summary for #weArethefuture co-marketing project.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_weare_SHshow.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'imc-weare-gzshow',
          title: '#weArethefuture GZ Show',
          description: 'Placeholder summary for #weArethefuture co-marketing project.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_weare_GZshow.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'imc-weare-ytff',
          title: '#weArethefuture YTFF',
          description: 'Placeholder summary for #weArethefuture co-marketing project.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_IMC_weare_YTFF.svg',
          supplementary: defaultSupplementary,
        },
      ],
    },
    {
      id: 'shaping-healthcare',
      title: '#ShapingHealthcare',
      projects: [
        {
          id: 'shaping-healthcare-customer-day',
          title: 'Healthcare Customer Day',
          description: 'Placeholder summary for healthcare customer day project.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_PD_placeholder.svg',
          supplementary: defaultSupplementary,
        },
        {
          id: 'shaping-healthcare-patient-purpose-day',
          title: 'Patient Purpose Day',
          description: 'Placeholder summary for patient purpose day project.',
          highlights: ['Placeholder for key contributions and outcomes.'],
          imageUrl: '/images/launch_PD_placeholder.svg',
          supplementary: defaultSupplementary,
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
