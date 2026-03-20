'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export function ImageUpload({ value, onChange, label, accept = 'image/*' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Upload failed');
        return;
      }
      const data = await res.json();
      onChange(data.url);
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = '';
  }

  const isValidPath = value && value.trim() !== '' && (value.startsWith('/') || value.startsWith('http'));
  const hasImage = isValidPath;
  const isSvg = value?.endsWith('.svg');

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-brand-gray">{label}</label>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-colors ${
          dragOver
            ? 'border-brand-accent bg-brand-accent/10'
            : hasImage
              ? 'border-brand-border/50 bg-brand-dark/50 hover:border-brand-accent/50'
              : 'border-brand-border/30 bg-brand-dark hover:border-brand-accent/50'
        }`}
      >
        {hasImage ? (
          <div className="flex items-center gap-4 p-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#222]">
              {isSvg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value} alt="" className="h-full w-full object-contain p-1" />
              ) : (
                <Image src={value} alt="" fill className="object-contain p-1" sizes="64px" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-brand-white">{value}</p>
              <p className="mt-0.5 text-xs text-brand-gray">
                {uploading ? 'Uploading...' : 'Click or drag to replace'}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="shrink-0 rounded p-1 text-brand-gray hover:text-red-400 transition-colors"
              title="Remove"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-6">
            <svg className="mb-2 h-8 w-8 text-brand-gray/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="text-sm text-brand-gray">
              {uploading ? 'Uploading...' : 'Click or drag image here'}
            </p>
            <p className="mt-0.5 text-xs text-brand-gray/50">PNG, JPG, SVG, WebP up to 10MB</p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Manual path input */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-brand-gray/50">or path:</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/icons/example.svg"
          className="flex-1 rounded border border-brand-border/30 bg-brand-dark px-2 py-1 text-xs text-brand-white placeholder-brand-gray/30 focus:border-brand-accent focus:outline-none"
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
