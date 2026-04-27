'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsCreateSchema } from '@/lib/validations';
import type { z } from 'zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { SeoSidebar } from '@/components/admin/SeoSidebar';

type NewsFormData = z.input<typeof newsCreateSchema>;

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  published: boolean;
  source: string | null;
  sourceName: string | null;
  tags: string;
}

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsCreateSchema),
  });

  const [seoTitle, seoExcerpt, seoContent, seoImageAlt] = watch([
    'title',
    'excerpt',
    'content',
    'imageAlt',
  ]);

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const article: NewsArticle = await res.json();
        reset({
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          imageUrl: article.imageUrl,
          imageAlt: article.imageAlt || '',
          published: article.published,
          source: article.source || '',
          sourceName: article.sourceName || '',
          tags: article.tags || '',
        });
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id, reset]);

  async function onSubmit(data: NewsFormData) {
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || 'Failed to update article');
        return;
      }

      router.push('/admin/news');
      router.refresh();
    } catch {
      alert('An unexpected error occurred');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-brand-gray">Loading...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-brand-gray mb-4">Article not found.</p>
        <Link href="/admin/news" className="text-brand-accent hover:underline text-sm">
          Back to News
        </Link>
      </div>
    );
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
          Edit News Article
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] max-w-6xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-brand-navy border border-brand-border rounded-lg p-8 space-y-6 min-w-0"
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
            Published
          </label>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-brand-border">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-accent hover:bg-brand-accent/80 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded-md transition-colors text-sm"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin/news"
            className="text-brand-gray hover:text-brand-white transition-colors text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>

        <SeoSidebar
          title={seoTitle ?? ''}
          excerpt={seoExcerpt ?? ''}
          content={seoContent ?? ''}
          imageAlt={seoImageAlt ?? ''}
        />
      </div>
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
