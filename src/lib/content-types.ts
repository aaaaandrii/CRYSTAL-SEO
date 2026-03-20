// Defines the field schema for each ContentItem type and PageContent section
// Used by admin editors to render appropriate form fields

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'select' | 'number' | 'boolean' | 'json';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface ContentTypeDef {
  type: string;
  label: string;
  labelPlural: string;
  description: string;
  nameField: string; // which field to show as the item name in lists
  fields: FieldDef[];
}

export const contentTypes: Record<string, ContentTypeDef> = {
  benefit: {
    type: 'benefit',
    label: 'Benefit',
    labelPlural: 'Benefits',
    description: 'Why 5D Crystal benefit cards on the homepage',
    nameField: 'title',
    fields: [
      { key: 'icon', label: 'Icon Path', type: 'text', placeholder: '/icons/icon-name.svg' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  sector: {
    type: 'sector',
    label: 'Sector',
    labelPlural: 'Sectors',
    description: 'Service sector cards shown on homepage and sectors page',
    nameField: 'title',
    fields: [
      { key: 'slug', label: 'Slug', type: 'text', placeholder: 'e.g. space-agencies' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image Path', type: 'text', placeholder: '/sectors/image.png' },
      { key: 'icon', label: 'Icon Path', type: 'text', placeholder: '/icons/icon.svg' },
    ],
  },
  faq: {
    type: 'faq',
    label: 'FAQ',
    labelPlural: 'FAQ Items',
    description: 'Frequently asked questions on the FAQ page',
    nameField: 'question',
    fields: [
      { key: 'question', label: 'Question', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'textarea' },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { value: 'technology', label: 'Technology' },
          { value: 'security', label: 'Security' },
          { value: 'storage', label: 'Storage' },
          { value: 'ordering', label: 'Ordering' },
        ],
      },
    ],
  },
  'process-step': {
    type: 'process-step',
    label: 'Process Step',
    labelPlural: 'Process Steps',
    description: 'Steps in the Our Process section on the homepage',
    nameField: 'title',
    fields: [
      { key: 'number', label: 'Step Number', type: 'text', placeholder: '01' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image Path', type: 'text', placeholder: '/images/step.png' },
    ],
  },
  'media-quote': {
    type: 'media-quote',
    label: 'Media Quote',
    labelPlural: 'Media Quotes',
    description: 'Press quotes shown in the recognition bar',
    nameField: 'source',
    fields: [
      { key: 'quote', label: 'Quote', type: 'textarea' },
      { key: 'source', label: 'Source', type: 'text', placeholder: 'e.g. BBC News' },
    ],
  },
  'partner-logo': {
    type: 'partner-logo',
    label: 'Partner Logo',
    labelPlural: 'Partner Logos',
    description: 'Trusted By logos on the homepage',
    nameField: 'name',
    fields: [
      { key: 'name', label: 'Partner Name', type: 'text' },
      { key: 'logo', label: 'Logo Path', type: 'text', placeholder: '/logos/PARTNER.png' },
    ],
  },
  'comparison-row': {
    type: 'comparison-row',
    label: 'Comparison Row',
    labelPlural: 'Comparison Rows',
    description: 'Rows in the comparison table on the homepage',
    nameField: 'feature',
    fields: [
      { key: 'feature', label: 'Feature', type: 'text' },
      { key: 'crystal', label: '5D Crystal Value', type: 'text' },
      { key: 'hdd', label: 'HDD/SSD Value', type: 'text' },
      { key: 'tape', label: 'Tape Value', type: 'text' },
    ],
  },
  'lifespan-bar': {
    type: 'lifespan-bar',
    label: 'Lifespan Bar',
    labelPlural: 'Lifespan Bars',
    description: 'Lifespan comparison bars in the comparison section',
    nameField: 'name',
    fields: [
      { key: 'name', label: 'Storage Name', type: 'text' },
      { key: 'years', label: 'Years', type: 'number' },
      { key: 'mobileYears', label: 'Mobile Years (compact)', type: 'number' },
      { key: 'unit', label: 'Unit Label', type: 'text', placeholder: 'e.g. years, billion years' },
      { key: 'highlight', label: 'Highlighted', type: 'boolean' },
    ],
  },
};

// PageContent section definitions - describes what fields each section has
export interface SectionDef {
  page: string;
  section: string;
  label: string;
  description: string;
  fields: FieldDef[];
}

export const pageSections: SectionDef[] = [
  {
    page: 'home',
    section: 'hero',
    label: 'Hero Section',
    description: 'Main hero banner with headline, description, and CTAs',
    fields: [
      { key: 'badge1', label: 'Badge 1', type: 'text' },
      { key: 'badge2', label: 'Badge 2', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cta1Text', label: 'CTA 1 Text', type: 'text' },
      { key: 'cta1Href', label: 'CTA 1 Link', type: 'text' },
      { key: 'cta2Text', label: 'CTA 2 Text', type: 'text' },
      { key: 'cta2Href', label: 'CTA 2 Link', type: 'text' },
      { key: 'videoSrc', label: 'Video Source', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'trusted-by',
    label: 'Trusted By Bar',
    description: 'Partner logos bar label',
    fields: [
      { key: 'label', label: 'Label Text', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'recognition',
    label: 'Recognition Bar',
    description: 'As Featured In media recognition section',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'text', label: 'Description Text', type: 'textarea' },
    ],
  },
  {
    page: 'home',
    section: 'benefits',
    label: 'Benefits Section',
    description: 'Why 5D Crystal section heading',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'comparison',
    label: 'Comparison Section',
    description: 'Storage comparison table section',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    page: 'home',
    section: 'sectors',
    label: 'Sectors Section',
    description: 'Service sectors grid section',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'subheading', label: 'Subheading', type: 'textarea' },
    ],
  },
  {
    page: 'home',
    section: 'process',
    label: 'Process Section',
    description: 'Our Process steps section',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaText', label: 'CTA Text', type: 'text' },
      { key: 'ctaHref', label: 'CTA Link', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'swiss-made',
    label: 'Swiss Made Section',
    description: 'Swiss Made quality section',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaText', label: 'CTA Text', type: 'text' },
      { key: 'ctaHref', label: 'CTA Link', type: 'text' },
      { key: 'image', label: 'Image Path', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'space-proven',
    label: 'Space Proven Section',
    description: 'Space Proven technology section',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaText', label: 'CTA Text', type: 'text' },
      { key: 'ctaHref', label: 'CTA Link', type: 'text' },
      { key: 'image', label: 'Image Path', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'case-studies',
    label: 'Case Studies Section',
    description: 'Case studies section heading and CTA',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaText', label: 'CTA Text', type: 'text' },
      { key: 'ctaHref', label: 'CTA Link', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'news',
    label: 'News Section',
    description: 'News section heading and CTA',
    fields: [
      { key: 'label', label: 'Section Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'ctaText', label: 'CTA Text', type: 'text' },
      { key: 'ctaHref', label: 'CTA Link', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'save-data',
    label: 'Save Data Section',
    description: 'Save Your Most Valuable Data CTA section',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'cta1Text', label: 'CTA 1 Text', type: 'text' },
      { key: 'cta1Href', label: 'CTA 1 Link', type: 'text' },
      { key: 'cta2Text', label: 'CTA 2 Text', type: 'text' },
      { key: 'cta2Href', label: 'CTA 2 Link', type: 'text' },
    ],
  },
  {
    page: 'home',
    section: 'cta',
    label: 'CTA Section',
    description: 'Bottom CTA section with two columns',
    fields: [
      { key: 'leftLabel', label: 'Left Label', type: 'text' },
      { key: 'leftHeading', label: 'Left Heading', type: 'text' },
      { key: 'leftDescription', label: 'Left Description', type: 'textarea' },
      { key: 'leftCtaText', label: 'Left CTA Text', type: 'text' },
      { key: 'leftCtaHref', label: 'Left CTA Link', type: 'text' },
      { key: 'rightLabel', label: 'Right Label', type: 'text' },
      { key: 'rightHeading', label: 'Right Heading', type: 'text' },
      { key: 'rightDescription', label: 'Right Description', type: 'textarea' },
      { key: 'rightCtaText', label: 'Right CTA Text', type: 'text' },
      { key: 'rightCtaHref', label: 'Right CTA Link', type: 'text' },
    ],
  },
];
