'use client';

import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsCreateSchema } from '@/lib/validations';
import type { z } from 'zod';
import Link from 'next/link';
import { ImageUpload } from '@/components/admin/ImageUpload';

type NewsFormData = z.input<typeof newsCreateSchema>;

export default function NewNewsPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsCreateSchema),
    defaultValues: {
      published: false,
      tags: '',
    },
  });

  async function onSubmit(data: NewsFormData) {
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || 'Failed to create article');
        return;
      }

      router.push('/admin/news');
      router.refresh();
    } catch {
      alert('An unexpected error occurred');
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/news"
          className="text-brand-gray hover:text-brand-white transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-brand-white">
          Create News Article
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
            placeholder="Article title"
          />
        </FormField>

        <FormField label="Excerpt" error={errors.excerpt?.message}>
          <textarea
            {...register('excerpt')}
            rows={3}
            className="admin-input resize-y"
            placeholder="Brief summary of the article"
          />
        </FormField>

        <FormField label="Content" error={errors.content?.message}>
          <textarea
            {...register('content')}
            rows={12}
            className="admin-input resize-y font-mono text-sm"
            placeholder="Article content (supports HTML)"
          />
        </FormField>

        <Controller
          control={control}
          name="imageUrl"
          render={({ field }) => (
            <FormField label="Image" error={errors.imageUrl?.message}>
              <ImageUpload value={field.value || ''} onChange={field.onChange} />
            </FormField>
          )}
        />

        <FormField label="Image Alt Text" error={errors.imageAlt?.message}>
          <input
            {...register('imageAlt')}
            className="admin-input"
            placeholder="Descriptive alt text for the image"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Source URL" error={errors.source?.message}>
            <input
              {...register('source')}
              className="admin-input"
              placeholder="https://source-url.com (optional)"
            />
          </FormField>

          <FormField label="Source Name" error={errors.sourceName?.message}>
            <input
              {...register('sourceName')}
              className="admin-input"
              placeholder="Source publication name (optional)"
            />
          </FormField>
        </div>

        <FormField label="Tags" error={errors.tags?.message}>
          <input
            {...register('tags')}
            className="admin-input"
            placeholder="tag1, tag2, tag3 (comma separated)"
          />
        </FormField>

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

        <div className="flex items-center gap-4 pt-4 border-t border-brand-border">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-accent hover:bg-brand-accent/80 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-sm"
          >
            {isSubmitting ? 'Creating...' : 'Create Article'}
          </button>
          <Link
            href="/admin/news"
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
