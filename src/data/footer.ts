import { FooterColumn } from '@/types';

export const footerColumns: FooterColumn[] = [
  {
    title: 'Technology',
    links: [
      { label: 'How it Works', href: '/technology' },
      { label: '5D Optical Storage', href: '/technology#science' },
      { label: 'DNA Storage', href: '/technology#dna' },
      { label: 'Environmental Impact', href: '/technology#environment' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Personal & Family', href: '/services#personal' },
      { label: 'Corporate & Legal', href: '/services#corporate' },
      { label: 'Cultural Heritage', href: '/services#cultural' },
      { label: 'DNA & Genomics', href: '/services#dna' },
      { label: 'Government & Defence', href: '/services#government' },
      { label: 'Luxury & Jewellery', href: '/services#luxury' },
      { label: 'Crypto & Blockchain', href: '/services#crypto' },
      { label: 'IP Protection', href: '/services#ip' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'News', href: '/news' },
      { label: 'Collections', href: '/collections' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Trust & Process', href: '/process' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Research', href: '/technology#research' },
      { label: 'Press', href: '/news' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];
