'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlockDef } from '@/lib/content-types';
import type { FieldDef, BlockDef } from '@/lib/content-types';
import { ImageUpload } from '@/components/admin/ImageUpload';

type ItemDef = NonNullable<BlockDef['items']>[number];

interface ContentItem {
  id: string;
  type: string;
  data: Record<string, unknown>;
  sortOrder: number;
  published: boolean;
}

export default function BlockEditorPage({
  params,
}: {
  params: Promise<{ page: string; section: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{ page: string; section: string } | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [itemGroups, setItemGroups] = useState<Record<string, ContentItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Inline editor state
  const [editingItem, setEditingItem] = useState<{ type: string; id: string | null; data: Record<string, unknown> } | null>(null);
  const [savingItem, setSavingItem] = useState(false);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const blockDef = resolvedParams
    ? getBlockDef(resolvedParams.page, resolvedParams.section)
    : null;

  // Fetch section content
  useEffect(() => {
    if (!resolvedParams) return;
    fetch(`/api/content/${resolvedParams.page}/${resolvedParams.section}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(data.content);
      })
      .catch(() => {});
  }, [resolvedParams]);

  // Fetch items for each item type
  const fetchItems = useCallback(() => {
    if (!blockDef?.items) { setLoading(false); return; }
    Promise.all(
      blockDef.items.map((itemDef) =>
        fetch(`/api/items?type=${itemDef.type}`)
          .then((res) => res.json())
          .then((data) => ({ type: itemDef.type, items: data as ContentItem[] }))
      )
    ).then((results) => {
      const groups: Record<string, ContentItem[]> = {};
      for (const r of results) groups[r.type] = r.items;
      setItemGroups(groups);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [blockDef]);

  useEffect(() => {
    if (blockDef) {
      if (!blockDef.items || blockDef.items.length === 0) setLoading(false);
      else fetchItems();
    }
  }, [blockDef, fetchItems]);

  // Save section content
  async function handleSaveSection(e: React.FormEvent) {
    e.preventDefault();
    if (!resolvedParams) return;
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch(`/api/content/${resolvedParams.page}/${resolvedParams.section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setMessage('saved');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setMessage(`Failed: ${res.status} — ${errData.error || 'Unknown'}${errData.details ? ': ' + errData.details : ''}`);
      }
    } catch (err) {
      setMessage(`Failed: ${String(err)}`);
    } finally {
      setSaving(false);
    }
  }

  // Item CRUD
  async function handleSaveItem() {
    if (!editingItem) return;
    setSavingItem(true);
    try {
      if (editingItem.id) {
        // Update
        await fetch(`/api/items/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: editingItem.data }),
        });
      } else {
        // Create
        await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: editingItem.type, data: editingItem.data }),
        });
      }
      setEditingItem(null);
      fetchItems();
    } catch {
      // silent
    } finally {
      setSavingItem(false);
    }
  }

  async function handleDeleteItem(id: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    fetchItems();
  }

  async function handleMoveItem(type: string, index: number, direction: 'up' | 'down') {
    const items = [...(itemGroups[type] || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;
    [items[index], items[newIndex]] = [items[newIndex], items[index]];
    setItemGroups({ ...itemGroups, [type]: items });
    await fetch('/api/items', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((item, i) => ({ id: item.id, sortOrder: i })) }),
    });
  }

  if (loading && !blockDef) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-accent border-t-transparent" />
      </div>
    );
  }

  if (!blockDef || !resolvedParams) {
    return (
      <div className="py-20 text-center">
        <p className="text-brand-gray">Block not found.</p>
        <Link href="/admin/pages" className="mt-4 inline-block text-sm text-brand-accent hover:underline">
          ← Back to Pages
        </Link>
      </div>
    );
  }

  const pageLabel = resolvedParams.page === 'home' ? 'Homepage' : resolvedParams.page;

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/admin/pages/${resolvedParams.page}`}
          className="text-sm text-brand-gray hover:text-brand-accent transition-colors"
        >
          ← {pageLabel}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-white">{blockDef.label}</h1>
        <p className="mt-1 text-sm text-brand-gray">{blockDef.description}</p>
      </div>

      {/* Section Fields */}
      {blockDef.fields.length > 0 && (
        <form onSubmit={handleSaveSection}>
          <div className="rounded-lg border border-brand-border/50 bg-brand-navy">
            <div className="border-b border-brand-border/30 px-6 py-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gray/60">
                Section Content
              </h2>
            </div>
            <div className="space-y-5 p-6">
              {blockDef.fields.map((field) =>
                field.type === 'image' ? (
                  <ImageUpload
                    key={field.key}
                    label={field.label}
                    value={content[field.key] ?? ''}
                    onChange={(val) => setContent({ ...content, [field.key]: val })}
                  />
                ) : (
                  <FieldInput
                    key={field.key}
                    field={field}
                    value={content[field.key] ?? ''}
                    onChange={(val) => setContent({ ...content, [field.key]: String(val) })}
                  />
                )
              )}
            </div>
            <div className="flex items-center gap-4 border-t border-brand-border/30 px-6 py-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2 px-6 rounded-md transition-colors disabled:opacity-50 text-sm"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              {message && (
                <span className={`text-sm ${message === 'saved' ? 'text-green-400' : 'text-red-400'}`}>
                  {message === 'saved' ? 'Saved' : message}
                </span>
              )}
            </div>
          </div>
        </form>
      )}

      {/* Item Lists */}
      {blockDef.items?.map((itemDef) => {
        const items = itemGroups[itemDef.type] || [];
        const isEditing = editingItem?.type === itemDef.type;

        return (
          <div key={itemDef.type} className="mt-6 rounded-lg border border-brand-border/50 bg-brand-navy">
            <div className="flex items-center justify-between border-b border-brand-border/30 px-6 py-4">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gray/60">
                  {itemDef.labelPlural}
                </h2>
                <p className="mt-0.5 text-[10px] text-brand-gray/40">{items.length} item{items.length !== 1 ? 's' : ''}</p>
              </div>
              <button
                onClick={() => setEditingItem({ type: itemDef.type, id: null, data: {} })}
                className="bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
              >
                + Add {itemDef.label}
              </button>
            </div>

            {/* Item cards */}
            <div className="divide-y divide-brand-border/20">
              {items.map((item, index) => {
                const name = String(item.data[itemDef.nameField] || 'Untitled');
                const imageField = itemDef.fields.find((f) => f.type === 'image');
                const rawImageUrl = imageField ? String(item.data[imageField.key] || '') : '';
                const imageUrl = rawImageUrl.startsWith('/') || rawImageUrl.startsWith('http') ? rawImageUrl : '';
                const descField = itemDef.fields.find((f) => f.type === 'textarea');
                const desc = descField ? String(item.data[descField.key] || '') : '';
                const isSvg = imageUrl?.endsWith('.svg');
                const isThisEditing = editingItem?.id === item.id;

                return (
                  <div key={item.id}>
                    <div
                      className={`group flex items-start gap-3 px-6 py-3 cursor-pointer transition-colors ${isThisEditing ? 'bg-brand-accent/5' : 'hover:bg-brand-dark/20'}`}
                      onClick={() => {
                        if (isThisEditing) setEditingItem(null);
                        else setEditingItem({ type: itemDef.type, id: item.id, data: { ...item.data } });
                      }}
                    >
                      {/* Reorder */}
                      <div className="flex shrink-0 flex-col items-center gap-0 pt-0.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleMoveItem(itemDef.type, index, 'up')}
                          disabled={index === 0}
                          className="rounded p-0.5 text-brand-gray/40 hover:text-brand-white disabled:opacity-20 transition-colors"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                          </svg>
                        </button>
                        <span className="text-[9px] text-brand-gray/30 tabular-nums">{index + 1}</span>
                        <button
                          onClick={() => handleMoveItem(itemDef.type, index, 'down')}
                          disabled={index === items.length - 1}
                          className="rounded p-0.5 text-brand-gray/40 hover:text-brand-white disabled:opacity-20 transition-colors"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                      </div>

                      {/* Thumbnail */}
                      {imageUrl && (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-[#222]">
                          {isSvg ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={imageUrl} alt="" className="h-full w-full object-contain p-1" />
                          ) : (
                            <Image src={imageUrl} alt="" fill className="object-contain p-0.5" sizes="40px" />
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-brand-white">{name}</p>
                        {desc && (
                          <p className="mt-0.5 truncate text-xs text-brand-gray/50">{desc}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setEditingItem({ type: itemDef.type, id: item.id, data: { ...item.data } })}
                          className="rounded px-2 py-1 text-[11px] text-brand-gray hover:text-brand-accent transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id, name)}
                          className="rounded px-2 py-1 text-[11px] text-brand-gray hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    {/* Inline editor — renders directly below this item */}
                    {isThisEditing && (
                      <InlineItemEditor
                        itemDef={itemDef}
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                        onSave={handleSaveItem}
                        saving={savingItem}
                      />
                    )}
                  </div>
                );
              })}

              {items.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-xs text-brand-gray/40">No {itemDef.labelPlural.toLowerCase()} yet</p>
                </div>
              )}
            </div>

            {/* New item editor — at bottom when adding */}
            {isEditing && editingItem.id === null && (
              <InlineItemEditor
                itemDef={itemDef}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                onSave={handleSaveItem}
                saving={savingItem}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  if (field.type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          id={`field-${field.key}`}
          className="h-4 w-4 rounded bg-brand-dark border-brand-border text-brand-accent"
        />
        <label htmlFor={`field-${field.key}`} className="text-sm font-medium text-brand-gray">
          {field.label}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-gray">{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className="admin-input resize-y"
        />
      ) : field.type === 'select' ? (
        <select
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className="admin-select"
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="admin-input"
        />
      )}
    </div>
  );
}

function InlineItemEditor({
  itemDef,
  editingItem,
  setEditingItem,
  onSave,
  saving,
}: {
  itemDef: ItemDef;
  editingItem: { type: string; id: string | null; data: Record<string, unknown> };
  setEditingItem: (v: { type: string; id: string | null; data: Record<string, unknown> } | null) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="border-t border-brand-accent/30 bg-brand-accent/5 px-6 py-5" onClick={(e) => e.stopPropagation()}>
      <h3 className="mb-4 text-xs font-semibold text-brand-accent">
        {editingItem.id ? 'Edit' : 'New'} {itemDef.label}
      </h3>
      <div className="space-y-4">
        {itemDef.fields.map((field) =>
          field.type === 'image' ? (
            <ImageUpload
              key={field.key}
              label={field.label}
              value={String(editingItem.data[field.key] ?? '')}
              onChange={(val) =>
                setEditingItem({ ...editingItem, data: { ...editingItem.data, [field.key]: val } })
              }
            />
          ) : (
            <FieldInput
              key={field.key}
              field={field}
              value={editingItem.data[field.key] ?? (field.type === 'boolean' ? false : '')}
              onChange={(val) =>
                setEditingItem({ ...editingItem, data: { ...editingItem.data, [field.key]: val } })
              }
            />
          )
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2 px-5 rounded-md transition-colors disabled:opacity-50 text-sm"
        >
          {saving ? 'Saving...' : editingItem.id ? 'Save' : 'Add'}
        </button>
        <button
          onClick={() => setEditingItem(null)}
          className="text-sm text-brand-gray hover:text-brand-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
