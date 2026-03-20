// CMS Architecture: Pages → Blocks → Inputs
// Each page contains blocks. Each block has section fields + optional list items.

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'select' | 'number' | 'boolean';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface BlockDef {
  id: string; // matches PageContent section name
  label: string;
  description: string;
  fields: FieldDef[]; // PageContent fields for this block
  items?: {
    type: string; // ContentItem type
    label: string;
    labelPlural: string;
    nameField: string;
    fields: FieldDef[];
  }[];
}

export interface PageDef {
  id: string;
  label: string;
  description: string;
  blocks: BlockDef[];
}

export const pages: PageDef[] = [
  {
    id: 'home',
    label: 'Homepage',
    description: 'Main landing page with hero, benefits, sectors, and more',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Main banner with headline, description, badges, and CTAs',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'headingSuperscript', label: 'Heading Superscript', type: 'text', placeholder: '*' },
          { key: 'footnote', label: 'Footnote', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
          { key: 'lifespanLabel', label: 'Lifespan Label', type: 'text' },
          { key: 'videoSrc', label: 'Hero Video', type: 'image' },
        ],
      },
      {
        id: 'trusted-by',
        label: 'Trusted By',
        description: 'Partner logos bar',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
        ],
        items: [
          {
            type: 'partner-logo',
            label: 'Partner Logo',
            labelPlural: 'Partner Logos',
            nameField: 'name',
            fields: [
              { key: 'name', label: 'Partner Name', type: 'text' },
              { key: 'logo', label: 'Logo', type: 'image' },
            ],
          },
        ],
      },
      {
        id: 'recognition',
        label: 'Recognition',
        description: 'Media recognition and press quotes',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'text', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'media-quote',
            label: 'Media Quote',
            labelPlural: 'Media Quotes',
            nameField: 'source',
            fields: [
              { key: 'quote', label: 'Quote', type: 'textarea' },
              { key: 'source', label: 'Source', type: 'text', placeholder: 'e.g. BBC News' },
            ],
          },
        ],
      },
      {
        id: 'benefits',
        label: 'Benefits',
        description: 'Why 5D Crystal — benefit cards',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
        ],
        items: [
          {
            type: 'benefit',
            label: 'Benefit',
            labelPlural: 'Benefits',
            nameField: 'title',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'icon', label: 'Icon', type: 'image' },
            ],
          },
        ],
      },
      {
        id: 'comparison',
        label: 'Comparison',
        description: 'Storage comparison table and lifespan bars',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'comparison-row',
            label: 'Comparison Row',
            labelPlural: 'Comparison Rows',
            nameField: 'feature',
            fields: [
              { key: 'feature', label: 'Feature', type: 'text' },
              { key: 'crystal', label: '5D Crystal', type: 'text' },
              { key: 'hdd', label: 'HDD/SSD', type: 'text' },
              { key: 'tape', label: 'Tape/Cloud', type: 'text' },
            ],
          },
          {
            type: 'lifespan-bar',
            label: 'Lifespan Bar',
            labelPlural: 'Lifespan Bars',
            nameField: 'name',
            fields: [
              { key: 'name', label: 'Storage Name', type: 'text' },
              { key: 'years', label: 'Years', type: 'text' },
              { key: 'mobileYears', label: 'Mobile Display', type: 'text' },
              { key: 'unit', label: 'Unit Label', type: 'text', placeholder: 'YRS' },
              { key: 'highlight', label: 'Highlighted', type: 'boolean' },
            ],
          },
        ],
      },
      {
        id: 'save-data',
        label: 'Save Your Data CTA',
        description: 'Mid-page call-to-action section',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
      {
        id: 'sectors',
        label: 'Sectors',
        description: 'Service sectors grid',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'subheading', label: 'Subheading', type: 'textarea' },
        ],
        items: [
          {
            type: 'sector',
            label: 'Sector',
            labelPlural: 'Sectors',
            nameField: 'title',
            fields: [
              { key: 'slug', label: 'Slug', type: 'text', placeholder: 'space-tech' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image', type: 'image' },
              { key: 'icon', label: 'Icon', type: 'image' },
            ],
          },
        ],
      },
      {
        id: 'process',
        label: 'Process',
        description: 'How it works — step-by-step',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'ctaText', label: 'Button Text', type: 'text' },
          { key: 'ctaHref', label: 'Button Link', type: 'text' },
        ],
        items: [
          {
            type: 'process-step',
            label: 'Step',
            labelPlural: 'Steps',
            nameField: 'title',
            fields: [
              { key: 'number', label: 'Step Number', type: 'text', placeholder: '01' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image', type: 'image' },
            ],
          },
        ],
      },
      {
        id: 'swiss-made',
        label: 'Swiss Made',
        description: 'Swiss quality section',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'ctaText', label: 'Button Text', type: 'text' },
          { key: 'ctaHref', label: 'Button Link', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' },
        ],
      },
      {
        id: 'space-proven',
        label: 'Space Proven',
        description: 'Space technology section',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'ctaText', label: 'Button Text', type: 'text' },
          { key: 'ctaHref', label: 'Button Link', type: 'text' },
          { key: 'image', label: 'Image', type: 'image' },
        ],
      },
      {
        id: 'case-studies',
        label: 'Case Studies',
        description: 'Case studies section heading',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'ctaText', label: 'Button Text', type: 'text' },
          { key: 'ctaHref', label: 'Button Link', type: 'text' },
        ],
      },
      {
        id: 'news',
        label: 'Latest News',
        description: 'News section heading',
        fields: [
          { key: 'label', label: 'Section Label', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'ctaText', label: 'Button Text', type: 'text' },
          { key: 'ctaHref', label: 'Button Link', type: 'text' },
        ],
      },
      {
        id: 'cta',
        label: 'Bottom CTA',
        description: 'Two-column call-to-action at page bottom',
        fields: [
          { key: 'leftLabel', label: 'Left Column Label', type: 'text' },
          { key: 'leftHeading', label: 'Left Column Heading', type: 'text' },
          { key: 'leftDescription', label: 'Left Column Description', type: 'textarea' },
          { key: 'leftCtaText', label: 'Left Button Text', type: 'text' },
          { key: 'leftCtaHref', label: 'Left Button Link', type: 'text' },
          { key: 'rightLabel', label: 'Right Column Label', type: 'text' },
          { key: 'rightHeading', label: 'Right Column Heading', type: 'text' },
          { key: 'rightDescription', label: 'Right Column Description', type: 'textarea' },
          { key: 'rightCtaText', label: 'Right Button Text', type: 'text' },
          { key: 'rightCtaHref', label: 'Right Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions page',
    blocks: [
      {
        id: 'faq-items',
        label: 'FAQ Items',
        description: 'Questions and answers grouped by category',
        fields: [],
        items: [
          {
            type: 'faq',
            label: 'FAQ',
            labelPlural: 'FAQ Items',
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
        ],
      },
    ],
  },
];

// Helper: find a page definition
export function getPageDef(pageId: string): PageDef | undefined {
  return pages.find((p) => p.id === pageId);
}

// Helper: find a block definition
export function getBlockDef(pageId: string, blockId: string): BlockDef | undefined {
  return getPageDef(pageId)?.blocks.find((b) => b.id === blockId);
}
