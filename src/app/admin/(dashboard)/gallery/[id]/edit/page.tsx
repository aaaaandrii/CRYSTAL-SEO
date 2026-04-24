'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';

const TAGS = [
  'Cultural Heritage',
  'Scientific',
  'Personal',
  'Art',
  'DNA',
  'Luxury',
] as const;

const gallerySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().default(''),
  tag: z.enum(TAGS, { message: 'Tag is required' }),
  image: z.string().min(1, 'Image is required'),
  imageAlt: z.string().default(''),
  published: z.boolean().default(true),
});

type GalleryFormData = z.input<typeof gallerySchema>;

interface GalleryItemResponse {
  id: string;
  type: string;
  data: {
    title?: string;
    subtitle?: string;
    tag?: string;
    image?: string;
    imageAlt?: string;
  };
  sortOrder: number;
  published: boolean;
}

export default function EditGalleryItemPage() {
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
    formState: { errors, isSubmitting },
  } = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const item: GalleryItemResponse = await res.json();
        if (item.type !== 'gallery') {
          setNotFound(true);
          return;
        }
        reset({
          title: item.data.title ?? '',
          subtitle: item.data.subtitle ?? '',
          tag: (item.data.tag ?? '') as GalleryFormData['tag'],
          image: item.data.image ?? '',
          imageAlt: item.data.imageAlt ?? '',
          published: item.published,
        });
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, reset]);

  async function onSubmit(data: GalleryFormData) {
    try {
      const { published, ...rest } = data;
      const res = await fetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: rest,
          published,
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        alert(result.error || 'Failed to update gallery item');
        return;
      }

      router.push('/admin/gallery');
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
        <p className="text-brand-gray mb-4">Gallery item not found.</p>
        <Link
          href="/admin/gallery"
          className="text-brand-accent hover:underline text-sm"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/gallery"
          className="text-brand-gray hover:text-brand-white transition-colors"
        >
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold text-brand-white">
          Edit Gallery Item
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
            placeholder="e.g. Holy Bible"
          />
        </FormField>

        <FormField label="Subtitle" error={errors.subtitle?.message}>
          <input
            {...register('subtitle')}
            className="admin-input"
            placeholder="e.g. Biblioteca Apostolica Vaticana"
          />
        </FormField>

        <FormField label="Tag" error={errors.tag?.message}>
          <select {...register('tag')} className="admin-select">
            <option value="">Select tag</option>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FormField>

        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <FormField label="Image" error={errors.image?.message}>
              <ImageUpload value={field.value || ''} onChange={field.onChange} />
            </FormField>
          )}
        />

        <FormField label="Image Alt Text" error={errors.imageAlt?.message}>
          <input
            {...register('imageAlt')}
            className="admin-input"
            placeholder="Descriptive alt text for accessibility"
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
            href="/admin/gallery"
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
