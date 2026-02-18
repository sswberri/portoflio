export interface CompanyLogo {
  id: string
  name: string
  logoUrl: string
  period: string
  startYear: number
  location: string
  narrativeOrder: number
  scale?: number
  group?: string
}

export interface TimelineGroup {
  period: string
  startYear: number
}

export const timelineGroups: Record<string, TimelineGroup> = {
  'nuna-joie': { period: '2022 – 2023', startYear: 2022 },
  'htc-vive': { period: '2021 – 2022', startYear: 2021 },
  'gts': { period: '2018 – 2019', startYear: 2018 },
  'nogle-styleme': { period: '2016 – 2017', startYear: 2016 },
}

export const companies: CompanyLogo[] = [
  {
    id: 'dksh',
    name: 'DKSH',
    logoUrl: '/images/logowall_svg_200x200/dksh.svg',
    period: '2023 – Present',
    startYear: 2023,
    location: 'Taiwan',
    narrativeOrder: 1,
  },
  {
    id: 'google',
    name: 'Google',
    logoUrl: '/images/logowall_svg_200x200/google.svg',
    period: '2019 – 2020',
    startYear: 2019,
    location: 'Mountain View, USA',
    narrativeOrder: 2,
  },
  {
    id: 'htc',
    name: 'HTC',
    logoUrl: '/images/logowall_svg_200x200/htc.svg',
    period: '2020 – 2021',
    startYear: 2020,
    location: 'Taiwan',
    narrativeOrder: 3,
    group: 'htc-vive',
  },
  {
    id: 'vive',
    name: 'VIVE',
    logoUrl: '/images/logowall_svg_200x200/vive.svg',
    period: '2020 – 2021',
    startYear: 2020,
    location: 'Taiwan',
    narrativeOrder: 4,
    group: 'htc-vive',
  },
  {
    id: 'corel',
    name: 'Corel',
    logoUrl: '/images/logowall_svg_200x200/corel.svg',
    period: '2007 – 2012',
    startYear: 2007,
    location: 'Taiwan',
    narrativeOrder: 5,
    scale: 1.25,
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logoUrl: '/images/logowall_svg_200x200/xiaomi.svg',
    period: '2017 – 2018',
    startYear: 2017,
    location: 'Guangzhou, China',
    narrativeOrder: 6,
    scale: 0.65,
    group: 'gts',
  },
  {
    id: 'nogle',
    name: 'Nogle',
    logoUrl: '/images/logowall_svg_200x200/nogle.svg',
    period: '2016 – 2017',
    startYear: 2016,
    location: 'Taiwan',
    narrativeOrder: 7,
    group: 'nogle-styleme',
  },
  {
    id: 'styleme',
    name: 'Style.me',
    logoUrl: '/images/logowall_svg_200x200/style.me.svg',
    period: '2016 – 2017',
    startYear: 2016,
    location: 'Taiwan',
    narrativeOrder: 8,
    group: 'nogle-styleme',
  },
  {
    id: 'nuna',
    name: 'Nuna',
    logoUrl: '/images/logowall_svg_200x200/nuna.svg',
    period: '2022 – 2023',
    startYear: 2022,
    location: 'Taiwan',
    narrativeOrder: 9,
    group: 'nuna-joie',
  },
  {
    id: 'joie',
    name: 'Joie',
    logoUrl: '/images/logowall_svg_200x200/joie.svg',
    period: '2022 – 2023',
    startYear: 2022,
    location: 'Taiwan',
    narrativeOrder: 10,
    scale: 0.85,
    group: 'nuna-joie',
  },
  {
    id: 'mybug',
    name: 'MyBug',
    logoUrl: '/images/logowall_svg_200x200/mybug.svg',
    period: '2012 – 2013',
    startYear: 2012,
    location: 'Taiwan',
    narrativeOrder: 11,
    group: 'gts',
  },
  {
    id: 'weare',
    name: 'WeAre the future',
    logoUrl: '/images/logowall_svg_200x200/weare.svg',
    period: '2021 – 2022',
    startYear: 2021,
    location: 'Taiwan',
    narrativeOrder: 12,
    group: 'gts',
  },
  {
    id: 'cyworld',
    name: 'Cyworld',
    logoUrl: '/images/logowall_svg_200x200/cyworld.svg',
    period: '2006 – 2007',
    startYear: 2006,
    location: 'Taiwan',
    narrativeOrder: 13,
    scale: 1.25,
  },
  {
    id: 'openrice',
    name: 'OpenRice',
    logoUrl: '/images/logowall_svg_200x200/openrice.svg',
    period: '2013 – 2014',
    startYear: 2013,
    location: 'Taiwan',
    narrativeOrder: 14,
    scale: 1.2,
  },
  {
    id: 'herbalife',
    name: 'Herbalife',
    logoUrl: '/images/logowall_svg_200x200/herbalife.svg',
    period: '2015 – 2016',
    startYear: 2015,
    location: 'Taiwan',
    narrativeOrder: 15,
    scale: 1.25,
  },
]
