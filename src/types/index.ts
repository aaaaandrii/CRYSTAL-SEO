export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  crystal5d: string;
  silicaDisc: string;
  magneticTape: string;
  ssd: string;
  hdd: string;
}

export interface Sector {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'technology' | 'ordering' | 'storage' | 'security';
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
