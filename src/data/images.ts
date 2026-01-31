// Image mapping based on file naming convention
// Format: {category}_{subcategory}_{name}.svg

export const imageMap = {
  // Brand & Content
  'brand-content': {
    'thought-leadership': [
      '/images/brand_ThL_expertise.svg',
      '/images/brand_ThL_insight.svg',
      '/images/brand_ThL_scm.svg',
      '/images/brand_ThL_SS.svg',
    ],
    'content-marketing': [
      '/images/brand_CM_placeholder.svg',
    ],
    'brand-photography': [
      '/images/brand_BP_placeholder.svg',
    ],
  },

  // Launches & Campaigns
  launches: {
    'go-to-market': [
      '/images/launch_GTM_google.svg',
      '/images/launch_GTM_joie.svg',
      '/images/launch_GTM_styleme.svg',
    ],
    'integrated-campaigns': [
      '/images/launch_IMC_corel.svg',
      '/images/launch_IMC_xiaomi.svg',
      '/images/launch_IMC_weare01.svg',
      '/images/launch_IMC_weare02.svg',
      '/images/launch_IMC_weare03.svg',
      '/images/launch_IMC_weare_YTFF.svg',
      '/images/launch_IMC_weare_GZshow.svg',
      '/images/launch_IMC_weare_SHshow.svg',
      '/images/launch_IMC_openrice_grandlaunch.svg',
      '/images/launch_IMC_opening_OP.svg',
      '/images/launch_IMC_tradeshow_styleme.svg',
      '/images/launch_IMC_booth_styleme2.svg',
    ],
    'digital-commerce': [
      '/images/launch_PD_placeholder.svg',
    ],
  },

  // Corporate Communications
  corporate: {
    'media-pr': [
      '/images/corp_media_openrice_exposure.svg',
    ],
    'sustainability-csr': [
      '/images/corp_sustainability_award01.svg',
      '/images/corp_sustainability_award02.svg',
    ],
    'reputation-issues': [
      '/images/corp_reputation_award.svg',
    ],
  },
} as const

export type ImageCategory = keyof typeof imageMap
export type BrandContentTab = keyof typeof imageMap['brand-content']
export type LaunchesTab = keyof typeof imageMap['launches']
export type CorporateTab = keyof typeof imageMap['corporate']
