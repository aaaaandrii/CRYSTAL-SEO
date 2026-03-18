'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caseStudyCreateSchema } from '@/lib/validations';
import type { z } from 'zod';
import Link from 'next/link';

type CaseStudyFormData = z.input<typeof caseStudyCreateSchema>;

const SECTORS = [
  { value: 'space', label: 'Space' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'dna', label: 'DNA' },
  { value: 'ip', label: 'IP' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'personal', label: 'Personal' },
];

export default function NewCaseStudyPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudyCreateSchema),
    defaultValues: {
      published: false,
      featured: false,
    },
  });

  async function onSubmit(data: CaseStudyFormData) {
    try {
      const res = await fetch('/api/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || 'Failed to create case study');
        return;
      }

      router.push('/admin/case-studies');
      router.refresh();
    } catch {
      alert('An unexpected error occurred');
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/case-studies"
          className="text-brand-gray hover:text-brand-white transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-brand-white">
          Create Case Study
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-brand-navy border border-brand-border rounded-lg p-8 space-y-6 max-w-3xl"
      >
        <FormField label="Title" error={errors.title?.message}>
          <input
            {...register('title')}
            className="admin-input"
            placeholder="Case study title"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Client" error={errors.client?.message}>
            <input
              {...register('client')}
              className="admin-input"
              placeholder="Client name"
            />
          </FormField>

          <FormField label="Sector" error={errors.sector?.message}>
            <select {...register('sector')} className="admin-select">
              <option value="">Select sector</option>
              {SECTORS.map((sector) => (
                <option key={sector.value} value={sector.value}>
                  {sector.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Excerpt" error={errors.excerpt?.message}>
          <textarea
            {...register('excerpt')}
            rows={3}
            className="admin-input resize-y"
            placeholder="Brief summary of the case study"
          />
        </FormField>

        <FormField label="Challenge" error={errors.challenge?.message}>
          <textarea
            {...register('challenge')}
            rows={4}
            className="admin-input resize-y"
            placeholder="What challenge did the client face?"
          />
        </FormField>

        <FormField label="Solution" error={errors.solution?.message}>
          <textarea
            {...register('solution')}
            rows={4}
            className="admin-input resize-y"
            placeholder="How did 5D Memory Crystal solve it?"
          />
        </FormField>

        <FormField label="Outcome" error={errors.outcome?.message}>
          <textarea
            {...register('outcome')}
            rows={4}
            className="admin-input resize-y"
            placeholder="What were the results?"
          />
        </FormField>

        <FormField label="Content" error={errors.content?.message}>
          <textarea
            {...register('content')}
            rows={12}
            className="admin-input resize-y font-mono text-sm"
            placeholder="Full case study content (supports HTML)"
          />
        </FormField>

        <FormField label="Image URL" error={errors.imageUrl?.message}>
          <input
            {...register('imageUrl')}
            className="admin-input"
            placeholder="/uploads/image.jpg or https://..."
          />
        </FormField>

        <FormField label="Image Alt Text" error={errors.imageAlt?.message}>
          <input
            {...register('imageAlt')}
            className="admin-input"
            placeholder="Descriptive alt text for the image"
          />
        </FormField>

        <FormField label="Logo URL (optional)" error={errors.logoUrl?.message}>
          <input
            {...register('logoUrl')}
            className="admin-input"
            placeholder="/uploads/logo.png (optional)"
          />
        </FormField>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="published"
              {...register('published')}
              className="w-4 h-4 rounded bg-brand-dark border-brand-border text-brand-accent focus:ring-brand-accent"
            />
            <label htmlFor="published" className="text-sm text-brand-gray">
              Publish immediately
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              {...register('featured')}
              className="w-4 h-4 rounded bg-brand-dark border-brand-border text-brand-accent focus:ring-brand-accent"
            />
            <label htmlFor="featured" className="text-sm text-brand-gray">
              Featured
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-brand-border">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-accent hover:bg-brand-accent/80 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-sm"
          >
            {isSubmitting ? 'Creating...' : 'Create Case Study'}
          </button>
          <Link
            href="/admin/case-studies"
            className="text-brand-gray hover:text-brand-white transition-colors text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-gray mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
