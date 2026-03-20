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
  {
    id: 'technology',
    label: 'Technology',
    description: 'How 5D optical storage works — science, writing process, sustainability',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Technology' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'tech-stat',
            label: 'Stat',
            labelPlural: 'Stats',
            nameField: 'label',
            fields: [
              { key: 'value', label: 'Value', type: 'text', placeholder: '360' },
              { key: 'unit', label: 'Unit', type: 'text', placeholder: 'TB' },
              { key: 'sup', label: 'Superscript', type: 'text', placeholder: '20' },
              { key: 'label', label: 'Label', type: 'text', placeholder: 'Per Disc Capacity' },
            ],
          },
        ],
      },
      {
        id: 'content-sections',
        label: 'Content Sections',
        description: 'Alternating image/text blocks (science, writing process, sustainability)',
        fields: [],
        items: [
          {
            type: 'tech-section',
            label: 'Section',
            labelPlural: 'Content Sections',
            nameField: 'title',
            fields: [
              { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Core Technology' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image', type: 'image' },
              { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
              { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'cta',
        label: 'CTA',
        description: 'Bottom call-to-action',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'services',
    label: 'Sectors',
    description: 'Storage solutions for every sector — 8 detailed service sections',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Sectors' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'service-details',
        label: 'Service Sections',
        description: 'Detailed sector descriptions with images and bullet points',
        fields: [],
        items: [
          {
            type: 'service-detail',
            label: 'Service',
            labelPlural: 'Services',
            nameField: 'title',
            fields: [
              { key: 'slug', label: 'Slug', type: 'text', placeholder: 'space-tech' },
              { key: 'eyebrow', label: 'Eyebrow', type: 'text', placeholder: 'Space Tech' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image', type: 'image' },
              { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
              { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'problems',
        label: 'Problems We Solve',
        description: 'Six problem cards with icons',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'problem',
            label: 'Problem',
            labelPlural: 'Problems',
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
        id: 'how-it-works',
        label: 'How It Works',
        description: 'Four-step process overview on sectors page',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'services-process-step',
            label: 'Step',
            labelPlural: 'Steps',
            nameField: 'title',
            fields: [
              { key: 'number', label: 'Step Number', type: 'number' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'cta',
        label: 'CTA',
        description: 'Bottom call-to-action',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'process',
    label: 'Trust & Process',
    description: 'Trust process page — four pillars, detailed steps, continuous improvement',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'pillars',
        label: 'Four Pillars of Trust',
        description: 'Overview cards linking to detailed steps',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'trust-pillar',
            label: 'Pillar',
            labelPlural: 'Pillars',
            nameField: 'title',
            fields: [
              { key: 'number', label: 'Number', type: 'number' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'summary', label: 'Summary', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'steps',
        label: 'Detailed Steps',
        description: 'Full step descriptions with images and bullet points',
        fields: [],
        items: [
          {
            type: 'trust-step',
            label: 'Step',
            labelPlural: 'Steps',
            nameField: 'title',
            fields: [
              { key: 'step', label: 'Step Number', type: 'number' },
              { key: 'id', label: 'Anchor ID', type: 'text', placeholder: 'secure-transfer' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image', type: 'image' },
              { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
              { key: 'bullets', label: 'Bullet Points (one per line)', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'continuous-improvement',
        label: 'Continuous Improvement',
        description: 'Looking ahead section',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'subheading', label: 'Subheading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'cta',
        label: 'CTA',
        description: 'Bottom call-to-action',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    description: 'Company story, values, milestones, and stats',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'story',
        label: 'Our Story',
        description: 'Company history with image',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'paragraph1', label: 'Paragraph 1', type: 'textarea' },
          { key: 'paragraph2', label: 'Paragraph 2', type: 'textarea' },
          { key: 'image', label: 'Image', type: 'image' },
          { key: 'imageAlt', label: 'Image Alt Text', type: 'text' },
        ],
      },
      {
        id: 'values',
        label: 'Our Values',
        description: 'Company values cards',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
        ],
        items: [
          {
            type: 'value',
            label: 'Value',
            labelPlural: 'Values',
            nameField: 'title',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'milestones',
        label: 'Key Milestones',
        description: 'Company timeline',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
        ],
        items: [
          {
            type: 'milestone',
            label: 'Milestone',
            labelPlural: 'Milestones',
            nameField: 'title',
            fields: [
              { key: 'year', label: 'Year', type: 'text' },
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'stats',
        label: 'Stats',
        description: 'Key numbers and figures',
        fields: [],
        items: [
          {
            type: 'about-stat',
            label: 'Stat',
            labelPlural: 'Stats',
            nameField: 'label',
            fields: [
              { key: 'stat', label: 'Stat Value', type: 'text', placeholder: '30+' },
              { key: 'label', label: 'Label', type: 'text', placeholder: 'Years of Research' },
            ],
          },
        ],
      },
      {
        id: 'cta',
        label: 'CTA',
        description: 'Bottom call-to-action',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'collections',
    label: 'Collections',
    description: 'Gallery of preserved works and collection categories',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'gallery',
        label: 'Gallery',
        description: 'Featured works showcase',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'gallery-item',
            label: 'Gallery Item',
            labelPlural: 'Gallery Items',
            nameField: 'title',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'subtitle', label: 'Subtitle', type: 'text' },
              { key: 'tag', label: 'Tag', type: 'text', placeholder: 'Cultural Heritage' },
              { key: 'image', label: 'Image', type: 'image' },
            ],
          },
        ],
      },
      {
        id: 'categories',
        label: 'Categories',
        description: 'Browse by collection type',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
        ],
        items: [
          {
            type: 'collection-category',
            label: 'Category',
            labelPlural: 'Categories',
            nameField: 'name',
            fields: [
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'slug', label: 'Slug', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'image', label: 'Image', type: 'image' },
            ],
          },
        ],
      },
      {
        id: 'cta',
        label: 'Commission CTA',
        description: 'Custom crystal call-to-action',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'trust',
    label: 'Trust & Security',
    description: 'Security measures, certifications, and partnerships',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'swiss-manufacturing',
        label: 'Swiss Manufacturing',
        description: 'Manufacturing overview with feature cards',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'bodyText', label: 'Body Text', type: 'textarea' },
          { key: 'feature1Title', label: 'Feature 1 Title', type: 'text' },
          { key: 'feature1Desc', label: 'Feature 1 Description', type: 'text' },
          { key: 'feature2Title', label: 'Feature 2 Title', type: 'text' },
          { key: 'feature2Desc', label: 'Feature 2 Description', type: 'text' },
        ],
      },
      {
        id: 'security',
        label: 'Security Measures',
        description: 'Security feature cards',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'security-measure',
            label: 'Measure',
            labelPlural: 'Security Measures',
            nameField: 'title',
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'certifications',
        label: 'Certifications',
        description: 'Quality and security certifications',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'certification',
            label: 'Certification',
            labelPlural: 'Certifications',
            nameField: 'name',
            fields: [
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'partnerships',
        label: 'Partnerships',
        description: 'Research and institutional partnerships',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
        items: [
          {
            type: 'partnership',
            label: 'Partner',
            labelPlural: 'Partners',
            nameField: 'name',
            fields: [
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Contact page with form and company info',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'info',
        label: 'Contact Info',
        description: 'Company contact details sidebar',
        fields: [
          { key: 'infoHeading', label: 'Info Box Heading', type: 'text' },
          { key: 'email', label: 'Email', type: 'text' },
          { key: 'companyName', label: 'Company Name', type: 'text' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'businessHours', label: 'Business Hours', type: 'text' },
          { key: 'responseTime', label: 'Response Time', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'order',
    label: 'Order',
    description: 'Product ordering page with pricing cards',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'products',
        label: 'Products',
        description: 'Crystal product cards with pricing',
        fields: [],
        items: [
          {
            type: 'product',
            label: 'Product',
            labelPlural: 'Products',
            nameField: 'name',
            fields: [
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'capacity', label: 'Capacity', type: 'text', placeholder: 'Up to 100 GB' },
              { key: 'price', label: 'Price', type: 'text', placeholder: 'From CHF 499' },
              { key: 'description', label: 'Description', type: 'textarea' },
              { key: 'features', label: 'Features (one per line)', type: 'textarea' },
              { key: 'popular', label: 'Most Popular', type: 'boolean' },
              { key: 'ctaText', label: 'Button Text', type: 'text', placeholder: 'Order Now' },
              { key: 'ctaHref', label: 'Button Link', type: 'text' },
            ],
          },
        ],
      },
      {
        id: 'custom',
        label: 'Custom Solution CTA',
        description: 'Custom orders section',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'emailNote', label: 'Email Note', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'schedule-demo',
    label: 'Schedule a Demo',
    description: 'Demo booking page',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'news-page',
    label: 'News',
    description: 'News listing page (articles managed via News tab)',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      {
        id: 'newsletter-cta',
        label: 'Newsletter CTA',
        description: 'Stay in the loop section',
        fields: [
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'cta1Text', label: 'Primary Button Text', type: 'text' },
          { key: 'cta1Href', label: 'Primary Button Link', type: 'text' },
          { key: 'cta2Text', label: 'Secondary Button Text', type: 'text' },
          { key: 'cta2Href', label: 'Secondary Button Link', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'case-studies-page',
    label: 'Case Studies',
    description: 'Case studies listing page (entries managed via Case Studies tab)',
    blocks: [
      {
        id: 'hero',
        label: 'Hero',
        description: 'Page headline and description',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
          { key: 'heading', label: 'Heading', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
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
