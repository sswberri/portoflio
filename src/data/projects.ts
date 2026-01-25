import type { Project } from '@/components/ProjectShowcase'

// Projects organized by category/tab
export const projectsByCategory: Record<string, Project[]> = {
  'go-to-market': [
    {
      id: 'corel-apj',
      title: 'Corel Graphics & Productivity Product Launches in Asia-Pacific and Japan (APJ)',
      description: 'Led regional go-to-market strategy and execution for Corel\'s flagship creative and productivity software portfolio across the Asia-Pacific and Japan region.',
      highlights: [
        'Products: CorelDRAW Graphics Suite, Corel Painter, WinZip, including anniversary campaigns and regional creative contests',
        'Localize global sales and marketing launch strategy into region-ready go-to-market plans across 12 countries and 6 locales',
        'Defined and prioritized commercial marketing deliverables including positioning, pricing, SKUs, retail packaging, box shots, web content, media guides, and sales enablement assets',
        'Orchestrated execution across Product, PMM, Sales, E-commerce, Design, Manufacturing, Legal, channel partners, and creator communities including artists, designers, and power users',
      ],
      imageUrl: '/images/launch_IMC_corel.svg',
    },
  ],
  'integrated-campaigns': [],
  'digital-commerce': [],
}

export function getProjectsByCategory(category: string): Project[] {
  return projectsByCategory[category] || []
}
